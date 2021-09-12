import react, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData, getWeatherData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';

const App = () => {
    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [childClicked, setChildClicked] = useState(null);

    const [coord, setCoord] = useState({});
    const [bounds, setBounds] = useState({});

    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {
            setCoord({ lat: latitude, lng: longitude });
        })
    }, []); 

    useEffect(() => {
        const filteredPlaces = places.filter(() => places.rating > rating);
        setFilteredPlaces(filteredPlaces);
    }, [rating])

    useEffect(() => {
        if(bounds.sw && bounds.ne){
        setLoading(true);
        getWeatherData(coord.lat, coord.lng)
            .then((data) => setWeatherData(data));
        getPlacesData(type, bounds.sw, bounds.ne)
             .then((data) => {
                 setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                 setLoading(false);
                 setFilteredPlaces([]);
             })
         }
    }, [type, bounds]);

    return (
        <>
        <CssBaseline />
        <Header setCoord={setCoord} />
        <Grid container spacing={3} style={{ width:'100%' }}>
            {/*Takes four spaces on medium or larger
            devices*/}
            <Grid item xs={12} md={4}>
                <List 
                places={filteredPlaces.length ? filteredPlaces : places} 
                childClicked={childClicked} 
                loading={loading}
                type={type}
                setType={setType}
                setRating={setRating}
                />
            </Grid>
            {/*Takes eight spaces on medium or larger
            devices*/}
            <Grid item xs={12} md={8}>
                <Map 
                    setCoord = {setCoord}
                    setBounds = {setBounds}
                    coord = {coord}
                    places={filteredPlaces.length ? filteredPlaces : places}
                    setChildClicked={setChildClicked}
                    weatherData={weatherData}
                />
            </Grid>
        </Grid>
        </>
    );
}

export default App;