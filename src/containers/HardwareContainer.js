import React, { Component } from 'react';

import HardwareCard from 'components/HardwareCard';

import api from 'utils/api';
import { withStore } from 'utils/store';
import HardwareList from '../components/HardwareList';

class HardwareContainer extends Component {
    componentDidMount() {
        this.fetchHardware();
    }
    
    fetchHardware = () => {
        
        api.getHardware();
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