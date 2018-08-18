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