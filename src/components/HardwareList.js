import React from "react";
import PropTypes from 'prop-types';
import { hardwareType } from "utils/types";

import {
    withStyles,
    CircularProgress,
    Button,
} from "@material-ui/core";

import HardwareCard from 'components/HardwareCard';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
    },
    cards: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 16,
    }
})

const HardwareList = ({ classes, hardware, isLoading, refreshClicked }) => (
    <div className={classes.root} >
        <Button onClick={refreshClicked} disabled={isLoading} >Refresh</Button>
        {isLoading ?
            <CircularProgress color="secondary" />
            :
            <div className={classes.cards} >
                {hardware.map(h => (
                    <HardwareCard hardware={h} key={h.name} />
                ))}
            </div>
        }
    </div>
);

HardwareList.propTypes = {
    hardware: PropTypes.arrayOf(hardwareType),
}

export default withStyles(styles)(HardwareList);