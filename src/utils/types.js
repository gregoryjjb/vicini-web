import PropTypes from 'prop-types';

export const hardwareShape = {
    id: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    details: PropTypes.shape({
        chip: PropTypes.string.isRequired,
        board: PropTypes.string.isRequired,
    })
}

export const hardwareType = PropTypes.shape(hardwareShape)

const valueTypes = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.array,
]);

export const fieldType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        'text',
        'number',
        'checkbox',
        'select',
        'select-multi',
        'radio',
        'button',
        'none',
    ]),
    label: PropTypes.string,
    units: PropTypes.string,
    group: PropTypes.string,
    defaultValue: valueTypes,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: valueTypes.isRequired,
        label: PropTypes.string.isRequired,
    })),
    output: PropTypes.bool,
    onClick: PropTypes.func,
})

export const pluginShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    
    fields: PropTypes.arrayOf(fieldType).isRequired,
    
    reducer: PropTypes.func,
}

export const pluginType = PropTypes.shape(pluginShape);


export const serialPortShape = {
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    lines: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            sent: PropTypes.bool.isRequired,
        })
    ).isRequired
}