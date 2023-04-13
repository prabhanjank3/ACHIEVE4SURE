const multer = require('multer');
const path = require( 'path' );
const dotenv = require("dotenv").config();
const {google} = require('googleapis');
const fs = require('fs');
const stream = require('stream');
const diskUpload = multer();


// service account key file from Google Cloud console.
const KEYFILEPATH = 'robotic-land-358413-57fc6bae998e.json';

// Request full drive access.
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
	keyFile: KEYFILEPATH,
	scopes: SCOPES
});

const driveService = google.drive({ version: "v3", auth });

const uploadToGoogleDrive = async (file) => {
	const fileMetadata = {
		name: file.originalname,
		mimeType:file.mimetype,
		parents: ["1AEByrrzm97tkss5OwPsHieh0-iCRkUOP"], // Change it according to your desired parent folder id
	};
	const media = {
	mimeType: file.mimetype,
	};

	if(file.buffer)
	{
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
	media.body = bufferStream
	}
	if(file.content)
	{
		media.body = file.content
	}
	
	const response = await driveService.files.create({
	  requestBody: fileMetadata,
	  media: media,
	  fields: "id",
	});
	return response;
  };

  module.exports.diskUpload = diskUpload;
  module.exports.uploadToGoogleDrive = uploadToGoogleDrive;
