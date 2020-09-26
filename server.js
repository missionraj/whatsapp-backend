// importing
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const Messages = require('./models/dbMessages')
const users = require('./models/users');
const rooms = require('./models/rooms');
const Pusher = require('pusher');


require('custom-env').env('development');

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
const connection_url =  `mongodb+srv://admin:${process.env.password}@cluster0.cvar8.mongodb.net/whatsappdb?retryWrites=true&w=majority`;
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

// find the user if already registerd or not
app.post('/api/checkuser', (req,res)=> { 
    const { email } = req.body;
    users.findOne({email: email}, function (err, user) {
        if (!err) { 
            res.json({
                success:true,
                user:user
            })   
        } else { 
            res.json({
                success:false,
                message : JSON.stringify(err)
            })
        }
    })
})

// find the user if already registerd or not
app.post('/api/registerUser', (req,res)=> { 
    const data = req.body;
    users.create(data, function (err, user) {
        if (!err) { 
            res.json({
                success:true,
                user: user
            })
        } else {  
            res.json({
                success:false,
                user: err
            })
        }
    });
})

// cerate a new chat group 
app.post('/api/newgroup',(req,res)=>{
    const data = req.body;
    rooms.create(data,function (err, room) {
        if (!err) { 
            res.json({
                success:true,
                user: room
            })
        } else {  
            res.json({
                success:false,
                user: err
            })
        }
    });
})
// get rooms
app.get('/api/getRooms',(req,res)=>{
    rooms.find({},(err,data)=>{
        if (!err) { 
            res.json({
                success:true,
                rooms: data
            })
        } else {
            res.json({
                success:false,
                rooms: data
            })
        }
    })
})

// listen 
app.listen(port,() => console.log(`Listining on localhost:${port}`) )


//  mongdb passwword PK98dV2jaRHlDx27