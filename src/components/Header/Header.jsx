import react from 'react';
import { Autocomplete} from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import { classExpression } from '@babel/types';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles';

const Header = () => {
    //useStyles is a hook and must be called
    const classes = useStyles();

    return (
        <AppBar position='static'>
            <Toolbar className={classExpression.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Travel Advisor
                </Typography>
                <Box display='flex'>
                <Typography variant="h6" className={classes.title}>
                    Explore new places
                </Typography>
                {/*<Autocomplete>*/}
                    {/*This div will be the search bar/box*/}
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder="Search....." 
                        classes = {{root: classes.inputRoot, input:classes.inputInput}} />
                    </div>
                {/*</Autocomplete>*/}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;