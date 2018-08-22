import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	withStyles,
	Tabs,
	Tab,
	CardContent,
} from '@material-ui/core';

import PageGridItem from './PageGridItem';
import PageGridItemContents from './PageGridItemContents';

const styles = theme => ({
	tabs: {
		color: theme.palette.text.primary, 
		flex: '1 0',
	},
	card: {
		minHeight: 0,
		maxHeight: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
})

class TabbedGridItem extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			selectedTab: 0,
			
		}
	}
	
	handleTabChange = (event, value) => {
		this.setState({
			selectedTab: value,
		})
	}
	
	render() {
		let { selectedTab } = this.state;
		let { classes, labels, contents, card } = this.props;
		
		return(
			<PageGridItem card={card || false} content={false} >
				<PageGridItemContents>
					<Tabs
						className={classes.tabs}
						value={selectedTab}
						onChange={this.handleTabChange} >
						{labels.map(l => (
							<Tab label={l} key={l} />
						))}
					</Tabs>
					{card === true ? (
						<CardContent className={classes.card}>
							{contents[selectedTab]}
						</CardContent>
					) : (
						contents[selectedTab]
					)}
				</PageGridItemContents>
			</PageGridItem>
		)
	}
}

TabbedGridItem.propTypes = {
	labels: PropTypes.arrayOf(PropTypes.string),
	contents: PropTypes.arrayOf(PropTypes.element),
}

export default withStyles(styles)(TabbedGridItem);