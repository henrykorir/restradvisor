import React, { useState, useEffect} from 'react';
import Header from './components/Header';
import Map from './components/Map';
import DetailsTab from './components/DetailsTab';
import information from './database/data.json';
import getAverageRating from './helper/getAverageRating';
import './App.css';

function App() {
	const [here, setHere] = useState({lng: 151.215, lat: -33.856});
	const [data, setData] = useState(information);
	const [min, setMin] = useState(1);
    const [max, setMax] = useState(5);

	const changeLocation = (coords) => {
        setHere(coords);
    };
	const handleFilter =(a, b) =>{
		const min = Math.min(a,b);
		const max = Math.max(a,b);
		setMin(min);
		setMax(max);
	};
	const addANewPlace = (newPlace) =>{
		let temp = [...data, newPlace];
		setData(temp);
	}
	
	useEffect(() =>{
		data.forEach((place,i) =>{
			place.averageRating = getAverageRating(place.ratings);
		});
		console.log(data);
		setData(data);
	},[data]);
	useEffect(() => {
        let filteredData = data;
		filteredData = filteredData.filter((place) =>((place.averageRating >= min) && (place.averageRating <= max)));
		setData(filteredData);
    }, [min, max, data]);
	
	useEffect(() =>{
		console.log(data);
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setHere({lng: position.coords.longitude, lat: position.coords.latitude});
				let nearby_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + position.coords.latitude +","+position.coords.longitude+"&radius=1000&type=restaurant&key=AIzaSyA8CgnGnHEkyeweyqk-Abf-BjhRb_j2o90";
				fetch(nearby_url)
				.then(nearbyResponse => nearbyResponse.json())
				.then(nearbyPlaces =>{
							
					nearbyPlaces.results.forEach((place, i) =>{
						let place_url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+place.place_id+"&fields=name,formatted_address,geometry,rating,reviews&key=AIzaSyA8CgnGnHEkyeweyqk-Abf-BjhRb_j2o90";
						return fetch(place_url)
						.then(response => response.json())
						.then(data => {
							let reviews = [];
							if(data.result.reviews !== undefined){
								for(let review of data.result.reviews){
									reviews.push({stars: review.rating, comment: review.text});
								}
							}
							let rate = data.result.rating === undefined ? 1 : Math.trunc(data.result.rating); 
							information.push({
								restaurantName: data.result.name,
								address: data.result.formatted_address,
								lat: data.result.geometry.location.lat,
								long: data.result.geometry.location.lng,
								ratings: reviews,
								averageRating: rate
							});
							console.log(information);
							
						})
						.catch(err => console.log(err));
					});
					
				})
				.catch(error => console.log(error));
			},
			() =>{
				alert("Error retriving location");
			}
		);
		setData(information);
	},[data]);
	return (
		<>
			<Header onFilter={handleFilter} />
			<Map  data = {data}  here = {here} addPlace = {addANewPlace}/>
			<DetailsTab  onShowHere={changeLocation} data = {data} />
		</>
	);
}
export default App;
