import React from 'react';
import Header from './components/Header';
import Map from './components/Map';
import DetailsTab from './components/DetailsTab';
import './App.css';
<<<<<<< HEAD
import data from './database/data.json';
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.8377856,-1.2681216&radius=1500&type=restaurant&key=AIzaSyAc4BNBe7d1RKp4fHs1NSt3mc2DD4Z89jU
function App() {
  return (
    <div>
		<Header />
		<Map data = {data}  />
		<DetailsTab />
=======

function App() {
  return (
    <div>
>>>>>>> 834a5134473ecfa3ed3743f309d2753a3865b159
    </div>
  );
}
export default App;
