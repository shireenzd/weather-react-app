function Search({location , setLocation, searchLocation}:{location:any, setLocation:any, searchLocation: any}) {

    const searchInputStyle = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        gap:'10px',
    }
    const searchStyle={
        padding:'10px',
        borderRadius:'20px'
    }
    
    return (
        <div style={searchInputStyle}>
            <label htmlFor="search">Search Location:</label>
            {/* @ts-ignore */}
            <input type="text" id="search" style={searchStyle}
             onKeyDown={searchLocation}
            value={location} onChange={event => setLocation(event.target.value)}/>
        </div>
    )
}

export default Search