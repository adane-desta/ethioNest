import signupModel from "../models/signupModel.js";

const signupController = {
    addNewUser: async (req, res) => {
        try {
            const newUser = req.body;
            const profileImage = req.file; 
            
            const insertedUser = await signupModel.addNewUser(newUser, profileImage);
            res.status(201).json(insertedUser);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
};

export default signupController;