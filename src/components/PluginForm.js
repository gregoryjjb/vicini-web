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
    Grid,
    Divider,
} from "@material-ui/core";

import PluginField from 'components/PluginField';

const styles = theme => ({
    root: {},
    form: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
    },
    grid: {
        paddingTop: 8,
        paddingBottom: 16,
        marginTop: 0,
        marginBottom: 0,
        overflowY: 'auto',
    },
    inputArea: {
        display: 'flex',
        flexDirection: 'column',
    },
    panel: {
        boxShadow: 'none',
        border: '1px solid ' + theme.palette.divider,
        borderRadius: 8,
    },
    input: {
        marginTop: 8,
        width: '100%',
    },
})

const PluginForm = ({ classes, fields, values, handleChange, handleClick }) => {
    
    const groups = [...new Set(fields.map(f => f.group || 'nogroup'))];
    
    let groupedFields = groups
    .map(g => {
        let filteredFields = fields
        .filter(f => f.group === g || (f.group === undefined && g === 'nogroup'))
        .filter(f => (f.visible !== false && f.type !== 'none'));
        
        return {
            group: g,
            fields: filteredFields,
        }
    })
    .filter(g => g.fields.length > 0);
    
    return(
        <form className={classes.form} >
            <Divider />
            <Grid container spacing={16} className={classes.grid} >
                {groupedFields.map(g => (
                    <Grid item xl={3} lg={4} md={6} sm={12} key={g.group} >
                        <Card className={classes.panel} >
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
                    </Grid>
                ))}
            </Grid>
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