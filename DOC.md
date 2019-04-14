## Modules

<dl>
<dt><a href="#module_oas-impl">oas-impl</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Request">Request</a> : <code>Object</code></dt>
<dd><p>Request.</p>
</dd>
<dt><a href="#Response">Response</a> : <code>Object</code></dt>
<dd><p>Response.</p>
</dd>
<dt><a href="#RequestValidationError">RequestValidationError</a> : <code>Object</code></dt>
<dd><p>Request Validation Error</p>
</dd>
<dt><a href="#ResponseValidationError">ResponseValidationError</a> : <code>Object</code></dt>
<dd><p>Response Validation Error.</p>
</dd>
<dt><a href="#Route">Route</a> : <code>Object</code></dt>
<dd><p>Route.</p>
</dd>
</dl>

<a name="module_oas-impl"></a>

## oas-impl

* [oas-impl](#module_oas-impl)
    * [oas(definition, option)](#exp_module_oas-impl--oas) ⇒ [<code>dispatch</code>](#module_oas-impl--oas..dispatch) ⏏
        * [~dispatch(method, path)](#module_oas-impl--oas..dispatch) ⇒ [<code>Route</code>](#Route)

<a name="exp_module_oas-impl--oas"></a>

### oas(definition, option) ⇒ [<code>dispatch</code>](#module_oas-impl--oas..dispatch) ⏏
Dispatcher.

Create a dispatch function.

**Kind**: Exported function  
**Returns**: [<code>dispatch</code>](#module_oas-impl--oas..dispatch) - The dispatcher  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>Object</code> | The OpenAPI v3 definition |
| option | <code>Object</code> | The option map |
| option.generator | <code>Object.&lt;string, fn(schema, option)&gt;</code> | The generator map keyed by schema format |

<a name="module_oas-impl--oas..dispatch"></a>

#### oas~dispatch(method, path) ⇒ [<code>Route</code>](#Route)
Dispatch a request.

**Kind**: inner method of [<code>oas</code>](#exp_module_oas-impl--oas)  
**Returns**: [<code>Route</code>](#Route) - The resolve route  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | The request method |
| path | <code>string</code> | The request path |

<a name="Request"></a>

## Request : <code>Object</code>
Request.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| path | <code>Object</code> | The request path |
| query | <code>Object</code> | The request query |
| header | <code>Object</code> | The request header |
| cookie | <code>Object</code> | The request cookie |
| content | <code>Object</code> | The request content |
| mediaType | <code>Object</code> | The request media type |

<a name="Response"></a>

## Response : <code>Object</code>
Response.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| header | <code>Object</code> | The response header |
| content | <code>Object</code> | The response content |
| mediaType | <code>Object</code> | The response media type |
| status | <code>Object</code> | The response status |

<a name="RequestValidationError"></a>

## RequestValidationError : <code>Object</code>
Request Validation Error

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | The data path |
| rule | <code>string</code> | The violated rule |
| value | <code>\*</code> | The invalid value |
| ajv | <code>Object</code> | The Ajv error if available |

<a name="ResponseValidationError"></a>

## ResponseValidationError : <code>Object</code>
Response Validation Error.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | The data path |
| rule | <code>string</code> | The violated rule |
| value | <code>\*</code> | The invalid value |
| ajv | <code>Object</code> | The Ajv error if available |

<a name="Route"></a>

## Route : <code>Object</code>
Route.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | The matched path |
| method | <code>string</code> | The matched method |
| definition | <code>Object</code> | The OpenAPI v3 specification |
| operation | [<code>Operation</code>](#Route.Operation) | The matched operation |
| implementation | [<code>Impl</code>](#Route.Impl) | The matched operation implementation |


* [Route](#Route) : <code>Object</code>
    * [.Impl](#Route.Impl) : <code>Object</code>
    * [.Operation](#Route.Operation) : <code>Object</code>

<a name="Route.Impl"></a>

### Route.Impl : <code>Object</code>
Implementation.

**Kind**: static typedef of [<code>Route</code>](#Route)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| requestCoercer | [<code>requestCoercer</code>](#Impl.requestCoercer) | The request coercer |
| requestValidator | [<code>requestValidator</code>](#Impl.requestValidator) | The request validator |
| responseCoercer | [<code>responseCoercer</code>](#Impl.responseCoercer) | The response coercer |
| responseGenerator | [<code>responseGenerator</code>](#Impl.responseGenerator) | The response generator |
| responseValidator | [<code>responseValidator</code>](#Impl.responseValidator) | The response validator |

<a name="Route.Operation"></a>

### Route.Operation : <code>Object</code>
Operation.

The operation's parameters are merged with its parent's.
The rest is identical to the OpenAPI specification.

**Kind**: static typedef of [<code>Route</code>](#Route)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Operation.parameters | <code>Object</code> | The matched operation parameters and its parents' |

