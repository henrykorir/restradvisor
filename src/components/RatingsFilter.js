import React from 'react';
class RatingsFilter extends React.Component{
	render(){
		return(
			<div className="slider">
				<input id="a" type="range" min="1" max="5" value="2" aria-valuetext="1" list="ratings"/>
				<input id="b" type="range" min="1" max="5" value="3" aria-valuetext="5" list="ratings"/>
				<datalist id="ratings">
					<option value="1" label="1">1</option>
					<option value="2" label="2">2</option>
					<option value="3" label="3">3</option>
					<option value="4" label="4">4</option>
					<option value="5" label="5">5</option>
				</datalist>
			</div>
		);
	}
}
export default RatingsFilter;