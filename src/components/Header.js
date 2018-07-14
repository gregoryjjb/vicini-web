import React from 'react';

import {
	withStyles,
	AppBar,
	Toolbar,
	Typography,
} from '@material-ui/core';

import UnstyledLink from 'components/UnstyledLink';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flex: 1,
	}
})

const Header = ({ classes }) => (
	<header className={classes.root} >
		<AppBar position="static">
			<Toolbar>
				<UnstyledLink to="/">
					<Typography variant="title" color="inherit" className={classes.title} >
						Linduino Vicini
					</Typography>
				</UnstyledLink>
			</Toolbar>
		</AppBar>
	</header>
)

export default withStyles(styles)(Header);