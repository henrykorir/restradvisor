
class Geolocation{
	constructor(){
		this._lnglat = {lat: 0, lng: 0};
		this.onSuccess = this.onSuccess.bind(this);
		this.onError = this.onError.bind(this);
		this.init();
	}
	onSuccess(position){
		this._lnglat.lat = position.coords.latitude;
		this._lnglat.lng = position.coords.longitude;
		//console.log(s);
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
		let s = "me";
		navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError, {
			enableHighAccuracy: true,
			timeout: Infinity,
			maximumAge: 0
		});
		return this;
	}
	set lnglat(lnglat){
		this._lnglat= lnglat;
	}
	get lnglat(){
		return this._lnglat;
	}
	
	
}
const location = new Geolocation();
console.log("new=",location.lnglat);
export  default location;

