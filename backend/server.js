
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes/routes.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5200

app.use(cors({
    origin: '*',
    methods: 'GET , POST, PUT , DELETE , PATCH , OPTION',
    credentials: true

}))

app.options('*' , cors())

app.use(express.json());

app.use(bodyParser.json())

app.use('/api' , router)

app.use('/public', express.static('public'))


app.listen(PORT , ()=>{
    console.log('the server is running on port 5200')
})

