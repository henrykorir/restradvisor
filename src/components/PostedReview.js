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
		const reviews = this.props.record.ratings.map((review, i) =>
			<li key ={i.toString()}>
				<StarGroup stars={review.stars}/>
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