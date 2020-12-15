import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucnlrb3JpciIsImEiOiJja2lpaWJybTMyNXRhMnhvNTJkZGkwdHVuIn0.vGU67gSoCtqbxrV6kudGcw';
class Map extends React.Component {
	componentDidMount(){
		console.log(this.props.here);
		let data = this.props.data;
		function onSuccess(position){
			new mapboxgl.Map({
				container: 'map',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [position.coords.longitude, position.coords.latitude],
				zoom: 12
			})
			.on('load', function(e) {
				//geolocation
				new mapboxgl.Marker({
					color: "green",
					draggable: false
				})
				.setLngLat([position.coords.longitude, position.coords.latitude])
				.addTo(this)
				//other
				
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
			.flyTo({center:[this.props.here.lng, this.props.here.lat],zoom: 15});
			return [position.coords.longitude, position.coords.latitude];
		}
		function onError(positionError)  {
			if(positionError.code === 1) { // PERMISSION_DENIED
			   alert("Error: Permission Denied! " + positionError.message);
			} else if(positionError.code === 2) { // POSITION_UNAVAILABLE
			   alert("Error: Position Unavailable! " + positionError.message);
			} else if(positionError.code === 3) { // TIMEOUT
			   alert("Error: Timeout!" + positionError.message);
			}
		}
		let options = {
			enableHighAccuracy: true,
			timeout: Infinity,
			maximumAge: 0
		};
		let coords=navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		console.log(coords);
		
	}
	render() {
		return (
			<div id='map' className='mapContainer'></div>
		)
	}
}

export default Map;