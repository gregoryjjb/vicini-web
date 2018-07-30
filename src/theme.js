import { createMuiTheme } from '@material-ui/core/styles';

const getTheme = mode => {
	let theme = createMuiTheme({
		palette: {
			type: mode,
		},
	})
	
	window.theme = theme;
	
	return theme;
}

export default getTheme;