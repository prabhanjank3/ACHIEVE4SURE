const db = require('../models/index');
const Attachment = db.attachment;
const {uploadToGoogleDrive} = require('../services/googleDriveUpload');
const fs = require('fs')

exports.attachFile = (req, resp) => {
    
    const fileData = (req.file)?
    {
        originalname: req.file.originalname,
        mimetype:req.file.mimeType,
        buffer:req.file.buffer
    }:{
        originalname: req.body.originalname,
        mimetype:req.body.mimetype,
        content:`Generated from Achieve4Sure - ${req.body.id}`
    }
    uploadToGoogleDrive(fileData).then(response => {
        const body = {
            id:'AT'+Math.floor(Math.random()*100000),
            taskid:req.body.id,
            name:fileData.originalname,
            path:'https://drive.google.com/file/d/'+response.data.id
        }
        Attachment.create(body)
        .then(data => {
            resp.status(201).send(data);
        })
        .catch(err => {
            console.log(err)
            resp.status(500).send(err);
        });
    });
}
exports.getAllAttachmentsByTaskId = (req, resp) => {
    Attachment.findAll({where:{taskid:req.params.taskid}})
    .then(data => {
        resp.status(201).send(data);
    })
    .catch(err => {
        resp.status(500).send({
        message:
            err.message || "Some error occurred while fetching attachments."
        });
    });
}