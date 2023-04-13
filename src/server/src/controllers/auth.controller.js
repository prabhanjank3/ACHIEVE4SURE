const db = require('../models/index');
const User = db.users;

exports.AuthenticateUser = (req, resp) => {
    User.findOne({where:{email:req.body.email}})
    .then(res => {
        resp.send(res);
    })
    .catch(err => {
        resp.status(500).send({message: err.message})
    });
}