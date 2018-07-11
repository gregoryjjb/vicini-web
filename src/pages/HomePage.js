import React from "react";
import { Link } from 'react-router-dom';

import {
	withStyles,
	Typography,
} from "@material-ui/core";

const styles = theme => ({
	root: {
		margin: 16,
	},
})

const HomePage = ({ classes }) => (
	<div className={classes.root} >
		<Typography variant="display2" gutterBottom >Attached Hardware</Typography>
		<div>
			<Link to="/plugin/LTC1234" >
				<Typography variant="headline" gutterBottom >LTC1234</Typography>
			</Link>
			<Link to="/plugin/AD" >
				<Typography variant="headline" gutterBottom >AD</Typography>
			</Link>
		</div>
	</div>
);

export default withStyles(styles)(HomePage);