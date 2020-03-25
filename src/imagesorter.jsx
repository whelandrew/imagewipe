import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import DropboxChooser from 'react-dropbox-chooser';

import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';

const APP_KEY = "h9fot2c8bxz7gcg";
const URL = "http://localhost:3001";	
const AUTH = "Bearer RvRO6h55szQAAAAAAAH2txU3jqcMgYHn-zdktTsTEKrHG39t0xdEjuUk-MxXr7Fy"

class ImageSwiper extends React.Component {	
	constructor(props) {
		super(props);			
				
		this.moveFile = this.moveFile.bind(this);
		this.OnSubmit = this.onSubmit.bind(this);
		this.onSuccess = this.onSuccess.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.showAlert = this.showAlert.bind(this);
		this.fillCarousel = this.fillCarousel.bind(this);
		
				
		this.state = {
			fromFolder:"Select Folder  Location",
			toFolder:"",
			images:[],
			waiting : false,
			ready: false,
			name:""
		}
	}	
	
	async moveFile(e) {
		let file;
		let index = e.target.value;
		let newSet = new Array();		
		if(e.target)
			file = this.state.images[e.target.value];		
		else 
			file=this.state.images[e.value];		
			
		let url = file.link.replace("?dl=0","?dl=1");
		
		fetch(URL + '/api/imageData?id=' + encodeURIComponent(file.id), {method: "POST"})
			.then( res => 	{
				return res.json();
			})
			.then( data => {
				fetch(URL + '/api/moveImage?fileName=' + encodeURIComponent(data.name) +'&toFolder='+ this.state.toFolder+'&fromFolder='+encodeURIComponent(data.path_display), {method: "GET"})
				.then( res => {					
					for(let i=0;i<this.state.images.length;i++)
					{
						if(i!=index)
							newSet.push(this.state.images[i]);
					}
					
					this.setState({images:newSet});
				});
			});
			
			this.setState({name:file.name});			
			this.showAlert(true);
	}
	
	fillCarousel(){
		let carousel = [];
		let imgs = this.state.images;		
		
		for(let i=0;i<imgs.length;i++){
			let img = imgs[i].link.replace("?dl=0","?dl=1");
			carousel.push(<Carousel.Item id="item" key={i}><img className="d-block center" src={img} alt={imgs[i].name}/><Carousel.Caption id="caption"><h3>{imgs[i].name}</h3><Button className="actionButton" value={i} onClick={this.moveFile} block>Keep</Button></Carousel.Caption><Button variant="danger">Delete</Button></Carousel.Item>);
			document.getElementById('carousel').style.visibility = "visible";
		}	
		
		return carousel;
	}
	
	onCancel(){
		alert("Canceled");
	}
	
	onSuccess(files){		
		this.setState({images:files});		
		fetch(URL + '/api/imageData?id=' + encodeURIComponent(files[0].id), {method: "POST"})
			.then( res => 	{
				return res.json();
			})
			.then( data => {
				let first=0;
				let second=0;
				let str = data.path_display;
				
				for(let i=0;i<str.length;i++){
					let j = str[i].indexOf('/');					
					if(j!=-1)
					{
						if(i<first)
							first=i;
						if(i>second)
							second=i;
					}
				}								
				
				this.setState({fromFolder:str.substring(first, second+1)});						
			});
			
			this.setState({ready:true});
	}	
	
	showAlert(yes) {
		let alert = document.getElementById('alert');
		let name = this.state.name;
		if(yes)
		{
			alert.classList.remove("invisble");
			alert.innerHTML =  "${name} was saved!";
		}
		else 
		{
			alert.classList.add("invisible");			
			alert.innerHTML = "";
		}
	}
	
	onSubmit(e) {
		let newFolder = document.getElementById("formControl").value;
		fetch(URL + '/api/addFolder?toFolder=' + encodeURIComponent(newFolder), {method: "GET"})
		.then( res => 	{
				return res.json();
			})
			.then( data => {			
			console.log(data);
				if(res.status===200)
				{
					if(newFolder[0].indexOf('/')===-1)
						newFolder = '/' + newFolder;

					this.setState({toFoler:newFolder});
					let el = document.getElementById('noFolderForm');
					el.setAttribute("className","invisible");
				}
			}
			
		)
	}
	
	componentDidMount(){
	}
	  
	componentWillUnmount() {		
	}	
	
	render() {
		const items=[];
		
		return (<div>			
			{this.state.toFolder==="" &&
				<div id="noFolderForm">
					<Form onSubmit={this.onSubmit}>
						<Form.Group id="formGroup" controllid="formNewFolder">
							<Form.Label>Enter New Folder</Form.Label>
							<Form.Control type="text" id="formControl" />
							<Form.Text className="text-muted">Any image you choose to keep will be moved to this folder.</Form.Text>
						</Form.Group>
						<Button id="formButton" variant="primary" type="submit">Submit</Button>
					</Form>
				</div>
			}
				<div>
				{this.state.toFolder !="" && <h1>Saving to {this.state.toFolder}</h1>}
					<DropboxChooser 
						appKey={APP_KEY}
						success={files => this.onSuccess(files)}
						cancel={() => this.onCancel()}
						multiselect={true} 
						extensions={["images"]}
						folderselect={true}
						>
						<Button size="lg" variant="success" className="dropbox-button" block>{this.state.fromFolder}</Button>							
					</DropboxChooser>

					<Alert key="1Alert" variant="success" id="alert" className="invisible" onClose={() => this.showAlert(false)} dismissible>You have kept {this.state.name}</Alert>
					{this.state.images.length < 1 && <h1>This Folder Is Empty</h1>}
							
					<div id="carousel">
						
						<Carousel indicators={false}>
							{this.fillCarousel()}
						</Carousel>
					</div>
				</div>
      </div>);
	}
}

export default ImageSwiper;

const wrapper = document.getElementById("create-template");
wrapper ? ReactDOM.render(<ImageSwiper />, wrapper) : false;