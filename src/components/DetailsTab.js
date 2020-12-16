import React from 'react';
import RestaurantProfile from '../components/RestaurantProfile';
import PostedReview from '../components/PostedReview';
import ReviewForm from '../components/ReviewForm';
class DetailsTab extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			status: 1,
			record: props.data[0],
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(info){
		this.setState((state) =>{
			return { status: info.choice, record: info.record };
		});
		this.props.onShowHere({lat: info.record.lat, lng: info.record.long});
	}
	render(){
		let tab;
		switch(this.state.status){
			case 1:
				tab = this.props.data.map((info,i) =>
						<li key={i.toString()}>
							<RestaurantProfile record = {info} onClick={this.handleClick}/>
						</li>
					)
				tab = <ul>{tab}</ul>;
				break;
			case 2:
				tab = <PostedReview record={this.state.record} onClick={this.handleClick}/>;
				break;
			case 3:
				tab = <ReviewForm onClick ={this.handleClick}/>;
				break;
		}
		return(
			<div className="sidebar">
				{tab}
			</div>
		);
	}
}
export default DetailsTab;