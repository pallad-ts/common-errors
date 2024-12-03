<div align="center">
	<h1>common-errors</h1>
</div>

---
[![CircleCI](https://circleci.com/gh/pallad-ts/common-errors/tree/master.svg?style=svg)](https://circleci.com/gh/pallad-ts/common-errors/tree/master)
[![npm version](https://badge.fury.io/js/@pallad%2Fcommon-errors.svg)](https://badge.fury.io/js/@pallad%2Fcommon-errors)
[![Coverage Status](https://coveralls.io/repos/github/pallad-ts/common-errors/badge.svg?branch=master)](https://coveralls.io/github/pallad-ts/common-errors?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
---

Small set of commonly used errors. Carefully designed and battle tested so you don't need to do it.

# Installation

```shell
npm install @pallad/common-errors
```

# Common api

All errors assume that `code` property might be set for an error. 
`code` is used to uniquely specify what error is being thrown.

# Errors
* [ApplicationError](blob/master/src/ApplicationError.ts)
* [AuthenticationError](blob/master/src/AuthenticationError.ts)
* [AuthorizationError](blob/master/src/AuthorizationError.ts)
* [ConflictErrpr](blob/master/src/ConflictErrpr.ts)
* [InternalError](blob/master/src/InternalError.ts)
* [LimitExceededError](blob/master/src/LimitExceededError.ts)
* [NotFoundError](blob/master/src/NotFoundError.ts)
* [TimeoutError](blob/master/src/TimeoutError.ts)
