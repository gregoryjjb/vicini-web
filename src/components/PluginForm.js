import React from "react";
import PropTypes from 'prop-types';
import { fieldType } from 'utils/types';

import {
    withStyles,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from "@material-ui/core";

import PluginField from 'components/PluginField';

const styles = theme => ({
    root: {},
    form: {
        display: 'flex',
        flexDirection: 'column',
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
                <div>
                    <p>{g.group}</p>
                    {g.fields.map(f => (
                        <PluginField
                            field={f}
                            value={values[f.name]}
                            onChange={handleChange}
                            onClick={handleClick}
                            key={f.name} />
                    ))}
                </div>
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