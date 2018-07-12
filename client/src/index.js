import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from 'components/App';
import theme from 'theme';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<MuiThemeProvider theme={theme} >
		<CssBaseline />
		<App />
	</MuiThemeProvider>,
	document.getElementById('root')
);

registerServiceWorker();