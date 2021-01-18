import React from 'react';
import RestaurantProfile from '../components/RestaurantProfile';
import PostedReview from '../components/PostedReview';

class DetailsTab extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			status: 1,
			record: props.data[0],
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleReview = this.handleReview.bind(this);
	}
	handleClick(info){
		this.setState(( state ) =>{
			return { status: info.choice, record: info.record };
		});
		this.props.onShowHere({lat: info.record.lat, lng: info.record.long});
	}
	handleReview(review){
		console.log(review);
		let record = this.state.record;
		record.ratings.unshift(review);
		this.setState({record: record});
	}
	render(){
		let tab;
		switch(this.state.status){
			case 1:
				tab = this.props.data.map((info,i) =>
						<li key={i.toString()}>
							<RestaurantProfile record = { info } fixed={false}onClick={ this.handleClick }/>
						</li>
					)
				tab = <ul>{tab}</ul>;
				break;
			case 2:
				tab = <PostedReview record={ this.state.record } onClick={ this.handleClick } onPostReview = {this.handleReview}/>;
				break;
			default:
				break;
		}
		return(
			<aside className="sidebar">
				{tab}
			</aside>
		);
	}
}
export default DetailsTab;