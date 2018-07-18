import React from 'react';
import { withStore } from 'utils/store';
import { Switch } from '@material-ui/core';

const ThemeModeSwitchContainer = ({ store, className }) => (
	<Switch
		checked={store.get('ui.lightMode')}
		onChange={(e) => store.set('ui.lightMode')(e.target.checked)}
		/>
)

export default withStore(ThemeModeSwitchContainer);