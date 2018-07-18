import { createMuiTheme } from '@material-ui/core/styles';

const getTheme = mode => createMuiTheme({
	palette: {
		type: mode,
	}
})

export default getTheme;