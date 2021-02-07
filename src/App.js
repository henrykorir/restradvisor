import React, { useState, useEffect, useReducer} from 'react';
import Header from './components/Header';
import Map from './components/Map';
import DetailsTab from './components/DetailsTab';
import information from './database/data.json';
import getAverageRating from './helper/getAverageRating';
import './App.css';

const initialState = {
	originalData: information,
	data: information
}
const reducer = (state, action) =>{
	switch(action.type){
		case 'ADD_NEW_PLACE':
			return {
				...state, originalData:[...state.originalData, action.payload], data: [...state.data, action.payload]
			}
		case 'FILTER_BY_RATINGS_RANGE':
			return{
				...state, originalData: state.originalData, data: action.payload
			}
		case 'GET_GOOGLE_PLACES':
			const allData = [...state.originalData, action.payload];
			return {
				...state, originalData: allData, data: allData
			}
		case 'GET_AVERAGE_RATING':
			return {
				...state, originalData: action.payload, data: action.payload
			}
		default:
			return state;
	}
}
function App() {
	const [here, setHere] = useState({lng: 151.215, lat: -33.856});
	const [state, dispatch] = useReducer(reducer,initialState);
	
	const changeLocation = (coords) => {
        setHere(coords);
    };
	const handleFilter =(a, b) =>{
		const min = Math.min(a,b);
		const max = Math.max(a,b);
		let filteredData = state.originalData;
		filteredData = filteredData.filter((place) =>(place.averageRating >= min) && (place.averageRating <= max));
		dispatch({type:'FILTER_BY_RATINGS_RANGE', payload: filteredData});
	};
	const addANewPlace = (newPlace) =>{
		dispatch({type: 'ADD_NEW_PLACE', payload: newPlace});
	}
	
	useEffect(() =>{
		let temp = state.originalData;
		temp.forEach((place) => {
			place.averageRating = getAverageRating(place.ratings)
		});
		dispatch({type:'GET_AVERAGE_RATING', payload: temp});
	},[state.originalData]);
	useEffect(() =>{
		const google_api_key = process.env.REACT_APP_GOOGLE_API_KEY;
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setHere({lng: position.coords.longitude, lat: position.coords.latitude});
			let nearby_url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=` + position.coords.latitude +","+position.coords.longitude+`&radius=1000&type=restaurant&key=${google_api_key}`;
				fetch(nearby_url)
				.then(nearbyResponse => nearbyResponse.json())
				.then(nearbyPlaces =>{
					nearbyPlaces.results.forEach((place, i) =>{
					let place_url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+place.place_id+`&fields=name,formatted_address,geometry,rating,reviews&key=${google_api_key}`;
						return fetch(place_url)
						.then(response => response.json())
						.then(resultData => {
							let reviews = [];
							if(resultData.result.reviews !== undefined){
								for(let review of resultData.result.reviews){
									reviews.push({stars: review.rating, comment: review.text});
								}
							}
							let rate = resultData.result.rating === undefined ? 1 : Math.trunc(resultData.result.rating); 
							let googlePlace ={
								restaurantName: resultData.result.name,
								address: resultData.result.formatted_address,
								lat: resultData.result.geometry.location.lat,
								long: resultData.result.geometry.location.lng,
								ratings: reviews,
								averageRating: rate
							}
							dispatch({type: 'GET_GOOGLE_PLACES', payload: googlePlace});
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
		
	},[]);

	return (
		<>
			<Header onFilter={handleFilter} />
			<Map  data = {state.data}  here = {here} addPlace = {addANewPlace}/>
			<DetailsTab  onShowHere={changeLocation} data = {state.data} />
		</>
	);
}
export default App;
