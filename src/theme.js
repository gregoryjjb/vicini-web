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
		overrides: {
			MuiTooltip: {
				tooltip: {
					backgroundColor: mode === 'dark' ? '#fff' : '#616161',
					color: mode === 'dark' ? '#000' : '#fff',
					fontSize: 12,
					userSelect: 'none',
				},
				popper: {
					opacity: 1,
				},
			}
		}
	})
	
	window.theme = theme;
	
	return theme;
}

export default getTheme;