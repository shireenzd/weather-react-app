import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Search from "./components/Search";
import WeatherContainer from "./components/weather-components/WeatherContainer";

interface WeatherData {
  list?: {
    weather?: {
      main: string;
    }[]
  }[]
}

function App() {
  const [data, setData] = useState<WeatherData>({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customUrl, setCustomUrl] = useState(""); 

  const requestURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&units=metric&cnt=7&appid=d94bcd435b62a031771c35633f9f310a`;


  useEffect(() => {
    const storedLocation = localStorage.getItem("location");
    if (storedLocation && storedLocation !== "") {
      setLocation(storedLocation);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (customUrl !== "") {
        try {
          const response = await axios.get(customUrl);
          setData(response.data);
          setError("");
          setIsLoading(false);
        } catch (error) {
          setError("Error fetching data. Please check the URL.");
          setIsLoading(false);
          console.error("Error fetching data:", error);
        }
      }
    };
  
    fetchData();
  }, [customUrl]);



  function searchLocation(event: any) {
    if (event.key === "Enter") {
      setIsLoading(true);
      axios
        .get(requestURL)
        .then((response) => {
          setData(response.data);
          setError("");
          setIsLoading(false);
          localStorage.setItem("location", location);
          console.log(response.data);
        })
        .catch((error) => {
          setError("Invalid country or location. Please try again."); // Set error message for invalid country
          setIsLoading(false);
          console.error("Error fetching data:", error);
        });
      setLocation("");
    }
  }


  function searchWithCustomUrl(event:any) {
    if (event.key === "Enter") {
      setIsLoading(true);
      axios
        .get(customUrl)
        .then((response) => {
          setData(response.data);
          setError("");
          setIsLoading(false);
          console.log(response.data);
        })
        .catch((error) => {
          setError("Error fetching data. Please check the URL.");
          setIsLoading(false);
          console.error("Error fetching data:", error);
        });
      setCustomUrl(""); // Clear the custom URL input field after searching
    }
  }

  const handleUrlChange = (event:any) => {
    setCustomUrl(event.target.value);
  };



  let backgroundImage = '';
  if (data.list && data.list[0] && data.list[0].weather && data.list[0].weather[0]) {
    const weatherMain = data.list[0].weather[0].main.toLowerCase();
    switch (weatherMain) {
      case 'clear':
        backgroundImage = 'url(/sunny.jpeg)';
        break;
      case 'rain':
        backgroundImage = 'url(/rainy.jpeg)';
        break;
      case 'clouds':
        backgroundImage = 'url(/clouds.jpeg)';
        break;
      default:
        backgroundImage = ''; // Handle other conditions or set a default image
    }
  }

  const appStyles = {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "2px",
    backgroundImage: backgroundImage,
    backgroundSize:' cover',
    padding: "50px",
  };

  const newInputStyle={
    padding:'5px',
    borderRadius:'10px',
    display:'flex',
    left:'0'
  }

  return (
    <div style={appStyles} className="App">
       <input 
        type="text"
        placeholder="Enter custom API URL"
        style={newInputStyle}
        value={customUrl}
        onChange={handleUrlChange}
        onKeyDown={searchWithCustomUrl}
      />
      <Search
        location={location}
        setLocation={setLocation}
        searchLocation={searchLocation}
      />

            {Object.keys(data).length === 0 ? null : (
                <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <WeatherContainer data={data} />
      )}
      </div>
            )}
    </div>
  );
}

export default App;
