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
	componentDidMount(){
		this.setState({firstValue: this.state.minValue, secondValue: this.state.maxValue});
	}

	handleChange(event){
		let value = event.target.value;
		let value1 = this.state.firstValue;
		let value2 = this.state.secondValue;
		if(event.target.id === "a")
			value1 = value;
		else
			value2 = value;
		this.setState(function(state,props){
			return { secondValue: value2, firstValue: value1 };
		});
		this.props.onFilter(value1, value2);
	}
	render(){
		return(
			<div className="range-slider">
				<input id="a"  type="range" value={this.state.firstValue} min={this.state.minValue} max={this.state.maxValue} step={this.state.step}  list="ratings" onChange={this.handleChange.bind(this)}/>
				<input id="b"  type="range" value={this.state.secondValue} min={this.state.minValue} max={this.state.maxValue} step={this.state.step}  list="ratings" onChange={this.handleChange.bind(this)}/>
			</div>
		);
	}
}
export default RatingsFilter;