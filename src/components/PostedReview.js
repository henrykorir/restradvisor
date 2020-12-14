import React from 'react';
import StarGroup from '../components/StarGroup';
import RestaurantProfile from '../components/RestaurantProfile';

class PostedReview extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		this.props.onClick(1);
	}
	render(){
		return(
			<div onClick={this.handleClick}>
				<h1>Review</h1>
			</div>
		);
	}
}
export default PostedReview;