<a name="module_oas-impl"></a>

## oas-impl

* [oas-impl](#module_oas-impl)
    * _static_
        * [.dispatcher(definition)](#module_oas-impl.dispatcher) ⇒ [<code>dispatcher</code>](#module_oas-impl..dispatcher)
        * [.parser()](#module_oas-impl.parser) ⇒ [<code>parser</code>](#module_oas-impl..parser)
        * [.requestCoercer(operation)](#module_oas-impl.requestCoercer) ⇒ [<code>requestCoercer</code>](#module_oas-impl..requestCoercer)
        * [.requestValidator(operation)](#module_oas-impl.requestValidator) ⇒ [<code>requestValidator</code>](#module_oas-impl..requestValidator)
        * [.responseCoercer(operation)](#module_oas-impl.responseCoercer) ⇒ [<code>responseCoercer</code>](#module_oas-impl..responseCoercer)
        * [.responseGenerator(operation, option)](#module_oas-impl.responseGenerator) ⇒ [<code>responseGenerator</code>](#module_oas-impl..responseGenerator)
        * [.responseValidator(operation)](#module_oas-impl.responseValidator) ⇒ [<code>responseValidator</code>](#module_oas-impl..responseValidator)
    * _inner_
        * [~dispatcher(method, path)](#module_oas-impl..dispatcher) ⇒ [<code>Route</code>](#module_oas-impl..Route)
        * [~parser(document)](#module_oas-impl..parser) ⇒ <code>Object</code>
        * [~requestCoercer(request)](#module_oas-impl..requestCoercer) ⇒ <code>Object</code>
        * [~requestValidator(request)](#module_oas-impl..requestValidator) ⇒ [<code>Array.&lt;RequestValidationError&gt;</code>](#module_oas-impl..RequestValidationError)
        * [~responseCoercer(response)](#module_oas-impl..responseCoercer) ⇒ <code>Object</code>
        * [~responseGenerator(payload)](#module_oas-impl..responseGenerator) ⇒ <code>\*</code>
        * [~responseValidator(response)](#module_oas-impl..responseValidator) ⇒ [<code>Array.&lt;ResponseValidationError&gt;</code>](#module_oas-impl..ResponseValidationError)
        * [~operation](#module_oas-impl..operation) : <code>Object</code>
        * [~Route](#module_oas-impl..Route) : <code>Object</code>
        * [~Request](#module_oas-impl..Request) : <code>Object</code>
        * [~Response](#module_oas-impl..Response) : <code>Object</code>
        * [~RequestValidationError](#module_oas-impl..RequestValidationError) : <code>Object</code>
        * [~ResponseValidationError](#module_oas-impl..ResponseValidationError) : <code>Object</code>
        * [~ResponseGeneratorOption](#module_oas-impl..ResponseGeneratorOption) : <code>Object</code>

<a name="module_oas-impl.dispatcher"></a>

### oas.dispatcher(definition) ⇒ [<code>dispatcher</code>](#module_oas-impl..dispatcher)
Create a dispatcher

**Kind**: static method of [<code>oas-impl</code>](#module_oas-impl)  
**Returns**: [<code>dispatcher</code>](#module_oas-impl..dispatcher) - The dispatcher  

| Param | Type | Description |
| --- | --- | --- |
| definition | <code>Object</code> | The OpenAPI v3 definition |

<a name="module_oas-impl.parser"></a>

### oas.parser() ⇒ [<code>parser</code>](#module_oas-impl..parser)
Create a parser

**Kind**: static method of [<code>oas-impl</code>](#module_oas-impl)  
**Returns**: [<code>parser</code>](#module_oas-impl..parser) - The parser  
<a name="module_oas-impl.requestCoercer"></a>

### oas.requestCoercer(operation) ⇒ [<code>requestCoercer</code>](#module_oas-impl..requestCoercer)
Create a request coercer

**Kind**: static method of [<code>oas-impl</code>](#module_oas-impl)  
**Returns**: [<code>requestCoercer</code>](#module_oas-impl..requestCoercer) - The request coercer  

| Param | Type | Description |
| --- | --- | --- |
| operation | [<code>operation</code>](#module_oas-impl..operation) | The operation |

<a name="module_oas-impl.requestValidator"></a>

### oas.requestValidator(operation) ⇒ [<code>requestValidator</code>](#module_oas-impl..requestValidator)
Create a request validator

**Kind**: static method of [<code>oas-impl</code>](#module_oas-impl)  
**Returns**: [<code>requestValidator</code>](#module_oas-impl..requestValidator) - The request validator  

| Param | Type | Description |
| --- | --- | --- |
| operation | [<code>operation</code>](#module_oas-impl..operation) | The operation |

<a name="module_oas-impl.responseCoercer"></a>

### oas.responseCoercer(operation) ⇒ [<code>responseCoercer</code>](#module_oas-impl..responseCoercer)
Create a response coercer.

**Kind**: static method of [<code>oas-impl</code>](#module_oas-impl)  
**Returns**: [<code>responseCoercer</code>](#module_oas-impl..responseCoercer) - The response coercer  

| Param | Type | Description |
| --- | --- | --- |
| operation | [<code>operation</code>](#module_oas-impl..operation) | The operation |

<a name="module_oas-impl.responseGenerator"></a>

### oas.responseGenerator(operation, option) ⇒ [<code>responseGenerator</code>](#module_oas-impl..responseGenerator)
Create a response generator.

**Kind**: static method of [<code>oas-impl</code>](#module_oas-impl)  
**Returns**: [<code>responseGenerator</code>](#module_oas-impl..responseGenerator) - The response generator  

| Param | Type | Description |
| --- | --- | --- |
| operation | [<code>operation</code>](#module_oas-impl..operation) | The operation |
| option | [<code>ResponseGeneratorOption</code>](#module_oas-impl..ResponseGeneratorOption) | The generator option map |

<a name="module_oas-impl.responseValidator"></a>

### oas.responseValidator(operation) ⇒ [<code>responseValidator</code>](#module_oas-impl..responseValidator)
Create a response validator.

**Kind**: static method of [<code>oas-impl</code>](#module_oas-impl)  
**Returns**: [<code>responseValidator</code>](#module_oas-impl..responseValidator) - The response validator  

| Param | Type | Description |
| --- | --- | --- |
| operation | [<code>operation</code>](#module_oas-impl..operation) | The operation |

<a name="module_oas-impl..dispatcher"></a>

### oas-impl~dispatcher(method, path) ⇒ [<code>Route</code>](#module_oas-impl..Route)
Dispatch a request.

**Kind**: inner method of [<code>oas-impl</code>](#module_oas-impl)  
**Returns**: [<code>Route</code>](#module_oas-impl..Route) - The resolve route  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | The request method |
| path | <code>string</code> | The request path |

<a name="module_oas-impl..parser"></a>

### oas-impl~parser(document) ⇒ <code>Object</code>
Parse a document OpenAPI v3

**Kind**: inner method of [<code>oas-impl</code>](#module_oas-impl)  
**Returns**: <code>Object</code> - The validated, dereferenced and bundle specification  

| Param | Type | Description |
| --- | --- | --- |
| document | <code>string</code> | Anything that swagger-parser may handle |

<a name="module_oas-impl..requestCoercer"></a>

### oas-impl~requestCoercer(request) ⇒ <code>Object</code>
Coerce a request

**Kind**: inner method of [<code>oas-impl</code>](#module_oas-impl)  
**Returns**: <code>Object</code> - The coerced request  

| Param | Type | Description |
| --- | --- | --- |
| request | [<code>Request</code>](#module_oas-impl..Request) | The request |

<a name="module_oas-impl..requestValidator"></a>

### oas-impl~requestValidator(request) ⇒ [<code>Array.&lt;RequestValidationError&gt;</code>](#module_oas-impl..RequestValidationError)
Validator a request

**Kind**: inner method of [<code>oas-impl</code>](#module_oas-impl)  
**Returns**: [<code>Array.&lt;RequestValidationError&gt;</code>](#module_oas-impl..RequestValidationError) - The request validation errors  

| Param | Type | Description |
| --- | --- | --- |
| request | [<code>Request</code>](#module_oas-impl..Request) | The request |

<a name="module_oas-impl..responseCoercer"></a>

### oas-impl~responseCoercer(response) ⇒ <code>Object</code>
Coerce a response.

**Kind**: inner method of [<code>oas-impl</code>](#module_oas-impl)  
**Returns**: <code>Object</code> - The coerced response  

| Param | Type | Description |
| --- | --- | --- |
| response | [<code>Response</code>](#module_oas-impl..Response) | The response |

<a name="module_oas-impl..responseGenerator"></a>

### oas-impl~responseGenerator(payload) ⇒ <code>\*</code>
Generate a response.

**Kind**: inner method of [<code>oas-impl</code>](#module_oas-impl)  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | The payload |
| payload.mediaType | <code>Object</code> | The expected response media type |
| payload.status | <code>Object</code> | The expected response status |

<a name="module_oas-impl..responseValidator"></a>

### oas-impl~responseValidator(response) ⇒ [<code>Array.&lt;ResponseValidationError&gt;</code>](#module_oas-impl..ResponseValidationError)
Validate a response.

**Kind**: inner method of [<code>oas-impl</code>](#module_oas-impl)  
**Returns**: [<code>Array.&lt;ResponseValidationError&gt;</code>](#module_oas-impl..ResponseValidationError) - The response validation errors  

| Param | Type | Description |
| --- | --- | --- |
| response | [<code>Response</code>](#module_oas-impl..Response) | The response |

<a name="module_oas-impl..operation"></a>

### oas-impl~operation : <code>Object</code>
OpenAPI v3 operation.

The operation's parameters are merged with its parent's.

**Kind**: inner typedef of [<code>oas-impl</code>](#module_oas-impl)  
<a name="module_oas-impl..Route"></a>

### oas-impl~Route : <code>Object</code>
Route.

**Kind**: inner typedef of [<code>oas-impl</code>](#module_oas-impl)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| definition | <code>Object</code> | The OpenAPI v3 specification |
| path | <code>string</code> | The matched path |
| method | <code>string</code> | The matched method |
| operation | [<code>operation</code>](#module_oas-impl..operation) | The matched operation |
| operation.parameters | <code>Object</code> | The matched operation parameters and its parents' |

<a name="module_oas-impl..Request"></a>

### oas-impl~Request : <code>Object</code>
Request.

**Kind**: inner typedef of [<code>oas-impl</code>](#module_oas-impl)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| path | <code>Object</code> | The request path |
| query | <code>Object</code> | The request query |
| header | <code>Object</code> | The request header |
| cookie | <code>Object</code> | The request cookie |
| content | <code>Object</code> | The request content |
| mediaType | <code>Object</code> | The request media type |

<a name="module_oas-impl..Response"></a>

### oas-impl~Response : <code>Object</code>
Response.

**Kind**: inner typedef of [<code>oas-impl</code>](#module_oas-impl)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| header | <code>Object</code> | The response header |
| content | <code>Object</code> | The response content |
| mediaType | <code>Object</code> | The response media type |
| status | <code>Object</code> | The response status |

<a name="module_oas-impl..RequestValidationError"></a>

### oas-impl~RequestValidationError : <code>Object</code>
Request Validation Error

**Kind**: inner typedef of [<code>oas-impl</code>](#module_oas-impl)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | The data path |
| rule | <code>string</code> | The violated rule |
| value | <code>mixed</code> | The invalid value |
| ajv | <code>Object</code> | The Ajv error if available |

<a name="module_oas-impl..ResponseValidationError"></a>

### oas-impl~ResponseValidationError : <code>Object</code>
Response Validation Error.

**Kind**: inner typedef of [<code>oas-impl</code>](#module_oas-impl)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | The data path |
| rule | <code>string</code> | The violated rule |
| value | <code>mixed</code> | The invalid value |
| ajv | <code>Object</code> | The Ajv error if available |

<a name="module_oas-impl..ResponseGeneratorOption"></a>

### oas-impl~ResponseGeneratorOption : <code>Object</code>
Response Generator Option.

**Kind**: inner typedef of [<code>oas-impl</code>](#module_oas-impl)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| generator | <code>Object.&lt;string, fn(schema, option)&gt;</code> | The generator map keyed by schema format |

