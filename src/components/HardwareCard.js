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

const styles = theme => ({
    root: {},
    card: {
        width: 275,
        marginRight: 16, //temp
    }
})

const HardwareCard = ({ classes, hardware: { name } }) => (
    <Card className={classes.card} >
        <CardContent>
            <Typography variant="headline">{name}</Typography>
        </CardContent>
        <CardActions>
            <UnstyledLink to={`/plugin/${name}`} >
                <Button>Open</Button>
            </UnstyledLink>
            <Button>Blink</Button>
        </CardActions>
    </Card>
);

export default withStyles(styles)(HardwareCard);