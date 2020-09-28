const rooms = require('../models/rooms');



exports.newGroup = (req,res)=>{
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
}

exports.getRooms = (req,res) => {
    
    rooms.find({},(err,data) => {
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
}