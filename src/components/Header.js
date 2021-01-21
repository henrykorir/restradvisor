import React from 'react';
import RatingsFilter from '../components/RatingsFilter';
class Header extends React.Component{
	render(){
		return(
			<header className="heading">
				
				<RatingsFilter onFilter={this.props.onFilter}/>
				<h1>Restradvisor</h1>
			</header>
		);
	}
}
export default Header;