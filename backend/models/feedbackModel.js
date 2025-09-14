
import db from '../config/db.js';

const feedbackModel ={

    addFeedback: async(name, email, subject, message) => {

        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const[inserted] = await connection.query(`
            insert into feedback(name, message, email, subject) values(?,?,?,?)`, 
            [name, email, subject , message]);

            await connection.commit()
            return inserted;
        }catch(error){
            await connection.rollback()
            throw error
        }finally{
            connection.release()
        }
    },
    getFeedback: async() => {

        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const[feedback] = await connection.query(`
            select * from feedback`
            );

            await connection.commit()
            return feedback;
        }catch(error){
            await connection.rollback()
            throw error
        }finally{
            connection.release()
        }
    },

    deleteFeedback: async(id) => {

        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const[deleted] = await connection.query(`
            delete from feedback where id = ?`,[id]
            );

            await connection.commit()
            return deleted;
        }catch(error){
            await connection.rollback()
            throw error
        }finally{
            connection.release()
        }
    }
}

export default feedbackModel;