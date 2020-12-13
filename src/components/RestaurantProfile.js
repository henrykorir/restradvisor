import React from 'react';
import StarGroup from '../components/StarGroup';

class RestaurantProfile extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		this.props.onClick(2);
	}
	
	render(){
		return(
			<div onClick={this.handleClick}>
				<h1>Profile</h1>
			</div>
		);
	}
}
export default RestaurantProfile;