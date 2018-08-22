# Vicini Web Client

A prototype for a Linduino GUI. See vicini-server-dotnet for the server.

## Plugins

Plugins go under src/plugins.

### Field Properties

* [name*](#name)
* [type*](#type)
* [label](#label)
* [units](#units)
* [multiline](#multiline)
* [group](#group)
* [defaultValue](#defaultValue)
* [options](#options)
* [output](#output)
* [onClick](#onClick)
* [enabled](#enabled)
* [error](#error)

---

#### name

The name of the field and the key for its value in the values object.

**Required**

Datatype: `string`

---

#### type

Defines the type of the **field** that is rendered. If `none`, then no field is rendered, but the value becomes available in the values object for use in the plugin.

**Required**

Datatype: `string`

Possible values:
- `text`
- `number`
- `checkbox`
- `select`
- `select-multi`
- `radio`
- `button`
- `none`

---

#### label

Label shown on the field. If undefined, `name` will be used as the label, except in the case of the `radio` field type, which will not render any label.

Datatype: `string | func(values)`

Default: [name](#name)

---

#### units

Symbol for units, placed on right side of field (V, mV, etc). Does not actually do any unit conversion.

Datatype: `string | func(values)`

---

#### mutiline

Allows a text/number field to overflow on to multiple lines. Does not have any effect on any other field type.

Datatype: `bool`

Default: `false`

---

#### options

Defines elements for `select`, `select-multi`, and `radio` field types. The value is what is stored in the state, while the label is rendered.

Datatype: `array of shape { value, label } | array of strings`

Default: `[ ]`

---

#### defaultValue

The default value on startup.

Datatype: `string | number | bool | array`

---

#### group

The name of this group that the field is part of on the GUI.

Datatype: `string`

Default: `nogroup`

---

#### output

If true, then the field is an output and cannot be edited by the user, but can be set from the reducer and update functions.

Datatype: `bool`

Default: `false`

---

#### onClick

On buttons, this function is called when the button is pressed. Does not have any effect on other field types.

Datatype: `function(values, update)`

---

#### enabled

Enables/disables disables the field (at runtime if a function is used).

Datatype: `bool | func(values)`

Default: `true`

---

#### error

Applies validation. Return the error message string if there is a validation error, or an empty string if there is none.

Datatype: `func(values)`

---

## Contributing

### Basic Ideas

There are still some rough edges but these are the goals we are trying to adhere to.

The project uses React and the [Material-UI](https://material-ui.com/) styling library. Careful consideration has been taken to keep styles that are needed in multiple parts of the application in the Material-UI `theme` object. Don't forget to test new features in both the light and dark theme!

[Undux](https://github.com/bcherny/undux) is being used for the global store. Data should be stored in the global store if it is pulled from the server with async requests, or is needed in multiple places across the application. API calls/routes are defined in `utils/api.js`, while `utils/actions.js` usually contains a call to those API functions and a call to update the global store as well. Updates to the store should be called inside `actions.js` only (this will probably change and be split into a few files). Note that data in the store must be serializable; this means no functions or promises.

React components that read or update the state or make API calls (through `actions.js`) are called *containers*. These containers live under `src/containers` and have "container" in the name. They can have their own internal state if needed. They generally do not render anything directly but instead pass data through props into one or more *dumb component* children.

React components that simply render data passed in through props are *dumb components* are live under `src/components`. These components should **not** contain any calls to any actions or update the store directly; callback functions should be passed in through props. They should also be [defined functionally](https://reactjs.org/docs/components-and-props.html#functional-and-class-components) if possible, although they are allowed to have internal state if neccessary. This internal state should not affect any other part of the app, however (an example of "good" internal state for a dumb button component might be whether or not the user is hovering over the button; this data shouldn't go in the global store since nothing else cares about it).

While we are not using [Redux](https://redux.js.org/), we are using many of its design principles in a simplified, less-verbose way.