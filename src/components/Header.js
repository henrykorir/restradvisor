import React from 'react';
import RatingsFilter from '../components/RatingsFilter';
class Header extends React.Component{
	render(){
		return(
			<div className="heading">
				<RatingsFilter onFilter={this.props.onFilter}/>
				
			</div>
		);
	}
}
export default Header;