import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVucnlrb3JpciIsImEiOiJja2lpaWJybTMyNXRhMnhvNTJkZGkwdHVuIn0.vGU67gSoCtqbxrV6kudGcw';
class Map extends React.Component {
	constructor(props){
		super(props);
		this.state = { map: null, lat:48.874753533091024, lng: 2.350500092306703};
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidUpdate(prevProps) {
		if (JSON.stringify(this.props.here) !== JSON.stringify(prevProps.here)) {
			this.setState((state) =>{
				return { lat: this.props.here.lat, lng: this.props.here.lng };
			});
		}
		this.state.map.flyTo({center:[this.state.lng, this.state.lat],zoom: 17});
	}
	componentDidMount(){
		let data = this.props.data;
		let lat = this.props.here.lat;
		let lng = this.props.here.lng;
		let html = '<form><input type="text" id="name"/> <input type="submit" />';
		const mapbox = new mapboxgl.Map({
			center: [lng, lat],
			container: 'mapContainer',
			style: 'mapbox://styles/mapbox/streets-v11',
			zoom: 10
		})
		.on('load', function(e) {
			//my location
			navigator.geolocation.getCurrentPosition(
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
			let lnglat = e.lngLat;
			const popup = new mapboxgl.Popup({
				closeButton: true,
				closeOnClick: true
			})
			.setLngLat( [e.lngLat.lng,  e.lngLat.lat])
			.setHTML(html)
			.addTo(mapbox);
			const inputForm = document.querySelector('form');
			inputForm.addEventListener('submit',(e) =>{
				e.preventDefault();
				e.stopPropagation();
				let place = {
					restaurantName:e.target[0].value,
					address: "52 ave street",
					averageRating: 1,
					lat: lnglat.lat,
					long: lnglat.lng,
					ratings:[
						{
							stars: 1,
							comment: "Just stumbled on it"
						},
					],
				};
				this.handleClick(place);
				popup.remove();
			},true);
		})
		this.setState((state) =>{
			return { map: mapbox, };
		});
	}
	handleClick(place){
		this.props.addPlace(place);
	}
	render() {
		return (
			<div id='mapContainer' className='mapContainer'></div>
		)
	}
}

export default Map;