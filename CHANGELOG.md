# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [0.3.0](https://github.com/throskam/oas-impl/compare/v0.2.0...v0.3.0) (2019-07-30)


### Bug Fixes

* handle null in deepClone ([5bd4628](https://github.com/throskam/oas-impl/commit/5bd4628))
* handle null in deepMerge ([c0038a5](https://github.com/throskam/oas-impl/commit/c0038a5))
* use toEqual instead of toBe in schema coercer test ([84100ec](https://github.com/throskam/oas-impl/commit/84100ec))


### Features

* handle nullable in schema coercer ([520e3a8](https://github.com/throskam/oas-impl/commit/520e3a8))



# [0.2.0](https://github.com/throskam/oas-impl/compare/v0.1.0...v0.2.0) (2019-05-04)


### Bug Fixes

* use expected content generator ([db81f12](https://github.com/throskam/oas-impl/commit/db81f12))


### Features

* add custom format ([342c034](https://github.com/throskam/oas-impl/commit/342c034))
* change default in responses generator ([be00644](https://github.com/throskam/oas-impl/commit/be00644))
* move implementation into the route itself ([f17e888](https://github.com/throskam/oas-impl/commit/f17e888))


### BREAKING CHANGES

* responses generator will no longer use the first
status code as default if no wildcard or default are defined
* custom generators are now defined in the format option
* only export the dispatch method, move the rest to the
route instance



# 0.1.0 (2019-03-13)
