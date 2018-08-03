import React from "react";

import {
	withStyles,
	Typography,
	CardContent,
} from "@material-ui/core";

import HardwareContainer from "../containers/HardwareContainer";
import SerialContainer from "../containers/SerialContainer";

import PageLayout from "../components/PageLayout";
import VerticalSliceCard from 'components/layout/VerticalSliceCard';

const styles = theme => ({
	root: {
		margin: 16,
	},
	hardwareArea: {
		//display: 'flex',
		//flexDirection: 'row',
		//overflowY: 'auto',
		...theme.mixins.verticalSlice,
	},
	serialArea: theme.mixins.verticalSlice,
})

const HomePage = ({ classes }) => (
	<PageLayout>
		<VerticalSliceCard noBottom >
			<HardwareContainer />
		</VerticalSliceCard>
		<VerticalSliceCard>
			<SerialContainer className={classes.serialArea} />
		</VerticalSliceCard>
	</PageLayout>
);

export default withStyles(styles)(HomePage);