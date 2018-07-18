import React from "react";
import PropTypes from 'prop-types';
import { fieldType } from 'utils/types';

import {
    withStyles,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Card,
    CardContent,
    Typography,
} from "@material-ui/core";

import PluginField from 'components/PluginField';

const styles = theme => ({
    root: {},
    form: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    panel: {
        //backgroundColor: theme.palette.background.default,
        maxWidth: 240,
        marginBottom: 16,
        marginRight: 16,
    },
    inputArea: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginTop: 8,
        width: '100%',
    },
})

const PluginForm = ({ classes, fields, values, handleChange, handleClick }) => {
    
    const groups = [...new Set(fields.map(f => f.group || 'nogroup'))];
    
    console.log("GROUPS", groups);
    
    const groupedFields = groups.map(g => {
        return {
            group: g,
            fields: fields.filter(f => f.group === g || (f.group === undefined && g === 'nogroup')),
        }
    })
    
    console.log(groupedFields);
    
    return(
        <form className={classes.form} >
            {groupedFields.map(g => (
                <Card key={g.group} className={classes.panel} >
                    <CardContent>
                        <Typography variant="subheading" gutterBottom >
                            {g.group}
                        </Typography>
                        {g.fields.map(f => (
                            <PluginField
                                className={classes.input}
                                field={f}
                                value={values[f.name]}
                                onChange={handleChange}
                                onClick={handleClick}
                                key={f.name} />
                        ))}
                    </CardContent>
                </Card>
            ))}
            
        </form>
    )
}

PluginForm.propTypes = {
    fields: PropTypes.arrayOf(fieldType).isRequired,
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(PluginForm);