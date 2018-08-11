# Vicini Web Client

A prototype for a Linduino GUI. See vicini-server-dotnet for the server.

## Plugins

Plugins go under src/plugins.

### Field types

#### name (Required)

type: `string`

#### label

type: `string`

If undefined, `name` will be used as label

#### units

type: `string`

#### type (Required)

type: `text | number | checkbox | select | button`

#### options

type: `array of shape { value, label }`

Only applies to `select` type

#### defaultValue

type: `string | number | bool`

#### group

type: `string`

#### output

type: `bool`

Defaults to false

#### onClick

type: `function(values, update)`

For buttons only