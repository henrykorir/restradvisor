import React, { useState } from 'react';
import Header from './components/Header';
import Map from './components/Map';
import DetailsTab from './components/DetailsTab';
import {location as Here} from './helper/Geolocation';

import data from './database/data.json';
import './App.css';
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.8377856,-1.2681216&radius=1500&type=restaurant&key=AIzaSyAc4BNBe7d1RKp4fHs1NSt3mc2DD4Z89jU

		
function App() {
	console.log(process);
	const [here, setHere] = useState(Here.lnglat);
	
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
