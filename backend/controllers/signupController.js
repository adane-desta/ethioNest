import signupModel from "../models/signupModel.js";

const signupController = {
    addNewUser: async (req, res) => {
        try {
            const newUser = req.body;
            const profileImage = req.file; 
            
            const insertedUser = await signupModel.addNewUser(newUser, profileImage);
            res.status(201).json(insertedUser);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({error: 'Email already exists'});
            }
            else{
                 res.status(500).json({error: "something went wrong please try again later"});
            }
        }
    }
};

export default signupController;