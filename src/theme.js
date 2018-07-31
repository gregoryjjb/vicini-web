import { createMuiTheme } from '@material-ui/core/styles';

const getTheme = mode => {
	let theme = createMuiTheme({
		palette: {
			type: mode,
		},
		mixins: {
			verticalSlice: {
				margin: '0 8px',
				flex: 1,
				maxHeight: '100%',
			}
		}
	})
	
	window.theme = theme;
	
	return theme;
}

export default getTheme;