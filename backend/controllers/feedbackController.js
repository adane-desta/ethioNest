
import feedbackModel from "../models/feedbackModel.js";

const feedbackController = {

    addFeedback: async(req, res) => {

        try{

            const {name, email, subject, message} = req.body;

            const inserted = await feedbackModel.addFeedback(name, email, subject, message);

            res.status(200).json(inserted)

        }catch(error){
            res.status(500).json({error: error.message})
        }
    },
    getFeedback: async(req, res) => {

        try{

            const feedback = await feedbackModel.getFeedback();

            res.status(200).json(feedback)

        }catch(error){
            res.status(500).json({error: error.message})
        }
    },

    deleteFeedback: async(req, res) => {

        try{

            const deleted = await feedbackModel.deleteFeedback(req.query.id);

            res.status(200).json(deleted)

        }catch(error){
            res.status(500).json({error: error.message})
        }
    }

}

export default feedbackController;
    