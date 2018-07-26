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

import api from 'utils/api';

const styles = theme => ({
    root: {},
    card: {
        width: 275,
        marginRight: 16, //temp
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
        <Card className={classes.card} >
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
                {!identified && <Button disabled={btnDisabled} onClick={() => api.identifyHardware(hardware.id)} >Identify</Button>}
                {identified && <UnstyledLink to={`/plugin/${hardware.details.part}`} >
                    <Button disabled={btnDisabled} >Open</Button>
                </UnstyledLink>}
                <Button disabled={btnDisabled} >Blink</Button>
            </CardActions>
        </Card>
    );
}


export default withStyles(styles)(HardwareCard);