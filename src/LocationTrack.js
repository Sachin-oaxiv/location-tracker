import React, { useState } from 'react'

const LocationTrack = () => {
   const [location,setLocation] = useState(null);
   const [error,setError] = useState("");
   const [shareLink, setShareLink] = useState("");

   const getLocation = () =>{
      if(!navigator.geolocation){
        setError("Geolocation is not supported by your browser")
        return
      }

    navigator.geolocation.getCurrentPosition(
      (position)=>{
        const {longitude,latitude}= position.coords
        setLocation({longitude,latitude})
        setShareLink(`https://www.google.com/maps?q=${latitude},${longitude}`)
        setError("")
      },
      ()=>{
         setError("Unable to retrieve your location")
      }
    );
   }
  return (
    <div style={styles.container}>
      <h2>Live location tracker</h2>
      <button onClick={getLocation} style={styles.button}> Get My location</button>

      {error && <p style={{color :"red"}}>{error}</p>}
      
      {location &&(
        <div style={styles.card}>
          <h4>Your Coordinates:</h4>
          <p>Longitude : {location.longitude}</p>
          <p>Latitude : {location.latitude}</p>

          <iframe 
          title='map' 
          width= "100%" 
          height= "300" 
          src={`https://maps.google.com/maps?q=${location.longitude},${location.latitude}&z=100&output=embed`}  
          style={{ border: 0, borderRadius: "10px" }} 
          allowFullScreen></iframe>

          <h4>Share Location:</h4>
          <a href={shareLink}
             target="_blank"
             rel='noreferrer'
             style={{ color: "blue", textDecoration: "underline" }}
          >Open in google Maps
          </a>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    textAlign: "center",
    margin: "20px auto",
    maxWidth: "600px",
    fontFamily: "Arial, sans-serif"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px"
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  }
};


export default LocationTrack