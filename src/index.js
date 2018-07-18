import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from 'components/App';
import getTheme from 'theme';
import { withStore } from 'utils/store';
import registerServiceWorker from './registerServiceWorker';

import ThemeContainer from 'containers/ThemeContainer';

ReactDOM.render(
	<ThemeContainer>
		<CssBaseline />
		<App />
	</ThemeContainer>,
	document.getElementById('root')
);

registerServiceWorker();