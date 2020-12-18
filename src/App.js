import React, { useState } from 'react';
import Header from './components/Header';
import Map from './components/Map';
import DetailsTab from './components/DetailsTab';
import location from './helper/Geolocation';
import data from './database/data.json';
import './App.css';
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.8377856,-1.2681216&radius=1500&type=restaurant&key=

function App() {
	const [here, setHere] = useState({lng: 0, lat: 0});
	const changeLocation = (coords) => {
        setHere(coords);
    };
	return (
		<div>
			<Header />
			<Map  data = {data}  here = {here}/>
			<DetailsTab  onShowHere={changeLocation} data = {data} />
		</div>
	);
}
export default App;
