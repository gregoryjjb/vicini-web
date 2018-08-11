import React from "react";
import PropTypes from 'prop-types';

import {
    withStyles,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@material-ui/core";

import UnstyledLink from "components/UnstyledLink";
import OutlinedCard from 'components/OutlinedCard';

import { hardwareType } from 'utils/types';

const styles = theme => ({
    root: {},
    buttonArea: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    button: {
        marginRight: 4,
    },
    disabled: {
        color: theme.palette.text.disabled,
    }
})

const HardwareCard = ({ classes, hardware, disabled, openClicked, closeClicked }) => {
    
    let identified = hardware.details && hardware.details.board;
    
    let { available, open } = hardware;
    
    let btnDisabled = !available || disabled;
    
    return (
        <OutlinedCard>
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
                        <Button
                            disabled={btnDisabled}
                            size='small'
                            className={classes.button}
                            onClick={closeClicked} >
                            Disconnect
                        </Button>
                        <UnstyledLink to={`/plugin/${hardware.id}/${hardware.details.chip}`} >
                            <Button
                                disabled={btnDisabled}
                                size='small'
                                className={classes.button} >
                                Plugin
                            </Button>
                        </UnstyledLink>
                    </React.Fragment>
                    :
                    <Button
                        disabled={btnDisabled}
                        size='small'
                        className={classes.button}
                        onClick={openClicked} >
                        Connect
                    </Button>
                }
            </CardActions>
        </OutlinedCard>
    );
}

HardwareCard.propTypes = {
    disabled: PropTypes.bool,
    hardware: hardwareType,
    openClicked: PropTypes.func.isRequired,
    closeClicked: PropTypes.func.isRequired,
}

export default withStyles(styles)(HardwareCard);