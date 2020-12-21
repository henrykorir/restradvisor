import React from 'react';
class RatingsFilter extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			minValue: 1,
			maxValue: 5,
			step: 1,
			firstValue: 0,
			secondValue: 0
		};

		this.handleChange = this.handleChange.bind(this);
	}
	componentDidUpdate(prevProps,prevState) {
	}
	componentDidMount(){
		this.setState({firstValue: this.state.minValue, secondValue: this.state.maxValue});
	}

	handleChange(name, event){
		let value = event.target.value;
		let value1 = this.state.firstValue;
		let value2 = this.state.secondValue;
		if(name === "second"){
			if(parseInt(this.state.firstValue) <= parseInt(value)){
				value2 = value;
			}
		}
		else{
			if(parseInt(value) <= parseInt(this.state.secondValue)){
				value1 = value;
			}
		}
		console.log("value1=",value1, "value2=",value2);
		this.setState(function(state,props){
			return { secondValue: value2, firstValue: value1 };
		});
		this.props.onFilter(value1, value2);
	}
	render(){
		return(
			<div className="slider">
				<fieldset>
				<legend>Filter By Rating</legend>
				<input id="a" type="range" value={this.state.firstValue} min={this.state.minValue} max={this.state.maxValue} step={this.state.step}  list="ratings" onChange={this.handleChange.bind(this, "first")}/>
				<input id="b" type="range" value={this.state.secondValue} min={this.state.minValue} max={this.state.maxValue} step={this.state.step}  list="ratings" onChange={this.handleChange.bind(this, "second")}/>
				<datalist id="ratings">
					<option value="1" label="1">1</option>
					<option value="2" label="2">2</option>
					<option value="3" label="3">3</option>
					<option value="4" label="4">4</option>
					<option value="5" label="5">5</option>
				</datalist>
				</fieldset>
			</div>
		);
	}
}
export default RatingsFilter;