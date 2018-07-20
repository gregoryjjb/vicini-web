import PropTypes from 'prop-types';

export const hardwareType = PropTypes.shape({
    name: PropTypes.string.isRequired,
})

const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export const fieldType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    units: PropTypes.string,
    group: PropTypes.string,
    defaultValue: stringOrNumber,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: stringOrNumber.isRequired,
        label: PropTypes.string.isRequired,
    })),
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