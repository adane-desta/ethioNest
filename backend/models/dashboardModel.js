import db from '../config/db.js';

const dashboardModel = {

    ownerDashboard: async(owner_id) => {

        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const[dashboard] = await connection.query(`
            SELECT
            (SELECT COUNT(*) FROM properties WHERE owner_id = ?) AS total,
            (SELECT COUNT(*) FROM properties WHERE owner_id = ? AND status = 'pending') AS pending,
            (SELECT COUNT(*) FROM properties WHERE owner_id = ? AND status = 'sold') AS sold,
            (SELECT COUNT(*) FROM inquiries WHERE owner_id = ?) AS inquiries;`,
              [owner_id, owner_id, owner_id, owner_id]
            );

            await connection.commit()
            return dashboard;
        }catch(error){
            await connection.rollback()
            throw error
        }finally{
            connection.release()
        }
    },

    analytics: async() => {

        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const[analytics] = await connection.query(`
            select 
            (select count(*) from users) as 'users',
            (select count(*) from properties) as 'totalp',
            (SELECT count(*) from properties where status = 'available') as 'avap',
            (SELECT count(*) from properties where status = 'sold') as 'soldp',
            (select max(price) from properties) as 'maxprice',
            (select min(price) from properties) as 'minprice',
            (select count(*) from inquiries) as 'inquires',
            (select im.image_path from property_images as im
            where im.property_id = (select id from properties where price = (select max(price) from properties))and is_main = 1) as 'top_images',
            (select im.image_path from property_images as im
            where im.property_id = (select id from properties where price = (select min(price) from properties))and is_main = 1) as 'list_images';`,
              []
            );

            await connection.commit()
            return analytics;
        }catch(error){
            await connection.rollback()
            throw error
        }finally{
            connection.release()
        }
    },
}

export default dashboardModel;