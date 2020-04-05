import React, { Component } from "react";
import ReactDOM from "react-dom";

class CarouselComponent extends React.Component
{		
	render() {
		return
		(
			<div id="item" key={i}>
				<div id='buttonsDiv'>
					<h3 id="caption">{data[i].result.name}</h3>
					<Button id='yesButton' className="actionButton" value={JSON.stringify(data[i])} onClick={()=>this.rebuildSet(data[i], this.state.toFolder)} block>
						<HeartFill></HeartFill>
					</Button>
					<Button id='noButton' value={JSON.stringify(data[i])} onClick={()=>this.rebuildSet(data[i], this.state.noFolder)} variant="danger">
						<XSquareFill></XSquareFill>
					</Button>
				</div>
				<div id='imageDiv'>
					<a href={data[i].result.preview_url} target='_blank'>
						<img className="center" src={url} alt={data[i].result.name}/>
					</a>
				</div>
			</div>
		)
	}
}

export default CarouselComponent;