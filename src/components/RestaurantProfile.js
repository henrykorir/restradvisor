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
		let profile_style =  this.props.fixed === true ? "profile fixed" : "profile";
		let latlng = this.props.record.lat + "," + this.props.record.long;
		let photo_url = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location="+latlng+"&fov=80&heading=70&pitch=0&key=AIzaSyDEehuutoA7e5pBBvhSgJ3n_PQdpHIVYtY"
		let back = this.props.view === 1 ? "" : <span style={{"float":"right"}}>back</span>;
		let reviewInfo = null;
		if( this.props.record.ratings.length !== undefined)
		reviewInfo = this.props.record.ratings.length > 9 ?  " 9+ Reviews" : this.props.record.ratings.length + " Reviews" ;
		
		return(
			<div className={ profile_style } onClick={this.handleClick}>
				{ back }
				<div>
					<img src={photo_url} alt="restraunt street view"/>
					<h2>{this.props.record.restaurantName}</h2>
					<p>{this.props.record.address}</p>
				</div>
				<div className="rating">
					<span style={{"fontWeight":"bold"}}>{this.props.record.averageRating}</span>
					<StarGroup stars={this.props.record.averageRating} />
					<span style={{fontWeight: "bold"}}>
						{reviewInfo}
					</span>
				</div>
			</div>
		);
	}
}
export default RestaurantProfile;