import React from 'react';
import RatingsFilter from '../components/RatingsFilter';
class Header extends React.Component{
	render(){
		return(
			<header className="heading">
				<h1>Restradvisor</h1>
				<RatingsFilter onFilter={this.props.onFilter}/>
			</header>
		);
	}
}
export default Header;