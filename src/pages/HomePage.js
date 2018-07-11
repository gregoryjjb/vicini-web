import React from "react";
import {
	withStyles,
	Typography,
} from "@material-ui/core";

const styles = theme => ({
	root: {},
})

const HomePage = ({ classes }) => (
	<div>
		<Typography variant="display2" >Attached Hardware</Typography>
		<p>Some hardware goes here</p>
	</div>
);

export default withStyles(styles)(HomePage);