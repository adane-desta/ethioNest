

import db from '../config/db.js'

const userModel = {

    getUsers: async() =>{
        console.log('inmodel');
        const connection = await db.getConnection();

        await connection.beginTransaction();

        try{

            const [users] = await connection.query(
                'select * from users where role != "admin" '
            )

            await connection.commit()
            return users;

        }catch(error){

            await connection.rollback()

            throw error


        }finally{

            connection.release()
        }

    },

    getUser: async(id) => {

        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{
            const [user] = await connection.query(`
            select firstname, lastname, profile_picture from users where id = ?`,[id]);

            await connection.commit()
            return user;
        }catch(error){
            await connection.rollback()
            throw error
        }finally{
            connection.release()
        }

    },

    deleteUser: async(userId) => {

        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const deleted = await connection.query(`
            delete from users where id = ?`,[userId])

            await connection.commit()
            return deleted
        }catch(error){
            await connection.rollback()
            throw error
        }finally{
            connection.release()
        }
    },

    editProfile: async(id, firstname, lastname, email, phone, bio) => {

        const connection = await db.getConnection()
        await connection.beginTransaction()

        try{

            const edited = await connection.query(`
            UPDATE users SET firstname = ?, email = ?, phone = ?, bio = ?, lastname = ? WHERE id = ?;`,
            [firstname, email, phone, bio, lastname, id ])

            await connection.commit()
            return edited
        }catch(error){
            await connection.rollback()
            throw error
        }finally{
            connection.release()
        }

    }
}

export default userModel