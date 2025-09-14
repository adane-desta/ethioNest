
import multer from 'multer'


const upload = {

    // handle profile picture upload
     profilePicture : multer({

        storage: multer.memoryStorage(),
        limits: {
            fileSize: 1024 * 1024 * 10 ,
           
        },

        fileFilter: (req , file , cb) => {

            if(file.mimetype.startsWith('image/')){
                cb(null , true)
            }else{
                cb(new Error('only image files are allowed'))
            }
        }

    }),

    // handle property image upload
    propertyImages: multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 1024 * 1024 * 10,  
            files: 10
        },

        fileFilter: (req , file , cb) => {

            if(file.mimetype.startsWith('image/')){
                cb(null , true)
            }else{
                cb(new Error('only image files are allowed'))
            }
        }
    })


}

export default upload;
