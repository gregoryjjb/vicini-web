import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

const styles = {
	link: {
		color: 'unset',
		textDecoration: 'none',
		'&:hover': {
			color: 'unset',
			textDecoration: 'none',
		}
	}
}

const UnstyledLink = ({ children, classes, to }) => (
	<Link className={classes.link} to={to} >
		{children}
	</Link>
)

export default withStyles(styles)(UnstyledLink);