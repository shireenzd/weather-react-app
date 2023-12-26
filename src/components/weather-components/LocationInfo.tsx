import { cardStyle } from "../../shared/constants"

function LocationInfo({data}:{data:any}) {
  return (
    <div style={cardStyle}>
        <h2>{data.city?.name}</h2>
        <p>Friday 15 December</p>
        <p>Population: {data.city?.population}</p>
    </div>
  )
}

export default LocationInfo