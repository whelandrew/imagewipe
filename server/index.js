const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const http = require('https')
const fs = require('fs');
const download = require('image-downloader')
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const PORT = process.env.PORT || 3000;
const APP_KEY = process.env.APP_KEY;
const AUTH = process.env.AUTH;
const app = express();
const axios = require("axios");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post('/api/imageData', (request, response) => {	
	console.log('imageData');
	
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	response.header('Access-Control-Request-Method', 'GET, POST, DELETE, PUT, OPTIONS');	
	
	async function getInfo(){
		try {
			const res = await axios.post(
				'https://api.dropboxapi.com/2/files/get_metadata',
				{ 	"path" : request.query.id,
					"include_media_info" : false,
					"include_deleted" : false,
					"include_has_explicit_shared_members" : false 
				},
				{
					headers: {
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
						'Access-Control-Request-Method' : 'GET, POST, DELETE, PUT, OPTIONS',
						'Content-Type' : 'application/json' , 
						'Authorization' : AUTH
					}
				}
			);		
			
			let arr = res.data;
			delete arr[".tag"];
			response.json(arr);			
		}
		catch(error) {
			console.log(error);
		}
	}
	
	getInfo();
});

app.get('/api/moveImage', (request, response) => {	
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	response.setHeader('Access-Control-Request-Method', 'GET, POST, DELETE, PUT, OPTIONS')		
	
	async function move(){
		try {
			const res = await axios.post(
				'https://api.dropboxapi.com/2/files/move_v2',
				{
					"from_path": request.query.fromFolder,
					"to_path": request.query.toFolder + "/" + request.query.fileName,
					"allow_shared_folder": false,
					"autorename": true,
					"allow_ownership_transfer": false
				},
				{
					headers: {
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
						'Access-Control-Request-Method' : 'GET, POST, DELETE, PUT, OPTIONS',
						'Content-Type' : 'application/json' , 
						'Authorization' : AUTH
					}
				}
			);		
			
			response.end();
		}
		catch(error) {
			console.log(error);
		}
	}
	
	move();
});

app.get('/api/addFolder', (request, response) => {		
	
	console.log('addFolder');
	
	let newFolder = request.query.toFolder;	
	
	if(newFolder[0].indexOf('/')===-1)
		newFolder = '/' + newFolder;
	
	async function createFolder(){
		try {
			const res = await axios.post(
			'https://api.dropboxapi.com/2/files/create_folder_v2',
			{
				"path": newFolder,
				"autorename": false
			},
			{
				headers: {
					'Access-Control-Allow-Origin' : '*',
					'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
					'Access-Control-Request-Method' : 'GET, POST, DELETE, PUT, OPTIONS',
					'Content-Type' : 'application/json' , 
					'Authorization' : AUTH
				}
			});		
			
			response.send();
		}
		catch(error) {
			console.log(error);
		}
	}
	
	createFolder();
});

app.get('/api/removeImage', (request, response) => {	
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	response.setHeader('Access-Control-Request-Method', 'GET, POST, DELETE, PUT, OPTIONS');	
		
	
	let data = {path:request.query.url};	
	
	let json = JSON.stringify(data);
	let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.dropboxapi.com/2/files/delete_v2");
    xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", AUTH);
    xhr.send(json);	
	
	response.send();
});

app.get('/api/getImage', (request, response) => {  	
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	response.setHeader('Access-Control-Request-Method', 'GET, POST, DELETE, PUT, OPTIONS');		
	
	const options = {
	  url: request.query.url,
	  dest: '\saved'
	}
 
	async function downloadIMG() {
	  try {
		const { filename, image } = await download.image(options);
		console.log(filename);		
		response.send();
	  } catch (e) {
		console.error(e)
	  }
	}
	 
	downloadIMG()
});

app.listen(PORT, () =>
  console.log('Express server is running on localhost:3001')
);