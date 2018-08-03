import React from "react";
import { withStyles } from "@material-ui/core";

const styles = theme => {
    
    const bg = theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700];
    const col = theme.palette.getContrastText(bg);
    
    return {
        root: {
            color: col,
            minHeight: 32,
            maxWidth: '100%',
            borderRadius: 16,
            padding: '8px 12px',
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.8125rem',
            whiteSpace: 'pre-wrap',
            flexShrink: 0,
            margin: '2px 0px',
        },
        sent: {
            border: '1px solid ' + bg,
            alignSelf: 'flex-end',
        },
        recieved: {
            background: bg,
            alignSelf: 'flex-start',
        },
    }
}

const SerialChip = ({ classes, text, sent, }) => (
    <div className={classes.root + ' ' + (sent ? classes.sent : classes.recieved)} >
        {text}
    </div>
);

export default withStyles(styles)(SerialChip);