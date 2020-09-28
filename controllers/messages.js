const Messages = require('../models/dbMessages');


exports.getMessages = (req,res)=> { 
    Messages.find((err,data)=> { 
        if (err) {
            res.status(500).json({
                success:false,
                messages:JSON.stringify(err)
            })
        } else {
            res.status(200).json({
                success:true,
                messages:data
            })
        }
    })
}

// post new messages
exports.createNewMessage = (req,res) => { 
    const dbMessage = req.body;
    Messages.create(dbMessage,(err,data)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
}