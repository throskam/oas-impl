# OpenAPI Specification Implementation

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

## Documentation

See [DOC.md](DOC.md)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Roadmap

- [feature] validator: security (apiKey, http, oauth2 and openIdConnect)
- [feature] coercer: parameter style
- [feature] coercer: parameter explode
- [feature] coercer: content mediaType (JSON.parse, form, text, ...)
- [feature] coercer: content encoding
- [feature] coercer: response links
- [feature] validator: response links
- [feature] generator: response links
- [feature] validator: parameter query allowReserved
- [feature] validator: discrimator
- [feature] validator: deprecated
