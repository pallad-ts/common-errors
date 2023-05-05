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

## ApplicationError
The most common kind of error. Should be used only if other type of errors do not fit.

```typescript
import {ApplicationError} from "@pallad/common-errors";

function publishArticle(id: string) {
    const article = findById(id);
    if (article?.status === 'published') {
        throw new ApplicationError('Cannot publish article that is already published');
    }
}
```

## AuthenticationError

Indicates lack of ability to verify who is the participant performing an operation

```typescript
import {AuthenticationError} from '@pallad/common-errors';

function activateAccount(token: string) {
    if (!verifyToken(token)) {
        throw new AuthenticationError('Invalid token');
    }
}
```

## AuthorizationError
Indicates lack of certain permissions to perform an operation

```typescript
import {AuthorizationError} from '@pallad/common-errors';

function deleteArticle(participant: Participant, id: string) {
    const article = findById(id);
    if (!hasPermission(article, participant)) {
        throw new AuthorizationError('Invalid token');
    }
}
```

// TODO
