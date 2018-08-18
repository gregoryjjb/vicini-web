import React from 'react';
import PropTypes from 'prop-types';

import {
	withStyles,
	Snackbar,
	SnackbarContent,
} from '@material-ui/core';

import { green, amber} from '@material-ui/core/colors';

const styles = theme => {
	let success = green[800];
	let warning = amber[800];
	let error = theme.palette.error.dark;
	
	return {
		root: {},
		default: {
			
		},
		error: {
			backgroundColor: error,
			color: theme.palette.getContrastText(error),
		},
		success: {
			backgroundColor: success,
			color: theme.palette.getContrastText(success),
		},
		warning: {
			backgroundColor: warning,
			color: theme.palette.getContrastText(warning),
		}
	}
}

const ColoredSnackbar = ({
	classes,
	message,
	key,
	open,
	variant='default',
	duration=5000,
	onClose,
	onExited,
	
}) => (
	<Snackbar
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'left',
		}}
		key={key}
		open={open}
		autoHideDuration={duration}
		onClose={onClose}
		onExited={onExited} >
		<SnackbarContent
			className={classes[variant]}
			message={message}
			/>
	</Snackbar>
);

ColoredSnackbar.propTypes = {
	message: PropTypes.string.isRequired,
	key: PropTypes.number.isRequired,
	open: PropTypes.bool.isRequired,
	variant: PropTypes.oneOf(['default', 'success', 'warning', 'error']),
	duration: PropTypes.number,
	onClose: PropTypes.func,
	onExited: PropTypes.func,
}

export default withStyles(styles)(ColoredSnackbar);