import React from 'react';

import {
	withStyles,
	Card,
	CardContent,
} from '@material-ui/core';

import SerialContainer from 'containers/SerialContainer';
import SerialChip from '../components/serial/SerialChip';

const styles = theme => ({
	root: {
		height: '100%',
		margin: '0 -8px',
		
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	card: {
		margin: '0 8px',
		flex: 1,
		//overflowY: 'auto',
		maxHeight: '100%',
	},
})

const TestPage = ({ classes }) => (
	<div className={classes.root} >
		<Card className={classes.card} >
			<CardContent>
				<h1>First card</h1>
				<SerialChip text={"Hello there, this is a chip\nAnd here's a new line"} />
				<p>{lorem}</p>
			</CardContent>
		</Card>
		<SerialContainer className={classes.card} />
	</div>
);

export default withStyles(styles)(TestPage);

let lorem = `Lorem ipsum dolor sit amet, te eam tollit verear scripta, vim lorem tractatos theophrastus ne. Reque aliquando an sed, has et sumo soleat eloquentiam. Euripidis similique at mei, et pri latine tractatos, usu id consul soleat. Sit natum nominavi eu, qui albucius praesent honestatis eu. An per nihil ubique omittam, cu erant epicuri neglegentur vim, his ex noster iudicabit.
Usu tation virtute pertinax ut. Est quando ceteros no. Cu eum diceret nusquam. Munere integre scripserit quo ea, alii soluta intellegam eu est. Nec eu tantas ceteros definitiones, probatus expetenda ne vis, vis cu mandamus splendide vituperatoribus.
Dicta labores percipit pro id, odio verear aeterno sed cu. Quo possim incorrupte ei. His in nonumy sensibus sadipscing, eos omnesque mnesarchum ei. Ne pri dicat volumus, duo ut summo appetere.
Inermis noluisse pro an. An mel consequat eloquentiam, sea id natum verear oblique, ut tritani ocurreret deseruisse his. Qui justo omittam percipitur ex, latine definitionem cum ut. Usu aeterno volutpat id, pri tota noster meliore ad.
Cum tation eirmod dolores cu. Congue option aliquid cu usu. Eius argumentum pro in. Sea te vituperata persequeris, mei te urbanitas voluptatibus. In vocent vulputate eos, ei saperet consetetur quo, quot reprehendunt pri ne.`