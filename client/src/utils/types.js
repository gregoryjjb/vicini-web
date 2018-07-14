import PropTypes from 'prop-types';

export const fieldType = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    output: PropTypes.bool,
    onClick: PropTypes.func,
}

export const pluginType = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    
    fields: PropTypes.arrayOf(fieldType),
    
    reducer: PropTypes.func,
}