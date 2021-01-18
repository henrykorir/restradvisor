import React from 'react';
class Star extends React.Component{
	constructor(props){
		super(props);
		this.state={
			on: false,
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		this.setState({on: true});
		e.target.classList.add("checked");
		let count = 1;
		let nextSibling = e.target.nextElementSibling;
		while(nextSibling) {
			nextSibling.classList.add("checked");
			nextSibling = nextSibling.nextElementSibling;
			count++;
		}
		this.props.onRating(count);
	}
	render(){
		const clicked = this.state.on === true ? "checked" : "";
		const status = this.props.status === undefined ? "" : this.props.status;
		const style = "fa fa-star " + status + clicked;
		return(
			<i className= {style} onClick={this.handleClick}></i>
		);
	}
}
export default Star;