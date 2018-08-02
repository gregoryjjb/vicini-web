import React from "react";
import PropTypes from 'prop-types';
import { hardwareType } from "utils/types";

import {
    withStyles,
    CircularProgress,
    Button,
    Divider,
    Typography,
} from "@material-ui/core";

import HardwareCard from 'components/HardwareCard';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        //alignItems: 'start',
    },
    buttonArea: {
        flexShrink: 0,
        
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 16,
    },
    refreshButton: {
        marginLeft: 16,
    },
    cards: {
        flexShrink: 1,
        
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        flexWrap: 'wrap',
        overflowY: 'auto',
        paddingTop: 16,
        paddingBottom: 16,
        //marginTop: 16,
    },
})

const HardwareList = ({ classes, hardware, isLoading, refreshClicked }) => (
    <div className={classes.root} >
        <div className={classes.buttonArea} >
            <Typography variant='display1' >Attached Hardware</Typography>
            <Button onClick={refreshClicked} disabled={isLoading} className={classes.refreshButton} >Refresh</Button>
            {isLoading && <CircularProgress color="secondary" size={30} />}
        </div>
        <Divider />
        {hardware &&
            <div className={classes.cards} >
                {hardware.map(h => (
                    <HardwareCard hardware={h} key={h.id} disabled={isLoading} />
                ))}
            </div>
        }
        <Divider />
    </div>
);

HardwareList.propTypes = {
    hardware: PropTypes.arrayOf(hardwareType),
}

export default withStyles(styles)(HardwareList);