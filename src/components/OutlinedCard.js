import React from "react";
import { withStyles, Card } from "@material-ui/core";

const styles = theme => ({
    root: {
        boxShadow: 'none',
        border: '1px solid ' + theme.palette.divider,
        borderRadius: 6,
    },
})

const OutlinedCard = ({ className, classes, children, }) => (
    <Card className={className + ' ' + classes.root} >
        {children}
    </Card>
);

export default withStyles(styles)(OutlinedCard);