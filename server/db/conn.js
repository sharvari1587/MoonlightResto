import mongoose from 'mongoose'

const conn_db = async()=>
{
    try {

        const connection = await mongoose.connect(`${process.env.CONN_NAME}${process.env.DB_NAME}`)
        
    } catch (error) {
        console.log(error);
    }
}

export default conn_db;