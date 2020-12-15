import React from 'react';
import Star from '../components/Star';

class StarGroup extends React.Component{
	render(){
		const stars = [];
		let i = 1;
		for(;i<= this.props.stars; i++){
			stars.push(<Star key = {i.toString()} status="checked" />);
		}
		if(this.props.stars < 5){
			for(;i<= 5; i++){
				stars.push(<Star key = {i.toString()} />);
			}
		}
		return(
			<span>
				{ stars }
			</span>
		);
	}
}
export default StarGroup;