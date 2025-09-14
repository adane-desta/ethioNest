
import loginModel from "../models/loginModel.js";

const loginController = {

    login: async(req, res) => {

        try{

            const { email, password } = req.body;

        const isValidUser = await loginModel.login(email , password);

        if(isValidUser){
            res.status(201).json(isValidUser[0])
        }else{
            res.status(201).json(null)
        }

        }catch(error){
            console.log(error)
            res.status(500).json({error: error.message})
        }


    }
}

export default loginController;