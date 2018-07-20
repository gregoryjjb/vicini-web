
function checkTypes(typeSpecs, values, location, componentName, getStack) {
    
    console.info("MANUAL TYPE CHECK")
    
    for (var typeSpecName in typeSpecs) {
        if (typeSpecs.hasOwnProperty(typeSpecName)) {
            var error;
            // Prop type validation may throw. In case they do, we don't want to
            // fail the render phase where it didn't fail before. So we log it.
            // After these have been cleaned up, we'll let them throw.
            try {
                // This is intentionally an invariant that gets caught. It's the same
                // behavior as without this statement except with a better message.
                if (typeof typeSpecs[typeSpecName] !== 'function') {
                    var err = Error(
                        (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
                        'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
                    );
                    err.name = 'Invariant Violation';
                    throw err;
                }
                error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
            } catch (ex) {
                error = ex;
            }
            if (error && !(error instanceof Error)) {
                
                let msg = (
                    (componentName || 'React class') + ': type specification of ' +
                    location + ' `' + typeSpecName + '` is invalid; the type checker ' +
                    'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
                    'You may have forgotten to pass an argument to the type checker ' +
                    'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
                    'shape all require an argument).'
                )
                
                console.error("AN ERROR WAS CAUGHT");
                
                throw new Error(msg);

            }
            if (error instanceof Error) {
                // Only monitor this failure once because there tends to be a lot of the
                // same error.
                //loggedTypeFailures[error.message] = true;

                var stack = getStack ? getStack() : '';

                console.error(
                    'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
                );
                
                
            }
        }
    }
}

export default checkTypes;