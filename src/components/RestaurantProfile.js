import React from 'react';
import StarGroup from '../components/StarGroup';

class RestaurantProfile extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		this.props.onClick({choice: 2, record: this.props.record});
	}
	
	render(){
		return(
			<div className="profile" onClick={this.handleClick}>
				<div>
					<h2>{this.props.record.restaurantName}</h2>
					<p>{this.props.record.address}</p>
				</div>
				<div className="rating">
					<StarGroup stars={this.props.record.ratings.length % 5} />
					<span style={{fontWeight: "bold"}}>
						{ this.props.record.ratings.length > 9 ?  " 9+ Reviews" : this.props.record.ratings.length + " Reviews" }
					</span>
				</div>
			</div>
		);
	}
}
export default RestaurantProfile;