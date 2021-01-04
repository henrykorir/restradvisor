import React from 'react';
import StarGroup from '../components/StarGroup';
import RestaurantProfile from '../components/RestaurantProfile';

class PostedReview extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		this.props.onClick({choice: 1, record: this.props.record});
	}
	render(){
		function verdict(stars){
			let meaning = "Terrible";
			if(stars === 1)
				meaning = "Terrible";
			if(stars === 2)
				meaning = "Poor";
			else if(stars === 3)
				meaning = "Average";
			else if(stars === 4)
				meaning = "Good";
			else
				meaning = "Excellent";
			return meaning;
		}
		const reviews = this.props.record.ratings.map((review, i) =>
			<li key ={i.toString()}>
				<div style={{"display":"flex", "flexDirection":"row"}}>
					<StarGroup stars={review.stars}/>
					<span style={{"margingLeft":".5em","fontWeight":"bold"}}>{verdict(review.stars)}</span>
				</div>
				<p>{review.comment}</p>
			</li>
		);
		return(
			<div>
				<RestaurantProfile record={this.props.record} onClick = {this.handleClick}/>
				<ul>
					{reviews}
				</ul>
			</div>
		);
	}
}
export default PostedReview;