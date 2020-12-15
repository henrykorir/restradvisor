import React from 'react';
class Star extends React.Component{
	render(){
		const style = "fa fa-star " + this.props.status;
		return(
			<i className= {style} ></i>
		);
	}
}
export default Star;