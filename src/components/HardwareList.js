import React from "react";
import PropTypes from 'prop-types';
import { hardwareType } from "utils/types";

import {
    withStyles,
    CircularProgress,
    Button,
    Divider,
    Typography,
    Grid,
} from "@material-ui/core";

import HardwareCard from 'components/HardwareCard';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0, // Firefox
        //alignItems: 'start',
    },
    titleArea: {
        flexShrink: 0,
        
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 16,
    },
    title: {
        flex: 1,
    },
    refreshButton: {
        marginLeft: 16,
    },
    cardGrid: {
        paddingTop: 8,
        paddingBottom: 16,
        marginTop: 0,
        marginBottom: 0,
        overflowY: 'auto',
    },
    error: {
        color: theme.palette.error.main,
        marginBottom: 24,
    }
})

const HardwareList = ({ classes, hardware, error, isLoading, refreshClicked }) => (
    <div className={classes.root} >
        <div className={classes.titleArea} >
            <Typography variant='headline' className={classes.title} >Attached Hardware</Typography>
            {isLoading && <CircularProgress color="secondary" size={30} />}
            <Button
                onClick={refreshClicked}
                disabled={isLoading}
                className={classes.refreshButton}
                variant='raised'
                size='small'
                color='secondary' >
                Rescan
            </Button>
        </div>
        <Divider />
        {hardware &&
            <Grid container spacing={16} className={classes.cardGrid} >
                {hardware.map(h => (
                    <Grid item xs={12} md={6} lg={4} key={h.id} >
                        <HardwareCard hardware={h} disabled={isLoading} />
                    </Grid>
                ))}
            </Grid>
        }
        {error &&
            <Typography variant="title" className={classes.error} >There was an error getting the hardware.</Typography>
        }
    </div>
);

HardwareList.propTypes = {
    hardware: PropTypes.arrayOf(hardwareType),
}

export default withStyles(styles)(HardwareList);