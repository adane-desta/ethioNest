import db from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const signupModel = {
    addNewUser: async(newUser, profileImage) => {
        const connection = await db.getConnection();
        await connection.beginTransaction();

        try { 
            let profileImagePath = null;
            
            // Handle profile image upload if exists
            if (profileImage) {
                const uploadDir = path.join(__dirname, '../../images');
                
                // Create directory if it doesn't exist
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }

                const imageName = `${newUser.firstname}_${newUser.lastname}_${Date.now()}${path.extname(profileImage.originalname)}`;
                const imagePath = path.join(uploadDir, imageName);

                // Save image to filesystem
                await fs.promises.writeFile(imagePath, profileImage.buffer);
                profileImagePath = imageName;
            }

            const [insertedUser] = await connection.query(
                `INSERT INTO users(firstname, lastname, email, password, role, phone, bio, profile_picture, Preferredlocation) 
                VALUES(?,?,?,?,?,?,?,?,?)`,
                [
                    newUser.firstname,
                    newUser.lastname,
                    newUser.email,
                    newUser.password,
                    newUser.role || 'tenant', 
                    newUser.phone,
                    newUser.bio,
                    profileImagePath,
                    newUser.preferredLocation
                ]
            );

            await connection.commit();
            return insertedUser;
        } catch(error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
};

export default signupModel;