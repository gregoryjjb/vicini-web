import React, { Component } from 'react';

import api from 'utils/api';
import { refreshSerialChannels } from 'utils/actions';
import { withStore } from 'utils/store';
import HardwareList from '../components/HardwareList';

class HardwareContainer extends Component {
    componentDidMount() {
        this.fetchHardware();
    }
    
    fetchHardware = () => {
        
        /*api.getHardware();
        
        setTimeout(() => {
            refreshSerialChannels();
        }, 2000);*/
    }
    
    render() {
        const { store } = this.props;
        
        return(
            <HardwareList
                isLoading={store.get('hardware.loading')}
                error={store.get('hardware.error')}
                hardware={store.get('hardware.list')}
                refreshClicked={this.fetchHardware} />
        )
    }
}

export default withStore(HardwareContainer);