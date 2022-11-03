const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kfc3dzw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const connnectDatabase = async () => {
    try{
        const productDatabse = client.db('emaShop').collection('emaJohnProduct');

        app.get('/products', async (req,res) => {
            const page = req.query.page;
            const size = req.query.size;
            const cursor = productDatabse.find({});
            const products = await cursor.skip(page* +size).limit(+size).toArray();
            const count = await productDatabse.estimatedDocumentCount();

            res.send({count,products});
        })

    }finally{}
}
connnectDatabase().catch(err => console.log(err))



app.listen(port, () => {
    console.log(`server is listening on port:${port}`);
})


app.get('/', (req,res) => {
    res.send('Server is running')
})


