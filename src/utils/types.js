import PropTypes from 'prop-types';

export const hardwareType = PropTypes.shape({
    name: PropTypes.string.isRequired,
})

export const fieldType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    output: PropTypes.bool,
    onClick: PropTypes.func,
})

export const pluginType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    
    fields: PropTypes.arrayOf(fieldType).isRequired,
    
    reducer: PropTypes.func,
})