
import db from '../config/db.js'
import fs from  'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const propertyModel = {

    addNewProperty: async (newProperty, images) => {
        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            // Insert property data
            const [propertyResult] = await connection.query(
                   `insert into ethionest.properties (owner_id , title , description , type , rentorsell , address , bedrooms , 
                    bathrooms, area , price , negotiable, year_built , specific_place, kebele)
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

[newProperty.owner_id, newProperty.title, newProperty.description, newProperty.type, newProperty.for, newProperty.address,
newProperty.bedrooms, newProperty.bathrooms, newProperty.area, newProperty.price, newProperty.negotiable,
newProperty.year, newProperty.sp_location, newProperty.kebele ]   
            );
            
            const propertyId = propertyResult.insertId;

            // Handle image uploads
            if (images && images.length > 0) {
                const uploadDir = path.join(__dirname, '../../public/images');
                
                // Create directory if it doesn't exist
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                const imagePromises = images.map(async (image, index) => {
                    const imageName = `property_${propertyId}_${Date.now()}_${index}${path.extname(image.originalname)}`;
                    const imagePath = path.join(uploadDir, imageName);
                    
                    // Save image to filesystem
                    await fs.promises.writeFile(imagePath, image.buffer);
                    
                    // Save to database
                    await connection.query(
                        'INSERT INTO property_images (property_id, image_path, is_main) VALUES (?, ?, ?)',
                        [propertyId, `/images/${imageName}`, index === 0] 
                    );
                });

                await Promise.all(imagePromises);
            }

            await connection.commit();
            return propertyId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    getProperties: async(status) =>{

        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            if(status === 'all'){
                const [properties] = await connection.query(
                `SELECT * from properties as p , property_images as im
                where p.id = im.property_id and im.is_main = 1`,[]
            )

            await connection.commit()
            return properties

            }else{
                    const [properties] = await connection.query(
                    `SELECT * from properties as p , property_images as im
                    where p.status = ? and p.id = im.property_id and im.is_main = 1`,[status]
                )
    
                await connection.commit()
                return properties
                
            }

        }catch(error){
            await connection.rollback()
            throw error
        }finally{
             connection.release()
        }

    },

    getPropertiesOwner: async(owner_id) => {

        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{
            const [properties] = await connection.query(`
            SELECT * from properties as p , property_images as im
            where p.owner_id = ? and p.id = im.property_id and im.is_main = 1`,[owner_id]
            );

            await connection.commit()
            return properties;
            
        }catch(error){
            await connection.rollback()
            throw error
        }finally{
            connection.release()
        }
    },

    getPropertyDetail: async(propertyId) => {
        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const [property] = await connection.query(
                `select * from properties 
                where id = ?`, [propertyId]
            );

            const owner_id = property[0].owner_id;

            const [owner] = await connection.query(
                `select id, concat(firstname," ", lastname) as "name", email, phone, bio, 
                 profile_picture, Preferredlocation from users where id = ?`, [owner_id]
            );

            const [propertyImages] = await connection.query(
                `select image_id, image_path, is_main from property_images where property_id = ? ORDER BY is_main DESC`, [propertyId]
            )

            await connection.commit()
            return [property[0] , owner[0] , propertyImages]


        }catch(error){
            console.log(error)
            await connection.rollback()
            throw error
        }finally{
            connection.release()
        }
    },

    editProperty: async(id, title, description, price, pstatus) => {

        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const [updated] = await connection.query(`
            UPDATE properties SET title = ?, description = ?, price = ?, 
            status = ? WHERE id = ?`, [title, description, price, pstatus, id]
            );

            await connection.commit()

            return updated
        }catch(error){
            await connection.rollback()
            throw error
        }finally{
            connection.release()
        }
    },

    approveProperty: async(property_id, status) => {

        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const approved = await connection.query(`
            UPDATE properties SET status = ? WHERE id = ?`,[status, property_id])

            await connection.commit()
            return approved;
        }catch(error) {
            await connection.rollback()
            throw error
        }finally{
            connection.release()
        }

    },

    deleteProperty: async(prop_id) => {
        const connection = await db.getConnection()
        await connection.beginTransaction()
 
        try{
         const [deleted] = await connection.query(`
         delete from properties where id = ?`,[prop_id])
 
         await connection.commit()
         return deleted
        }catch(error){
         await connection.rollback()
         throw error
        }finally{
         connection.release()
        }
     },

     saveToFavorite: async(property_id , tenant_id) => {
        
        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const [saved] = await connection.query(`
            insert into favorites(tenant_id, property_id) values(?, ?)`, 
            [tenant_id, property_id])

            await connection.commit()
            return saved;

        }catch(error){
            await connection.commit()
            throw error
        }
     },

     unsaveFromFavorites: async(property_id , tenant_id) => {

        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const [saved] = await connection.query(`
            delete from favorites where tenant_id = ? and property_id = ?`, 
            [tenant_id, property_id])

            await connection.commit()
            return saved;

        }catch(error){
            await connection.commit()
            throw error
        }
     },
     checkfavorites: async(property_id , tenant_id) => {

        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const [saved] = await connection.query(`
            select * from favorites where tenant_id = ? and property_id = ?`, 
            [tenant_id, property_id])

            await connection.commit()
            return saved.length > 0;

        }catch(error){
            await connection.commit()
            throw error
        }
     },

     getFavorites: async(tenant_id) => {
        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{
            const [saved] = await connection.query(`
            SELECT * from properties as p , property_images as im
            where p.id in(select property_id from favorites where tenant_id = ?) and p.id = im.property_id and im.is_main = 1
            `, [tenant_id]);

            await connection.commit()
            return saved
        }catch(error){
            await connection.rollback()
            throw error
        }finally{
            connection.release()
        }
     },

     recentproperties: async() => {
        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{
            const [recent] = await connection.query(`
            SELECT * from properties as p , property_images as im
            where p.id = im.property_id and im.is_main = 1 and p.status = 'available'
            ORDER BY date_listed LIMIT 3
            `);

            await connection.commit()
            return recent
        }catch(error){
            await connection.rollback()
            throw error
        }finally{
            connection.release()
        }
     }

      


}

export default propertyModel