
import db from '../config/db.js'

const loginModel = {

    login: async(email, password) => {
        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const [isValidUser] = await connection.query(`

            select id, firstname, email, role, phone, bio, profile_picture, created_at, lastname, Preferredlocation from users where email = ? and password = ?
            
            `, 
             [email , password]
             );

             await connection.commit()
             return isValidUser.length > 0 ?  isValidUser : false;
             
        }catch(error){
            await connection.rollback()
            console.log(error)
            throw error
        }finally{
            connection.release()
        }
    }
}

export default loginModel