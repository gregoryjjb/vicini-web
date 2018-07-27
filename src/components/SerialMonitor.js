import React from 'react';
import PropTypes from 'prop-types';

import {
	withStyles,
} from '@material-ui/core';

import { serialPortShape } from 'utils/types';

const styles = theme => ({
	root: {},
})

const SerialMonitor = ({ classes, port }) => (
	<div>
		{port.lines.map(line => (
			<p>{line.text} sent: {line.sent ? 'YES' : 'NO'}</p>
		))}
	</div>
);

SerialMonitor.propTypes = {
	port: PropTypes.shape(serialPortShape).isRequired,
}

export default withStyles(styles)(SerialMonitor);