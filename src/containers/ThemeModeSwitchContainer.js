import React from 'react';
import { withStore } from 'utils/store';

import { Switch } from '@material-ui/core';

import { setLightMode } from 'utils/actions';

const ThemeModeSwitchContainer = ({ store, className }) => (
	<Switch
		checked={store.get('ui.lightMode')}
		onChange={(e) => setLightMode(e.target.checked)}
		/>
)

export default withStore(ThemeModeSwitchContainer);