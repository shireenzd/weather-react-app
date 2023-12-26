import { cardStyle } from "../../shared/constants";

interface WeatherData {
  list: {
    weather: {
      main: string;
    }[];
    temp: {
      day: number;
    };
  }[];
}

interface Props {
  data: WeatherData;
}

function WeatherInfo({ data }: { data: any }) {
  const ConditionStyles = {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
  };

  let weatherIcon = "⛅"; // Default weather icon

  if (
    data.list &&
    data.list[0] &&
    data.list[0].weather &&
    data.list[0].weather[0]
  ) {
    const weatherMain = data.list[0].weather[0].main.toLowerCase();

    const weatherIcons: { [key: string]: string } = {
      clear: "☀️",
      clouds: "☁️",
      rain: "🌧️",
      // Add more mappings for other weather conditions
    };

    weatherIcon = weatherIcons[weatherMain] || weatherIcon;
  }

  function convertUnixToTime(unixTimestamp: any) {
    const date = new Date(unixTimestamp * 1000); // Convert UNIX timestamp to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format hours and minutes with leading zeros if needed
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes}`;
  }

  return (
    <div style={cardStyle}>
      <div style={ConditionStyles}>
        {data && data.list && data.list[0]?.temp && (
          <p>
            {weatherIcon} {data.list[0]?.temp?.day}°C{" "}
          </p>
        )}
        {data && data.list && data.list[0]?.weather && (
          <p>{data.list[0]?.weather[0]?.main},</p>
        )}
        {data && data.list && data.list[0]?.weather && (
          <p>{data.list[0]?.weather[0]?.description}</p>
        )}
      </div>
      <div style={ConditionStyles}>
        {data.list ? (
          <p className="sunrise">
            🌄 {convertUnixToTime(data.list[0].sunrise)} A.M
          </p>
        ) : null}
        {data.list ? (
          <p className="sunset">
            🌅 {convertUnixToTime(data.list[0].sunset)} A.M
          </p>
        ) : null}
      </div>
      <div style={ConditionStyles}>
        {data.list ? <p>🌬️{data.list[0]?.speed} m/s N</p> : null}
        {data.list ? <p> 💧{data.list[0]?.humidity}%</p> : null}
        {data.list ? <p> 🌀{data.list[0]?.pressure} hPa</p> : null}
      </div>
    </div>
  );
}

export default WeatherInfo;
