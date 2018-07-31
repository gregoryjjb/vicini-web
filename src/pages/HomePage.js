import React from "react";

import {
	withStyles,
	Typography,
} from "@material-ui/core";

import HardwareContainer from "../containers/HardwareContainer";
import SerialContainer from "../containers/SerialContainer";
import PageLayout from "../components/PageLayout";

const styles = theme => ({
	root: {
		margin: 16,
	},
	hardwareArea: {
		display: 'flex',
		flexDirection: 'row',
		overflowY: 'auto',
		...theme.mixins.verticalSlice,
	},
	serialArea: theme.mixins.verticalSlice,
})

const HomePage = ({ classes }) => (
	<PageLayout>
		<div className={classes.hardwareArea} >
			<HardwareContainer />
		</div>
		<SerialContainer className={classes.serialArea} />
	</PageLayout>
);

export default withStyles(styles)(HomePage);