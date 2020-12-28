import React, { useState, useEffect} from 'react';
import Header from './components/Header';
import Map from './components/Map';
import DetailsTab from './components/DetailsTab';
import useCurrentLocation from './helper/useCurrentLocation';
import information from './database/data.json';
import './App.css';

const geolocationOptions = {
	enableHighAccuracy: true,
	timeout: Infinity,
	maximumAge: 0
};
function App() {
	const { location: currentLocation, error: currentError } = useCurrentLocation(geolocationOptions);
	const [here, setHere] = useState({lng: 0, lat: 0});
	const [places, handleData] = useState(information);
	const [min, setMin] = useState(1);
    const [max, setMax] = useState(5);
	console.log(currentLocation);
	const changeLocation = (coords) => {
        setHere(coords);
    };
	
	const handleFilter =(a, b) =>{
		const min = Math.min(a,b);
		const max = Math.max(a,b);
		setMin(min);
		setMax(max);
	};
	 useEffect(() => {
        let filteredData = information;
		filteredData = filteredData.filter((place) =>((place.ratings.length >=min) && (place.ratings.length <= max)));
		handleData(filteredData);
    }, [min, max]);
	useEffect(() =>{
		console.log("info[]",information);
		let url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,geometry,rating,reviews&key=AIzaSyDEehuutoA7e5pBBvhSgJ3n_PQdpHIVYtY";
		/*async function fetchPlaces(initData, url){
			try{
			const response = fetch(url,{method: "get",mode:"no-cors"});
			const fetchedPlaces = await response.json();
			console.log(response.json());
			//console.log(fetchedPlaces);
			}catch(error){
				console.log(error);
			}
		}
		fetchPlaces(information, url);
		*/
		fetch(url,{method: "get",mode:"no-cors"})
		.then((response)=>{
			return response.json();
		})
		.then((data)=>{
			console.log(data);
		})
		.catch((error)=>{
			console.log(error);
		});
	},[]);
	return (
		<div>
			<Header onFilter={handleFilter} />
			<Map  data = {information}  here = {here}/>
			<DetailsTab  onShowHere={changeLocation} placesData = {places} />
		</div>
	);
}
export default App;
