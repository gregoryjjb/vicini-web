import React, { Component } from 'react';

import App from 'components/App';

import api from 'utils/api';
import { refreshSerialChannels } from 'utils/actions';

class AppContainer extends Component {
    
    componentDidMount() {
        // App loaded
        
        api.getHardware();
        
        setTimeout(() => {
            refreshSerialChannels();
        }, 2000);
    }
    
    render() {
        return <App />
    }
}

export default AppContainer;