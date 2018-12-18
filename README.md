# @kamataryo/vargraph

[![Build Status](https://travis-ci.org/kamataryo/vargraph.svg?branch=master)](https://travis-ci.org/kamataryo/vargraph)
A simple JavaScript variable analyzer.

# usage

## JavaScript library

```javascript
import vargraph from '@kamataryo/vargraph'

const code = `
  const a = 1
  const b = a + 1
`

vargraph(code)
// {
//   a: { incomes: ['b'], outcomes: [] },
//   b: { incomes: [], outcomes: ['a'] }
// }
```

## CLI

```shell
$ npx @kamataryo/vargraph path/to/code.js
```
