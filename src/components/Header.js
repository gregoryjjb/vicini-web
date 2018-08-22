import React from 'react';

import {
	withStyles,
	AppBar,
	Toolbar,
	Typography,
	Button
} from '@material-ui/core';

import UnstyledLink from 'components/UnstyledLink';
import ThemeModeSwitchContainer from 'containers/ThemeModeSwitchContainer';
import { showNotification } from '../utils/actions';

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
		<AppBar position="fixed" >
			<Toolbar>
				<UnstyledLink to="/">
					<Typography variant="title" color="inherit" className={classes.title} >
						Linduino Vicini
					</Typography>
				</UnstyledLink>
				<ThemeModeSwitchContainer />
				<Button onClick={() => showNotification('WHAT')}>WAHT</Button>
			</Toolbar>
		</AppBar>
	</header>
)

export default withStyles(styles)(Header);