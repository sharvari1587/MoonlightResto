import express from 'express'
import 'dotenv/config'
import conn_db from './db/conn.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { admin_route } from './routes/admin.route.js';
import { client_route } from './routes/client.route.js';
//import bodyParser from 'body-parser';

const app = express();

const corsoption = {
    origin:"http://localhost:5173",
    methods: "POST, GET, PUT, PATCH, DELETE, HEAD",
    credentials: true,
    optionsSuccessStatus: 204,
}
app.use(cors(corsoption))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(admin_route);
app.use(client_route);

app.set("views", "./views")
app.set('view engine','ejs')

conn_db().then(
    console.log("Connection successful")
)
app.listen(process.env.PORT, (req, res) => {

    console.log(`App Listening on Port Number: ${process.env.Port}`);
})
