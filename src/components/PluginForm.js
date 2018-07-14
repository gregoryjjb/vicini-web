import React from "react";
import PropTypes from 'prop-types';
import { fieldType } from 'utils/types';

import { withStyles } from "@material-ui/core";

import PluginField from 'components/PluginField';

const styles = theme => ({
    root: {},
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
})

const PluginForm = ({ classes, fields, values, handleChange, handleClick }) => (
    <form className={classes.form} >
        {fields.map(f => (
            <PluginField
                field={f}
                value={values[f.name]}
                onChange={handleChange}
                onClick={handleClick}
                key={f.name} />
        ))}
    </form>
);

PluginForm.propTypes = {
    fields: PropTypes.arrayOf(fieldType).isRequired,
    values: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(PluginForm);