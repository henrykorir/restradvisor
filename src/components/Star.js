import React from 'react';
class Star extends React.Component{
	render(){
		return(
			<i className={ "fa fa-star " + this.props.status } ></i>
		);
	}
}
export default Star;