const express  = require("express")
const app  =express()
const port = process.env.PORT || 5000
require ('dotenv').config()
const cors = require("cors")
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hxdwxas.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
   
    const database = client.db("EventsDB")
    const bookingCollection = database.collection("bookings")
    app.get('/bookings' , async(req , res) => {
        const cursor = bookingCollection.find()
        const bookings =await cursor.toArray()
        res.send(bookings)
    })
   
    app.post('/bookings' , async(req , res) => {
        const booking = req.body
        const result = await bookingCollection.insertOne(booking)
        res.send(result)
    })
   
   
    
  } finally {
    
  }
}
run().catch(console.dir);



app.get('/' , (req , res) => {
    res.send("the server is running")
})
app.listen(port , () => {
    console.log(`this is port ${port}`)
})
