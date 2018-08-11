import { createMuiTheme } from '@material-ui/core/styles';

const getTheme = mode => {
	let theme = createMuiTheme({
		palette: {
			type: mode,
			primary: {
				main: '#455a64',
			},
			secondary: {
				main: '#66bb6a',
			},
		},
		mixins: {
			verticalSlice: {
				margin: '0 8px',
				flex: 1,
				maxHeight: '100%',
				display: 'flex',
				flexDirection: 'column',
			}
		},
		typography: {
			mono: {
				fontFamily: '"Roboto Mono", monospace',
				fontSize: 12,
			}
		},
	})
	
	window.theme = theme;
	
	return theme;
}

export default getTheme;