import React from 'react';
class Maker extends React.Component{
	componentDidMount(){
		let coords = props.coords;
		let el = document.getElementById('marker');
		new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat(coords)
            .addTo(map);
	}
	render(){
		return(
			<div id="marker" className="marker">
			</div>
		);
	}
}
export default Maker;