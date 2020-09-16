// importing
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const Messages = require('./dbMessages')
const Pusher = require('pusher');

// app config 
const app = express();
const port =  process.env.PORT || 9000;

const pusher = new Pusher({
    appId: '1073507',
    key: 'cfd9cf9c2d260e7a8a9d',
    secret: '9d45aae141d4073ed62a',
    cluster: 'ap2',
    encrypted: true
});

// middleware
app.use(cors());
app.use(express.json());

// dbconfig
const connection_url =  'mongodb+srv://admin:PK98dV2jaRHlDx27@cluster0.cvar8.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
const db = mongoose.connection;

db.once("open",()=>{
    console.log("db connected.....");
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();
    changeStream.on("change",(change)=> {
        if (change.operationType == 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',{
                name:messageDetails.user,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received : messageDetails.received
            })
        } else {
            console.log('error in trigering pusher...');
        }
    })
})

// API ROUTES
app.get('/',(req,res)=> res.status(200).send(' hello word'));

app.get('/api/message/sync', (req,res)=> { 
    Messages.find((err,data)=> { 
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// post new messages
app.post('/api/messages/new',(req,res)=>{
    const dbMessage = req.body;
    Messages.create(dbMessage,(err,data)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

// listen 
app.listen(port,() => console.log(`Listining on localhost:${port}`) )


//  mongdb passwword PK98dV2jaRHlDx27