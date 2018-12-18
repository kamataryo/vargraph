# @kamataryo/vargraph

An simple JavaScript variable analyzer.

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
