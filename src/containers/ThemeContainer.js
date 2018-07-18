import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';

import getTheme from 'theme';
import { withStore } from 'utils/store';

const ThemeContainer = ({ store, children }) => {
	
	const mode = store.get('ui.lightMode') === true ? 'light' : 'dark';
	
	return(
		<MuiThemeProvider theme={getTheme(mode)}>
			{children}
		</MuiThemeProvider>
	)
}

export default withStore(ThemeContainer);