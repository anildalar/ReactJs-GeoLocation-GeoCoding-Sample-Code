//1. Import area
import Geocode from "react-geocode";

import './App.css';
import { useEffect } from "react";
import { GOOGLE_MAP_KEY } from "./helper/helper";

//2. Defination area  RFC
function App() {
  //2.1 HOOKS area

  useEffect(()=>{
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(GOOGLE_MAP_KEY);

    // set response language. Defaults to english.
    Geocode.setLanguage("en");

    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion("es");

    // set location_type filter . Its optional.
    // google geocoder returns more that one address for given lat/lng.
    // In some case we need one address as response for which google itself provides a location_type filter.
    // So we can easily parse the result for fetching address components
    // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
    // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
    Geocode.setLocationType("ROOFTOP");

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
  },[]);

  //2.2 Function Defination areaa
  let getLocation=()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      document.getElementById("demo").innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  let showPosition=(position)=>{
    document.getElementById("demo").innerHTML = "Latitude: " + position.coords.latitude + 
      "<br>Longitude: " + position.coords.longitude;
      Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
        (response) => {
          console.log('response----->',response);
          const address = response.results[0].formatted_address;
          console.log(address);
        },
        (error) => {
          console.error(error);
        }
    );
  }
  //2.3
  return (
    <>
      <button onClick={()=>{ getLocation() }}>Try It</button>
      <p id="demo"></p>
    </>
  );
}

export default App;
