import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucnlrb3JpciIsImEiOiJja2lpaWJybTMyNXRhMnhvNTJkZGkwdHVuIn0.vGU67gSoCtqbxrV6kudGcw';
class Map extends React.Component {
	componentDidMount(){
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
			.on('click', (e)=>{
				console.log('A click event has occurred at ' + e.lngLat);
			});
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
		navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		
	}
	render() {
		return (
			<div id='map' className='mapContainer'></div>
		)
	}
}

export default Map;