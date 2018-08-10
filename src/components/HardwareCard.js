import React from "react";
import PropTypes from 'prop-types';

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
import { hardwareType } from 'utils/types';

const styles = theme => ({
    root: {},
    card: {
        //width: 275,
        //marginRight: 16, //temp
        //marginBottom: 16,
    },
    buttonArea: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    disabled: {
        color: theme.palette.text.disabled,
    }
})

const HardwareCard = ({ classes, hardware, disabled }) => {
    
    let identified = hardware.details && hardware.details.board;
    
    let { available, open } = hardware;
    
    let btnDisabled = !available || disabled;
    
    return (
        <OutlinedCard className={classes.card} >
            <CardContent>
                <Typography variant="headline" gutterBottom>{hardware.id}</Typography>
                {identified &&
                    <span>
                        <Typography variant="body1">Chip</Typography>
                        <Typography variant="display1" gutterBottom>{hardware.details.chip}</Typography>
                        <Typography variant="body1">EVAL Board</Typography>
                        <Typography variant="display1" gutterBottom>{hardware.details.board}</Typography>
                    </span>
                }
                {!available &&
                    <Typography variant="title" className={classes.disabled} >Unavailable</Typography>
                }
            </CardContent>
            <CardActions className={classes.buttonArea} >
                {open ?
                    <React.Fragment>
                        <Button disabled={btnDisabled} size='small' onClick={() => api.closeHardware(hardware.id)} >Disconnect</Button>
                        <UnstyledLink to={`/plugin/${hardware.id}/${hardware.details.chip}`} >
                            <Button disabled={btnDisabled} size='small' >Plugin</Button>
                        </UnstyledLink>
                    </React.Fragment>
                    :
                    <Button disabled={btnDisabled} onClick={() => api.identifyHardware(hardware.id)} size='small' >Connect</Button>
                }
            </CardActions>
        </OutlinedCard>
    );
}

HardwareCard.propTypes = {
    disabled: PropTypes.bool,
    hardware: hardwareType,
}

export default withStyles(styles)(HardwareCard);