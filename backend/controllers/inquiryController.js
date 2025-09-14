
import inquiryModel from "../models/inquiryModel.js";

const inquiryController = {
    addInquiry: async(req, res) =>{

        try{
            const inquiry = req.body;

            const inserted = await inquiryModel.addInquiry(inquiry);

            res.status(200).json(inserted)
        }catch(error){
            res.status(500).json({error: error.message})
        }
    },

    getInquiries: async(req, res) => {

        const {owner_id} = req.params;

        try{
            const inquiries = await inquiryModel.getInquiries(owner_id)
            res.status(200).json(inquiries);
        }catch(error) {
            res.status(500).json({error: error.message})
        }
    },

    deleteinqu: async(req, res) => {

        try{
            const deleted = await inquiryModel.deleteInqu(req.params.inqu_id);
            res.status(200).json(deleted)
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }

}
export default inquiryController;