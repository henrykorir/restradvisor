import React from 'react';
import RatingsFilter from '../components/RatingsFilter';
class Header extends React.Component{
	render(){
		return(
			<header className="heading">
				<RatingsFilter onFilter={this.props.onFilter}/>
			</header>
		);
	}
}
export default Header;