import dashboardModel from "../models/dashboardModel.js";

const dashboardController = {

    ownerDashboard: async(req, res) => {

        try{

            const dashboard = await dashboardModel.ownerDashboard(req.query.id);

            res.status(200).json(dashboard[0])

        }catch(error){
            res.status(500).json({error: error.message})
        }
    },

    analytics: async(req, res) => {

        try{

            const analytics = await dashboardModel.analytics();

            res.status(200).json(analytics[0])

        }catch(error){
            res.status(500).json({error: error.message})
        }
    },
}

export default dashboardController;