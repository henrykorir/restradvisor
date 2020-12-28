import React from 'react';
import mapboxgl from 'mapbox-gl';
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-1.2713984,36.8345088&radius=500&types=food&name=restaurant&key=AIzaSyAc4BNBe7d1RKp4fHs1NSt3mc2DD4Z89jU
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
			center: [lng, lat],
			container: 'mapContainer',
			style: 'mapbox://styles/mapbox/streets-v11',
			zoom: 10
		})
		.on('load', function(e) {
			//my location
			const { geolocation } = navigator;
			geolocation.getCurrentPosition(
				function onSuccess(position){
					mapbox.setCenter([position.coords.longitude, position.coords.latitude]);
					new mapboxgl.Marker({
						color: "green",
						draggable: false
					})
					.setLngLat([position.coords.longitude, position.coords.latitude])
					.addTo(mapbox)
				},
				function onError(positionError)  {
					if(positionError.code === 1) { // PERMISSION_DENIED
					   alert("Error: Permission Denied! " + positionError.message);
					} else if(positionError.code === 2) { // POSITION_UNAVAILABLE
					   alert("Error: Position Unavailable! " + positionError.message);
					} else if(positionError.code === 3) { // TIMEOUT
					   alert("Error: Timeout!" + positionError.message);
					}
				},
				{
					enableHighAccuracy: true,
					timeout: Infinity,
					maximumAge: 0
				}
			);
		
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
			console.log(e.lngLat);
			var popup = new mapboxgl.Popup({
				closeButton: true,
				closeOnClick: true
			})
			.setLngLat( [e.lngLat.lng,  e.lngLat.lat])
			.setHTML("<p><form><input type=\"text\" /> <input type=\"submit\" /></p>")
			.addTo(mapbox);;
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