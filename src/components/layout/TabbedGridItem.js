import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	withStyles, Tabs, Tab,
} from '@material-ui/core';
import PageGridItem from './PageGridItem';
import PageGridItemContents from './PageGridItemContents';

const styles = theme => ({
	root: {},
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
		let { labels, contents } = this.props;
		
		return(
			<PageGridItem>
				<PageGridItemContents>
					<Tabs value={selectedTab} onChange={this.handleTabChange} >
						{labels.map(l => (
							<Tab label={l} key={l} />
						))}
					</Tabs>
					{contents[selectedTab]}
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