import React, { useState, useEffect} from 'react';
import Header from './components/Header';
import Map from './components/Map';
import DetailsTab from './components/DetailsTab';
import location from './helper/Geolocation';
import information from './database/data.json';
import './App.css';
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.8377856,-1.2681216&radius=1500&type=restaurant&key=

function App() {
	//let info = information;
	const [here, setHere] = useState({lng: 0, lat: 0});
	const [data, handleData] = useState(information);
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
		console.log(min,max);
	};
	 useEffect(() => {
        let filteredData = information;
		filteredData = filteredData.filter((place) =>((place.ratings.length >=min) && (place.ratings.length <= max)));
		handleData(filteredData);
    }, [min, max]);
	return (
		<div>
			<Header onFilter={handleFilter} />
			<Map  data = {information}  here = {here}/>
			<DetailsTab  onShowHere={changeLocation} data = {data} />
		</div>
	);
}
export default App;
