import React from 'react';

import {
	withStyles,
	Card,
	CardContent,
} from '@material-ui/core';

const styles = theme => ({
	root: {
		margin: 8,
		minHeight: 0,
	},
	card: {
		minHeight: 0,
		maxHeight: '100%',
		display: 'flex',
		flexDirection: 'column',
	}
})

const PageGridItem = ({
	classes,
	children,
	column='auto',
	row='auto',
	card=false,
	content=true,
}) => (
	<div
		className={classes.root}
		style={{
			gridColumn: column,
			gridRow: row,
		}} >
		{card === true ? (
			<Card className={classes.card} >
				{content === true ? (
					<CardContent className={classes.card} >
						{children}
					</CardContent>
				) : (
					children
				)}
			</Card>
		) : (
			children
		)}
	</div>
);

export default withStyles(styles)(PageGridItem);