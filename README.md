# OpenAPI Specification Implementation

![CircleCI](https://img.shields.io/circleci/build/github/throskam/oas-impl)
![Codecov](https://img.shields.io/codecov/c/github/throskam/oas-impl)
![npm-version](https://img.shields.io/npm/v/@throskam/oas-impl)
![npm-license](https://img.shields.io/npm/l/@throskam/oas-impl)

An [OpenAPI v3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md) specification implementation.

## Features

- *Request* and *Response* **validation** (based on `ajv`)
- *Request* and *Response* **coersion** (type casting and defaults setting)
- *Response* **generation** (customizable)

## Dependencies

- [openapi-schema-to-json-schema](https://github.com/mikunn/openapi-schema-to-json-schema)
- [ajv](https://github.com/epoberezkin/ajv)

## Installation

`npm install @throskam/oas-impl`

## Usage

```
import oas from 'oas-impl'

/** Create a request dispatcher for the given openapi v3 specifcation. */
const dispatch = oas(document, option)

/**
 * Dispatch the request and get the corresponding route object containing
 * contextual information and dedicated utility methods.
 * See documentation for more details.
 */
const route = dispatch(method, path)
```

### Style and explode

Due to ambiguities in the specification, it is impossible to distinguish a single form exploded object parameter from multiple form not exploded primitive parameters.
Therefore, the caller is left responsible for mapping query and cookie parameters into an object.
For coherence sake, path parameters are also expected to be mapped correctly.

### Content

The content should be parsed and decoded correctly.

## Documentation

See [DOC.md](DOC.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Roadmap

- [debug] add debug message to help dev
- [feature] generator: pattern
- [feature] generator: xml
- [feature] generator: uniqueItems
- [feature] geneartor: nullable
- [feature] validator: nullable
- [feature] generator: proper exclusive min and max
- [feature] generator: use examples
- [feature] coercer: content mediaType (JSON.parse, form, text, ...)
- [feature] coercer: content encoding
- [feature] validator: parameter query allowReserved
- [feature] validator: discrimator
- [feature] validator: deprecated
- [feature] validator: security (apiKey, http, oauth2 and openIdConnect)
- [feature] coercer: response links
- [feature] validator: response links
- [feature] generator: response links
- [feature] coercer: async
- [feature] generator: async
- [feature] validator: async
- [feature] generator: random
