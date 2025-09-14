
import propertyModel from '../models/propertyModel.js'
import Notification  from '../models/notificationModel.js';

const propertyController = {

    addNewProperty: async (req, res) => {
        try {
            const newProperty = req.body;
            const images = req.files; 

            const propertyId = await propertyModel.addNewProperty(newProperty, images);
            res.status(201).json({ property_id: propertyId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getProperties: async(req , res) => {

        try{
            
            const {status} = req.params;
            const properties = await propertyModel.getProperties(status);
            res.status(200).json(properties)

        }catch(error){

            res.status(500).json({error: error.message})
       }

    },

    getPropertiesOwner: async(req, res) => {
        try{
            const {owner_id} = req.query;
            
            const properties = await propertyModel.getPropertiesOwner(owner_id)
            res.status(200).json(properties)
        }catch(error){
            res.status(500).json({error: error.messa})
        }
    },

    getPropertyDetail: async(req , res) => {

        try{
            const {propId} = req.query;
            const propertyDetail = await propertyModel.getPropertyDetail(propId)
            res.status(200).json(propertyDetail)

        }catch(error){
            console.log(error.message)
            res.status(500).json({error: error.message})
        }

    },

    editProperty: async(req, res) => {

        try{
            const {id, title, description, price, status} = req.body;

            const updated = await propertyModel.editProperty(id, title, description, price, status);

            res.status(200).json(updated)
        }catch(error){
            res.status(500).json({error: error.message})
        }
    },

    approveProperty: async(req, res) =>{

        const {property_id} = req.params;
        const {status , title , owner_id} = req.query;

        try{
            
        const approved = await propertyModel.approveProperty(property_id, status);
        // send notification to owner
        await Notification.create({
          user_id: owner_id,
          title: 'Property Approved',
          message: `Your listing "${title}" has been approved`
        });

        res.status(200).json()

        }catch(error){
            res.status(500).json({error: error.message})
        }


    },

    deleteProperty: async(req, res) => {

        const {property_Id} = req.query;

        try{
            const deleted = await propertyModel.deleteProperty(property_Id)

            res.status(200).json(deleted)

        }catch(error){
            res.status(500).json({error: error.message})
        }
    },

    saveToFavorites: async(req, res) => {

        try{
            const {prop_id, user_id, tenant_name, owner_id, title} = req.body;
            const saved = await propertyModel.saveToFavorite(prop_id, user_id);

            //send notification to owner
            await Notification.create({
                user_id: owner_id,
                title: 'New Favorite',
                message: `${tenant_name} saved your property "${title}" to his favorite`
              });

            res.status(200).json(saved);
        }catch(error){
            res.status(500).json({error: error.message})
        }

    },

    unsaveFromFavorites: async(req, res) => {

        try{
            const {prop_id, user_id} = req.query;
            const saved = await propertyModel.unsaveFromFavorites(prop_id, user_id);
            res.status(200).json(saved);
        }catch(error){
            res.status(500).json({error: error.message})
        }

    },

    checkfavorites: async(req, res) => {

        try{
            const {prop_id, user_id} = req.query;
            const saved = await propertyModel.checkfavorites(prop_id, user_id);
            if(saved){
                 res.status(200).json({success: 1});
            }else{
                res.status(200).json({success: 0});
            }
           
        }catch(error){
            res.status(500).json({error: error.message})
        }

    },

    getFavorites: async(req, res) => {
        try{

            const saved = await propertyModel.getFavorites(req.query.tenant);
            res.status(200).json(saved);
        }catch(error){
            res.status(500).json({error: error.message})
        }
    },
    recentproperties: async(req, res) => {
        try{

            const recent = await propertyModel.recentproperties();
            res.status(200).json(recent);
        }catch(error){
            res.status(500).json({error: error.message})
        }
    }

}
export default propertyController