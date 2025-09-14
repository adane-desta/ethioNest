import db from '../config/db.js'

const inquiryModel = {

    addInquiry: async(inquiry) =>{
        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const inserted = await connection.query(`
            insert into inquiries (tenant_id, owner_id, property_id, message)
            values(?,?,?,?)` , [inquiry.tenantId, inquiry.ownerId, inquiry.propertyId, inquiry.message]
            );

            await connection.commit()
            return inserted;
        }catch(error){
            await connection.rollback()
            throw error
        }finally{
            connection.release()
        }
    },

    getInquiries: async(owner_id) => {

        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const [inquiries] = await connection.query(`
            select im.image_path , p.title , concat(u.firstname, ' ', u.lastname) as 'name', u.id as 'tenant_id',
            inq.id, inq.message, u.email , u.phone from property_images as im , properties as p , 
            inquiries as inq , users as u  where inq.tenant_id = u.id and inq.property_id = p.id 
            and inq.property_id = im.property_id and im.is_main = 1 and inq.owner_id = ?`, [owner_id]
            );

            await connection.commit()
            return inquiries;
        }catch(error){
            connection.rollback()
            throw error
        }finally{
           connection.release()
        }
    },

    deleteInqu: async(inq_id) => {
       const connection = await db.getConnection()
       await connection.beginTransaction()

       try{
        const [deleted] = await connection.query(`
        delete from inquiries where id = ?`,[inq_id])

        await connection.commit()
        return deleted
       }catch(error){
        await connection.rollback()
        throw error
       }finally{
        connection.release()
       }
    }
}

export default inquiryModel;