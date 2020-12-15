import React from 'react';
import Header from './components/Header';
import Map from './components/Map';
import DetailsTab from './components/DetailsTab';
import './App.css';
import data from './database/data.json';
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.8377856,-1.2681216&radius=1500&type=restaurant&key=AIzaSyAc4BNBe7d1RKp4fHs1NSt3mc2DD4Z89jU
function App() {
	return (
		<div>
			<Header />
			<Map here = {{lat: 0, lng: 0}} data = {data}  />
			<DetailsTab data = {data} />
		</div>
	);
}
export default App;
