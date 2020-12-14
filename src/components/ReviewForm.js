import React from 'react';
import StarGroup from '../components/StarGroup';

class ReviewForm extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e){
		this.props.onClick(1);
		console.clear();
		console.log(e);
		e.preventDefault();
	}
	render(){
		return(
			<div className="review">
				<form onSubmit={this.handleSubmit} >
					<textarea id="comment" name="comment">
					</textarea>
					<input type="submit" id="submit" value="Submit Your Review"/>
				</form>
			</div>
		);
	}
}
export default ReviewForm;