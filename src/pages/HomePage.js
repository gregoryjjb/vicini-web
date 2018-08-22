import React from "react";

import {
	withStyles,
} from "@material-ui/core";

import HardwareContainer from "containers/HardwareContainer";
import SerialContainer from "containers/SerialContainer";

import PageGrid from "components/layout/PageGrid";
import PageGridItem from "components/layout/PageGridItem";


const styles = theme => ({
	
})

const HomePage = ({ classes }) => (
	<PageGrid columns='50% 50%' >
		<PageGridItem >
			<HardwareContainer />
		</PageGridItem>
	</PageGrid>
);

export default withStyles(styles)(HomePage);