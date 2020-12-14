import React from 'react';
import RestaurantProfile from '../components/RestaurantProfile';
import PostedReview from '../components/PostedReview';
import ReviewForm from '../components/ReviewForm';
class DetailsTab extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			status: 1,
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(choice){
		this.setState((state) =>{
			return { status: choice };
		});
	}
	render(){
		let tab;
		switch(this.state.status){
			case 1:
				tab = <ul>
						{
							this.props.data.map((info,i) =>
								<RestaurantProfile key={i.toString()} record = {info} onClick={this.handleClick}/>
							)
						}
					</ul>;
				 
				break;
			case 2:
				tab = <PostedReview onClick={this.handleClick}/>;
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