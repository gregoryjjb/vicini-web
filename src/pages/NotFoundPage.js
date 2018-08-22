import React from "react";

import {
	withStyles,
	Typography,
} from "@material-ui/core";

import PageGrid from 'components/layout/PageGrid';
import PageGridItem from 'components/layout/PageGridItem';

const NotFoundPage = ({ classes, match }) => (
	<PageGrid columns='auto' rows='auto' >
		<PageGridItem>
			<Typography variant='display3' align='center' gutterBottom >Invalid URL</Typography>
			<Typography variant='display1' align='center' >(404 Not Found)</Typography>
		</PageGridItem>
	</PageGrid>
)

export default NotFoundPage;