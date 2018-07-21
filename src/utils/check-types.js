/**
 * Based on the React PropTypes 'checkPropTypes', but
 * with some modifications to make it easier to use
 * independently of rendering a Component.
 */

// Don't ask
const ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

/**
 * Check the types of an object
 * @param {PropTypes object} typeSpecs 
 * @param {Values to get type-checked} values 
 * @param {Gets printed out in message} componentName 
 * @returns {Array of errors (emtpy if no errors)}
 */
function checkTypes(typeSpecs, values, componentName) {
    
    const errors = [];
    
    for (var typeSpecName in typeSpecs) {
        if (typeSpecs.hasOwnProperty(typeSpecName)) {
            
            let error = null;
            
            // Make sure the PropType is a function
            if (typeof typeSpecs[typeSpecName] !== 'function') {
                var err = (
                    'TYPE-DEFINITION-ERROR at `' + typeSpecName + '`: Type must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
                )
                errors.push(err);
            }
            else {
                error = typeSpecs[typeSpecName](values, typeSpecName, componentName, 'property', null, ReactPropTypesSecret);
            }
            
            // If one of the PropTypes returned an invalid thing
            if (error && !(error instanceof Error)) {
                
                let msg = "TYPE-DEFINITION-ERROR at `" + typeSpecName + "`: Typechecker function must return `null` or `Error` but returned a `" + typeof error + "`";
                errors.push(msg);
            }
            
            // If one of the props didn't match its PropType
            if (error instanceof Error) {
                
                let msg = "PROP-MISMATCH-ERROR at `" + typeSpecName + "`: " + error.message;
                errors.push(msg);
            }
        }
    }
    
    return errors;
}

export default checkTypes;