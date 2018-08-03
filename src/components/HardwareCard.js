import React from "react";
import {
    withStyles,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@material-ui/core";

import UnstyledLink from "components/UnstyledLink";
import OutlinedCard from 'components/OutlinedCard';

import api from 'utils/api';
import { addSerialLine } from 'utils/actions';

const styles = theme => ({
    root: {},
    card: {
        //width: 275,
        //marginRight: 16, //temp
        //marginBottom: 16,
    },
    buttonArea: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    disabled: {
        color: theme.palette.text.disabled,
    }
})

const HardwareCard = ({ classes, hardware, disabled }) => {
    
    let identified = hardware.details && hardware.details.part;
    
    let { available } = hardware;
    
    let btnDisabled = !available || disabled;
    
    return (
        <OutlinedCard className={classes.card} >
            <CardContent>
                <Typography variant="headline" gutterBottom>{hardware.id}</Typography>
                {identified &&
                    <span>
                        <Typography variant="body1">Part</Typography>
                        <Typography variant="display1" gutterBottom>{hardware.details.part}</Typography>
                        <Typography variant="body1">EVAL Board</Typography>
                        <Typography variant="display1" gutterBottom>{hardware.details.eval}</Typography>
                    </span>
                }
                {!available &&
                    <Typography variant="title" className={classes.disabled} >Unavailable</Typography>
                }
            </CardContent>
            <CardActions className={classes.buttonArea} >
                {!identified && <Button disabled={btnDisabled} onClick={() => api.identifyHardware(hardware.id)} size='small' >Identify</Button>}
                {identified && <UnstyledLink to={`/plugin/${hardware.details.part}`} >
                    <Button disabled={btnDisabled} size='small' >Open</Button>
                </UnstyledLink>}
                <Button disabled={btnDisabled} size='small' onClick={() => addSerialLine({channel: hardware.id, text: "BLINK", sent: true})} >Blink</Button>
            </CardActions>
        </OutlinedCard>
    );
}


export default withStyles(styles)(HardwareCard);