import React, { Component } from 'react';

import App from 'components/App';

import { refreshHardware } from 'utils/actions';

class AppContainer extends Component {
    
    componentDidMount() {
        refreshHardware();
    }
    
    render() {
        return <App />
    }
}

export default AppContainer;