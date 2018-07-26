import React from "react";

import {
	withStyles,
	Typography,
} from "@material-ui/core";

import HardwareContainer from "../containers/HardwareContainer";
import SerialContainer from "../containers/SerialContainer";

const styles = theme => ({
	root: {
		margin: 16,
	},
	hardwareArea: {
		display: 'flex',
		flexDirection: 'row',
	}
})

const HomePage = ({ classes }) => (
	<div className={classes.root} >
		<Typography variant="display2" gutterBottom >Attached Hardware</Typography>
		<div className={classes.hardwareArea} >
			<HardwareContainer />
		</div>
		<SerialContainer />
	</div>
);

export default withStyles(styles)(HomePage);