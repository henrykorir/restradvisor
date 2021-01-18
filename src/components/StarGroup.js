import React from 'react';
import Star from '../components/Star';

class StarGroup extends React.Component{
	render(){
		const stars = [];
		let i = 1;
		for(;i<= this.props.stars; i++){
			stars.unshift(<Star key = {i.toString()} onRating={this.props.onRating} status="checked" />);
		}
		if(this.props.stars < 5){
			for(;i<= 5; i++){
				stars.unshift(<Star key = {i.toString()} onRating={this.props.onRating} />);
			}
		}
		
		return(
			<span className="star--container">
				{ stars }
			</span>
		);
	}
}
export default StarGroup;