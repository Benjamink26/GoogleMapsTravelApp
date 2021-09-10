import react, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';

const App = () => {
    const [places, setPlaces] = useState([]);
    const [childClicked, setChildClicked] = useState(null);

    const [coord, setCoord] = useState({});
    const [bounds, setBounds] = useState({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {
            setCoord({ lat: latitude, lng: longitude });
        })
    }, []); 

    useEffect(() => {
        console.log(coord, bounds);

        getPlacesData(bounds.sw, bounds.ne)
             .then((data) => {
                 setPlaces(data);
             })
    }, [coord, bounds]);

    return (
        <>
        <CssBaseline />
        <Header />
        <Grid container spacing={3} style={{ width:'100%' }}>
            {/*Takes four spaces on medium or larger
            devices*/}
            <Grid item xs={12} md={4}>
                <List places={places} childClicked={childClicked}/>
            </Grid>
            {/*Takes eight spaces on medium or larger
            devices*/}
            <Grid item xs={12} md={8}>
                <Map 
                    setCoord = {setCoord}
                    setBounds = {setBounds}
                    coord = {coord}
                    places={places}
                    setChildClicked={setChildClicked}
                />
            </Grid>
        </Grid>
        </>
    );
}

export default App;