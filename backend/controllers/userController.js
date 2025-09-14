
import userModel from "../models/userModel.js"

const usercontroller = {

    

    getUsers: async(req , res) => {
      console.log('in controller')
        try{

            const users = await userModel.getUsers();

            res.status(200).json(users)
        }catch(error){

            res.status(500).json({error: error.message})
        }

        

    },

    getUser: async(req, res) => {

        try{
            const user = await userModel.getUser(req.params.user_id);

            res.status(200).json(user)
        }catch(error){
            res.status(500).json({error:error.message})
        }

    },
    
    deleteUser: async(req, res) => {

        const {userId} = req.query;

        try{
            const deleted = await userModel.deleteUser(userId)

            res.status(200).json(deleted)

        }catch(error){
            res.status(500).json({error: error.message})
        }
    },

    editProfile: async(req, res) => {

        const {id,firstname, lastname, email, phone, bio} = req.body;

        try{
            const edited = await userModel.editProfile(id,firstname,lastname,email,phone,bio)

            res.status(200).json(edited)

        }catch(error){
            res.status(500).json({error: error.message})
        }
    }
}
export default usercontroller;