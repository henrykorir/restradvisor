import React from 'react';
import StarGroup from '../components/StarGroup';

class ReviewForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			rating: 0,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRating = this.handleRating.bind(this);
	}
	handleRating(star){
		this.setState((state) => {
			return {rating: star};
		});
	}
	handleSubmit(e){
		const stars = this.state.rating <= 5 ? this.state.rating : 5;
		const comment = e.target[1].value;
		e.target[1].value = "";
		this.props.onPostReview({stars:stars, comment:comment});
		document.querySelectorAll(".review i").forEach((element) =>element.classList.remove("checked"));
		this.setState({rating: 0});
		e.preventDefault();
	}
	
	render(){
		return(
			<form className="review" onSubmit={this.handleSubmit} >
				<fieldset>
					<legend style={{"textAlign":"center"}}>Add Review</legend>
					<StarGroup stars = {0} onRating= {this.handleRating} />
					<textarea id="comment" name="comment">
					</textarea>
					<input style={{"float": "right"}}type="submit" id="submit" value="Submit"/>
				</fieldset>
			</form>
		);
	}
}
export default ReviewForm;