import React from "react";
import { Link } from 'react-router-dom';

import {
	withStyles,
	Typography,
} from "@material-ui/core";

import UnstyledLink from 'components/UnstyledLink';
import HardwareCard from 'components/HardwareCard';
import HardwareContainer from "../containers/HardwareContainer";

const styles = theme => ({
	root: {
		margin: 16,
	},
	hardwareArea: {
		display: 'flex',
		flexDirection: 'row',
	}
})

const dummyHardware = [{
	name: "LTC1234",
}, {
	name: "AD",
}]

const HomePage = ({ classes }) => (
	<div className={classes.root} >
		<Typography variant="display2" gutterBottom >Attached Hardware</Typography>
		<div className={classes.hardwareArea} >
			<HardwareContainer />
		</div>
	</div>
);

export default withStyles(styles)(HomePage);