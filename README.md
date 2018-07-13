# Vicini
Linduino GUI prototype (the project is currently called Vicini, even though the repo says gooey) 

A project that aims to make it easy to create simple GUI plug-ins to interact with Arduino and Linduino hardware. A sketch is written that exposes commands to be entered over serial with appropriate responses. The plug-in defines the inputs and outputs in a simple mostly declarative form in JavaScript. Vicini generates the GUI based on the plug-in and also sends the commands to the hardware and returns the responses to update the GUI.
The project is split into a client and server. The server communicates with the hardware and the client is a React single page app.

## API Endpoints
 *this is a work in progress*

All commands are relative to `http://localhost:8998/vicini`. For example the `find` command would be `http://localhost:8998/vicini/find`

### POST



### PUT


<details>
<summary><strong>open/:id</strong></summary>

Opens a device identified by `:id`

Returns:
```
{ 'status': 'OK', 'id': &lt;id&gt; }
```
Errors:
```
InvalidId, IoError
```
</details>
<br/>
<details>
<summary><strong>close/:id</strong></summary>

Closes a device identified by `:id`

Returns:
```
{ 'status': 'OK', 'id': &lt;id&gt; }
```
Errors:
```
InvalidId, IoError
```
</details>

### Get


<details>
<summary><strong style = "font-family:monospace;">find:</strong> Finds all connected hardware and returns a unique ID for each</summary>
<p>Returns: <pre>{ 'status': 'OK', 'ids': [{ 'id': &lt;id_1&gt; }, ... { 'id': &lt;id_n&gt; }] }</pre></p>
<p>Errors: None</p>
</details>

## Errors

<details>
<summary><strong style = "font-family:monospace;">InvalidId</strong> Indicates an ID was used that does not correspond to any device</summary>
<pre>{ 'status': 'InvalidId', 'id': &lt;id&gt;, 'message': 'ID does not correspond to any device' }</pre>
</details>


<details>
<summary><strong style = "font-family:monospace;">IoError:</strong> Indicates an error occured while trying to communicate with a device</summary>
<pre>{ 'status': 'IoError', 'id': &lt;id&gt;, 'message': 'An error occurred while trying to communicate with the device' }<pre>
</details>

