import React from 'react';
import ReactDOM from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import AppContainer from 'containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';

import ThemeContainer from 'containers/ThemeContainer';

ReactDOM.render(
	<ThemeContainer>
		<CssBaseline />
		<AppContainer />
	</ThemeContainer>,
	document.getElementById('root')
);

registerServiceWorker();