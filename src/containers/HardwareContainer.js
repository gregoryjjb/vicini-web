import React, { Component } from 'react';

import api from 'utils/api';
import {
    refreshHardware,
    openHardware,
    closeHardware,
} from 'utils/actions';
import { withStore } from 'utils/store';
import HardwareList from '../components/HardwareList';

class HardwareContainer extends Component {
    
    fetchHardware = () => {
        refreshHardware();
    }
    
    render() {
        const { store } = this.props;
        
        return(
            <HardwareList
                isLoading={store.get('hardware.loading')}
                error={store.get('hardware.error')}
                hardware={store.get('hardware.list')}
                refreshClicked={this.fetchHardware}
                openClicked={openHardware}
                closeClicked={closeHardware} />
        )
    }
}

export default withStore(HardwareContainer);