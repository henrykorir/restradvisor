import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucnlrb3JpciIsImEiOiJja2lpaWJybTMyNXRhMnhvNTJkZGkwdHVuIn0.vGU67gSoCtqbxrV6kudGcw';
class Map extends React.Component {
	constructor(props){
		super(props);
		this.state = { map: null, lat:0, lng: 0 };
	}
	componentDidUpdate(prevProps) {
		if (JSON.stringify(this.props.here) !== JSON.stringify(prevProps.here)) {
			const here = this.props.here;
			this.setState((state) =>{
				return { lat: this.props.here.lat, lng: this.props.here.lng };
			});
		}
		this.state.map.flyTo({center:[this.state.lng, this.state.lat],zoom: 15});
	}
	componentDidMount(){
		let data = this.props.data;
		let lat = this.props.here.lat;
		let lng = this.props.here.lng;
		const mapbox = new mapboxgl.Map({
			container: 'mapContainer',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [lng, lat],
			zoom: 12
		})
		.on('load', function(e) {
			//my location
			new mapboxgl.Marker({
				color: "green",
				draggable: false
			})
			.setLngLat([lng, lat])
			.addTo(this)
			//other places
			data.forEach((place, i) =>{
				var el = document.createElement('div')
				el.className= 'marker' ;
				el.id = i + 1;
				new mapboxgl.Marker(el, { offset: [0, -23] })
					.setLngLat([place.long, place.lat])
					.addTo(this);
			});
		})
		.addControl(new mapboxgl.NavigationControl(), 'top-left')
		.on('click', (e)=>{
			console.log('A click event has occurred at ' + e.lngLat);
		})
		this.setState((state) =>{
			return { map: mapbox, };
		});
	}
	render() {
		return (
			<div id='mapContainer' className='mapContainer'></div>
		)
	}
}

export default Map;