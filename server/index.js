const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const http = require('https')
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const PORT = process.env.PORT || 3000;
const APP_KEY = process.env.APP_KEY;
const URL = process.env.URL;
const AUTH = process.env.AUTH;

const app = express();
const axios = require("axios");
const stringifyObject = require('stringify-object');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.get('/api/login', (request, response) => 
{
	console.log('login');
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	response.setHeader('Access-Control-Request-Method', 'GET, POST, DELETE, PUT, OPTIONS');
	response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
	
	axios({
		method: 'get',
		url: 'https://www.dropbox.com/oauth2/authorize?client_id=' + APP_KEY + '&response_type=code',
		  headers: {
			'Content-Type' : 'application/json' , 
			'Authorization' : AUTH
		  }
	}).then(function (res) {	
		let pretty = stringifyObject(res.data, {
			singleQuotes: false
		});			
		
		pretty = pretty.replace('<img data-js-component-id=\"component2094695769983672184\" width=\"36\" alt=\"Dropbox\" src=\"https://cfl.dropboxstatic.com/static/images/logo_catalog/blue_dropbox_glyph_m1-vflZvZxbS.png\" />', '<img data-js-component-id=\"component2094695769983672184\" width=\"36\" alt=\"Dropbox\" src=\"https://cfl.dropboxstatic.com/static/images/logo_catalog/blue_dropbox_glyph_m1-vflZvZxbS.png\" />');
		
		response.send(pretty);
	})
	.catch(function (error) {
		response.send(error.response.data);
	});		
});

app.post('/api/find', (request, response) => {				
	console.log('find');	
	let item = request.query.item;	
	
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	response.setHeader('Access-Control-Request-Method', 'GET, POST, DELETE, PUT, OPTIONS');
	response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");	
	
	axios({
	  method: 'post',
	  url: 'https://api.dropboxapi.com/2/files/search_v2',
	  data: {
		query: item,
		include_highlights: false
	  },
	  headers: {
		'Content-Type' : 'application/json' , 
		'Authorization' : AUTH
	  }
	})
	.then(function (res) {
		console.log(res);		
		let data = res.data.matches;
		response.json(JSON.stringify(data));
		response.end();			
	})
	.catch(function (error) {
		console.log(error);
	});
});

app.post('/api/addFolder', (request, response) => {
	console.log('addFolder');	
	let newFolder = request.query.toFolder;	
	
	if(newFolder[0].indexOf('/')===-1)
		newFolder = '/' + newFolder;
	
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	response.setHeader('Access-Control-Request-Method', 'GET, POST, DELETE, PUT, OPTIONS');	
	response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
	
	axios({
	  method: 'post',
	  url: 'https://api.dropboxapi.com/2/files/create_folder_v2',
	  data: {
		path: newFolder,
		autorename: false
	  },
	  headers: {
		'Content-Type' : 'application/json' , 
		'Authorization' : AUTH
	  }
	})
	.then(function (res) {
		console.log(res);		
		let data = res.data.metadata;
		response.json(data);
		response.end();			
	})
	.catch(function (error) {
		console.log(error);
	});	
});

app.post('/api/metaData', (request, response) => {	
	console.log('metaData');	
	
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	response.setHeader('Access-Control-Request-Method', 'GET, POST, DELETE, PUT, OPTIONS');	
	response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
	
	axios({
	  method: 'post',
	  url: 'https://api.dropboxapi.com/2/files/get_metadata',
	  data: {
		path : request.query.id,
		include_media_info : false,
		include_deleted : false,
		include_has_explicit_shared_members : false 
	  },
	  headers: {
		'Content-Type' : 'application/json' , 
		'Authorization' : AUTH
	  }
	})
	.then(function (res) {
		response.json(res.data);	
	})
	.catch(function (error) {
		console.log(error);
	});	
});

app.post('/api/folderData', (request, response) => {	
	console.log('folderData');
	
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	response.setHeader('Access-Control-Request-Method', 'GET, POST, DELETE, PUT, OPTIONS');	
	response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
	//response.setHeader("Range", "HttpOnly;Secure;SameSite=Strict");
	
	axios({
	  method: 'post',
	  url: 'https://api.dropboxapi.com/2/files/list_folder',
	  data: {
			"path": request.query.fromFolder,
			"recursive": false,
			"include_media_info": false,
			"include_deleted": false,
			"include_has_explicit_shared_members": false,
			"include_mounted_folders": true,
			"include_non_downloadable_files": true
		},
	  headers: {
		'Content-Type' : 'application/json' , 
		'Authorization' : AUTH
	  }
	})
	.then(function (res) {
		console.log(res);		
		let data = res.data.entries.slice(0,20);
		response.json(data);
		response.end();			
	})
	.catch(function (error) {
		console.log(error);
	});	
});

app.post('/api/batchMetaData', (request, response) => {	
	console.log('bathMetaData');		
	let idArr = request.query.fileIDs.split(",");
	for(let i in idArr)
		idArr[i] = "\"" + idArr[i].concat("\"");	
	idArr.pop();
			
	let ids = '{"files":['+idArr.toString()+']}';
	ids = JSON.parse(ids);
	//console.log(ids);
	
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	response.setHeader('Access-Control-Request-Method', 'GET, POST, DELETE, PUT, OPTIONS');	
	response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict")
	
	axios({
	  method: 'post',
	  url: 'https://api.dropboxapi.com/2/sharing/get_file_metadata/batch',	 
	  data:	ids,
	  headers: {
		'Content-Type':'application/json',
		'Authorization' : AUTH
	  }
	})
	.then(function (res) {		
		console.log(res.data);
		response.json(res.data);
	})
	.catch(function (error) {
		console.log(error);
	});		
});

app.post('/api/moveFile', (request, response) => {	
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	response.setHeader('Access-Control-Request-Method', 'GET, POST, DELETE, PUT, OPTIONS')		
	response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
	
	const name = request.query.name;
	const from = request.query.fromFolder + name;
	const to = '/' + request.query.toFolder + '/' + name;
	
	axios({
	  method: 'post',
	  url: 'https://api.dropboxapi.com/2/files/move_v2',
	  data: {
		from_path: from,
		to_path: to,
		allow_shared_folder: false,
		autorename: true,
		allow_ownership_transfer: false
	  },
	  headers: {
		'Content-Type' : 'application/json' , 
		'Authorization' : AUTH
	  }
	})
	.then(function (res) {	
		let data = res.data.metadata;	
		response.json(data);
		response.end();
	})
	.catch(function (error) {
		console.log(error);
	});		
});

app.listen(PORT, () =>
  console.log('Express server is running on localhost:3001')
);