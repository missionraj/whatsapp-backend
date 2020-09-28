const users = require('../models/users');


exports.checkUser = (req,res) => {
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
}

exports.registerUser =  (req,res)=> { 
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
}  

