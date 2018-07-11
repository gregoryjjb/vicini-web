import React from "react";
import { Link } from 'react-router-dom';

import {
	withStyles,
	Typography,
} from "@material-ui/core";

import UnstyledLink from 'components/UnstyledLink';

const styles = theme => ({
	root: {
		margin: 16,
	},
})

const HomePage = ({ classes }) => (
	<div className={classes.root} >
		<Typography variant="display2" gutterBottom >Attached Hardware</Typography>
		<div>
			<UnstyledLink to="/plugin/LTC1234" >
				<Typography variant="headline" gutterBottom >LTC1234</Typography>
			</UnstyledLink>
			<UnstyledLink to="/plugin/AD" >
				<Typography variant="headline" gutterBottom >AD</Typography>
			</UnstyledLink>
		</div>
	</div>
);

export default withStyles(styles)(HomePage);