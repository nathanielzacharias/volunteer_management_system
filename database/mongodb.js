// const { MongoClient } = require("mongodb")

// const uri = "mongodb+srv://nathanielproject2:ILoveMcSpicy@cluster0.ru8xaxp.mongodb.net/test";
// const dbName = "volunteer_management_system"

// const Client = new MongoClient(uri)
// const Db = Client.db(dbName)

// module.exports = {
//     client: Client,
//     db: Db,
// }



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.ru8xaxp.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "test"

// const uri = "mongodb://localhost:27017/volunteer_management_system";
// const dbName = "volunteer_management_system"

const Client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const Db = Client.db(dbName)

module.exports = {
    client: Client,
    db: Db,
}

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log("we're in Atlas")
//   // perform actions on the collection object
//   client.close();
// });


