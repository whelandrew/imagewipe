import React, { Component } from "react";
import ReactDOM from "react-dom";
import CarouselComponent from "./CarouselComponent";

import "./slick.css";
import "./slick-theme.css";

import DropboxChooser from 'react-dropbox-chooser';
import { HeartFill, XSquareFill } from 'react-bootstrap-icons';
import Slider from "react-slick";
import {Button, Alert, Form} from 'react-bootstrap';

const URL = "http://localhost:3001";
const sliderProps = {dots: false,infinite: true,speed: 500,slidesToShow: 1,slidesToScroll: 1,loading: false};

class ImageSwiper extends React.Component 
{	
	constructor(props) {
		super(props);			
		
		this.logKey = this.logKey.bind(this);
		this.buildHTML = this.buildHTML.bind(this);
		this.getLocalFiles = this.getLocalFiles.bind(this);
		this.setFromFolder = this.setFromFolder.bind(this);
		this.loadScreen = this.loadScreen.bind(this);
		this.rebuildSet = this.rebuildSet.bind(this);		
		this.submitToFolder = this.submitToFolder.bind(this);
		this.getFiles = this.getFiles.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.fillCarousel = this.fillCarousel.bind(this);
		this.foundFolders = this.foundFolders.bind(this);
		this.setFiles = this.setFiles.bind(this);		
				
		this.state = {
			fromFolder: null,
			toFolder: null,
			files:[],
			carousel:[],
			hasError:false,
			noFolder: 'UnwantedFiles',
			count:0,
			ready:false,
			markup:<div></div>
		}		
		
	}		
	
	rebuildSet(data, toFolder) 	
	{
		console.log("rebuildSet");			
		this.loadScreen(true);
		
		fetch(URL + '/api/moveFile?name=' + data.result.name +'&toFolder=' + toFolder + '&fromFolder=' + this.state.fromFolder, {method: "POST"})
		.then( res => { return res.json(); })
		.then( data => {						
			console.log('Moved ' + data.name);
			let newList = this.state.files.replace(data.id + ',', '');

			this.setState({files:newList});			
			this.setState({finished:false});
			localStorage.setItem('fileIDs',newList);
			console.log("files size is " + this.state.files.length);
			this.fillCarousel();
		});
	}
	
	checkForFolders()
	{
		console.log("checkForFolders");
		const to = localStorage.getItem("fromFolder");
		const from = localStorage.getItem("toFolder");		
		const fileIDs = localStorage.getItem('fileIDs');		
		const found = (to!=null && from !=null && fileIDs != null);		
		
		this.setState({fromFolder:from});
		this.setState({toFolder:to});
		
		if(found) this.getFiles(fileIDs);			
	}
	
	getLocalFiles() 
	{
		this.setState({fromFolder:localStorage.getItem("fromFolder")});
		this.setState({toFolder:localStorage.getItem("toFolder")});		
		this.setState({files:localStorage.getItem("fileIDs")});
	}	
	
	logKey(e) 
	{
		if(e.code === 'ArrowUp')
		{			
			const el = document.getElementById('yesButton');			
			if(el != null)
				this.rebuildSet(JSON.parse(el.value), this.state.toFolder)
		}
		
		if(e.code === 'ArrowDown')
		{			
			const el = document.getElementById('noButton');
			if(el!=null)
				this.rebuildSet(JSON.parse(el.value), this.state.noFolder)
		}
	}
	
	buildHTML(data)
	{
		console.log(data);
		let carousel=[];
		let count=0;
		for(let i in data){
			let url = data[i];
			if(data[i].result != null)
				url = data[i].result.preview_url.replace('dl=0','dl=1');				
			carousel.push(<CarouselComponent data={data[i]} />)
		}			
						
		this.setState({count:count});
		this.setState({carousel:carousel});		
	}
	
	fillCarousel()
	{
		if(!this.state.finished)
		{	
			this.setState({finished:true});			
			if(typeof this.state.files === 'string')
			{				
				if(this.state.files === '')
				{	
					if(this.loadScreen != null)
						this.loadScreen(true);
					
					fetch(URL + '/api/folderData?fromFolder=' + this.state.fromFolder, {method: "POST"})
					.then( res => 	{ return res.json(); })
					.then( data => { 									
						let newIDs='';						
						data.forEach(el => newIDs+=(el.id)+',');
						localStorage.setItem("fileIDs", newIDs);						
						this.setState({files:newIDs});		
						
						if(this.loadScreen != null)
							this.loadScreen(true);
					
						fetch(URL + '/api/batchMetaData?fileIDs=' + this.state.files, {method: "POST"})
						.then( res => 	{ return res.json(); })
						.then( data => { 
							this.buildHTML(data);
							this.loadScreen(false);
						});
					})
				}
				else
				{
					console.log('fillCarousel');	
					
					if(this.loadScreen != null)
						this.loadScreen(true);
					
					fetch(URL + '/api/batchMetaData?fileIDs=' + this.state.files, {method: "POST"})
					.then( res => 	{ return res.json(); })
					.then( data => { 
						this.buildHTML(data);
						this.loadScreen(false);
					});		
				}
			}
			else
			{
				if(this.state.fromFolder === null)
				{
					setTimeout(()=>{
						this.getLocalFiles();
						this.setState({finished:false});
						this.fillCarousel();
					}, 3000);
				}
			}
		}		
		else
		{
			if(this.state.fromFolder === null)
			{
				setTimeout(()=>{
					this.getLocalFiles();
				}, 3000);
			}
		}	
	}	
	
	onCancel() 
	{
		alert("Canceled");
	}	
	
	setFromFolder(fileSet) 
	{
		console.log("setFromFolder");				
		let from = localStorage.getItem("fromFolder");
		this.loadScreen(true);
		if(typeof fileSet === "object")
			from = fileSet[0].id;			
		if(from === null)
			from = fileSet[0].id;		
			
		fetch(URL + '/api/metaData?id=' + from, {method: "POST"})
		.then( res => 	{ return res.json(); })
		.then( data => {		
			const from = data.path_display.replace(data.name,"");			
			localStorage.setItem("fromFolder",from);
			this.setState({fromFolder:from});
			this.setFiles(fileSet);
			this.loadScreen(false);
		});				
	}
	
	setFiles(files)
	{		
		console.log('setFiles');		
		let savedSet="";		
		files.forEach(el => savedSet += el.id + ',');						
		localStorage.setItem("fileIDs", savedSet);
		this.getFiles(savedSet)
		this.setState({files:savedSet});		
	}
	
	getFiles(files)
	{	
		console.log("getFiles");				
		this.loadScreen(true);
		const ids = files.split(',');
		this.setState({files:ids});
	}	
	
	submitToFolder(e) 
	{						
		console.log("submitToFolder");		
		this.loadScreen(true);
		let newFolder = document.getElementById("formControl").value;		
		fetch(URL + '/api/find?item=' + newFolder, {method: "POST"})
		.then( res => 	{ return res.json(); })
		.then( data => {			
			if(data.indexOf("metadata") === -1){
				console.log("addFolder");
				fetch(URL + '/api/addFolder?toFolder=' + newFolder, {method: "POST"})
				.then( res => 	{ return res.json(); })
				.then( data => { 
					alert("Folder Added"); 
					this.loadScreen(false)
					localStorage.setItem("toFolder",newFolder);
					this.setState({toFolder,newFolder});
					this.setState({loading:false});
				});
			}
			else
			{
				console.log("Folder found");	
				localStorage.setItem("toFolder",newFolder);						
				data = JSON.parse(data);								
				this.setState({toFolder:data[0].metadata.metadata.path_display});
				this.loadScreen(false)
			}		
		});		
	}
	
	componentDidMount()
	{
		console.log("componentDidMount");			
		this.getLocalFiles();
		document.onkeydown = this.logKey;
	}
  
  loadScreen(isOn)
  {	  
	if(this.state.loading != isOn)
		this.setState({loading:isOn});
  }
  
  foundFolders() 
  {
	  console.log('foundFolders');
	  const from = localStorage.getItem('fromFolder');
	  const to = localStorage.getItem('toFolder');
	  
	  this.setState({fromFolder:from});
	  this.setState({toFolder:to});
	  
	  return (from!=null && to!=null);	
	}
	
	render() 
	{			
		return (
		<div>
			{this.state.markup}				
				{	this.state.loading===true
					&&	<div id="loadScreen">
							<h1>Loading...</h1>
						</div>
				}
				
				{	typeof this.state.toFolder != 'string'						
					&&	<div key="noFoldersForm" id="noFolderForm">					
							<div id="formGroup" controllid="formNewFolder">
								<h2>Type Name Of Folder To Keep Likes</h2>
								<h1>toFolder</h1>
								<input type="text" id="formControl"/>
								<p className="text-muted">Any image you choose to keep will be moved to this folder.</p>
							</div>
							<Button id="formButton" variant="primary" type="submit" onClick={this.submitToFolder}>Submit</Button>					
						</div>	
				}
				
				{	typeof this.state.fromFolder != 'string'						
					&& <div key="dropboxChooser">			
						<DropboxChooser 				
						appKey={this.props.APP_KEY}
						success={files => this.setFromFolder(files)}
						cancel={() => this.onCancel()}
						multiselect={true} 
						extensions={["images"]}
						folderselect={true}>
						<Button size="lg" variant="primary" className="dropbox-button" block>Choose a Folder to Move From</Button>							
					</DropboxChooser></div>
				}					
				
				{	this.state.files != null	
					&&	<div key='carousel' id='carousel'>
							<div>
								<h1>Viewing {this.state.count} from {this.state.fromFolder}</h1>
								<h1>to {this.state.toFolder}</h1>
							</div>
							{this.fillCarousel()}
							<Slider {...sliderProps} id='SliderMain'>
								{this.state.carousel}
							</Slider>
						</div>
				}			
		</div>);		
	}
}

export default ImageSwiper;

const wrapper = document.getElementById("create-template");
wrapper ? ReactDOM.render(<ImageSwiper />, wrapper) : false;