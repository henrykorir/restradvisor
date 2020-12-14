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
			<li className="profile" onClick={this.handleClick}>
				<div>
					<h2>{this.props.record.restaurantName}</h2>
					<p>{this.props.record.address}</p>
				</div>
				<div className="rating">
					<StarGroup ratings={this.props.record.ratings} />
					<span style={{fontWeight: "bold"}}>
						{this.props.record.ratings.length > 9 ?  " 9+ Reviews" : this.props.record.ratings.length + " Reviews" }
					</span>
				</div>
			</li>
		);
	}
}
export default RestaurantProfile;