class Geolocation{
	constructor(){
		this.lnglat = {lat: 0, lng: 0};
		this.onSuccess = this.onSuccess.bind(this);
		this.onError = this.onError.bind(this);
		this.init();
	}
	onSuccess(position){
		this.lnglat = {lat: position.coords.latitude, lng: position.coords.longitude};
	}
	onError(positionError)  {
		if(positionError.code === 1) { // PERMISSION_DENIED
		   alert("Error: Permission Denied! " + positionError.message);
		} else if(positionError.code === 2) { // POSITION_UNAVAILABLE
		   alert("Error: Position Unavailable! " + positionError.message);
		} else if(positionError.code === 3) { // TIMEOUT
		   alert("Error: Timeout!" + positionError.message);
		}
	}
	init(){
		navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError, {
			enableHighAccuracy: true,
			timeout: Infinity,
			maximumAge: 0
		});
	}
	set lnglat(pos){
		this._lnglat = pos;
	}
	get lnglat(){
		//console.log(this.lnglat);
		return this._lnglat;
	}
	
}
const location = new Geolocation();
export  {location};