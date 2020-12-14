import React from 'react';
import Star from '../components/Star';

class StarGroup extends React.Component{
	render(){
		console.log(this.props.ratings);
		return(
			<span>
				<Star status="checked" />
				<Star status="checked" />
				<Star />
				<Star />
				<Star />
			</span>
		);
	}
}
export default StarGroup;