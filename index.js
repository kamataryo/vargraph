const parser = require('@babel/parser')
const { default: traverse } = require('@babel/traverse')

module.exports = code => {
  const ast = parser.parse(code, { allowImportExportEverywhere: true })

  const graph = {}

  let variableDeclaration = false
  traverse(ast, {
    enter(path) {
      if (path.node.type === 'VariableDeclaration') {
        variableDeclaration = path.node
      } else if (
        path.node.type === 'Identifier' &&
        variableDeclaration.declarations &&
        variableDeclaration.declarations[0].id
      ) {
        const to = variableDeclaration.declarations[0].id.name
        const from = path.node.name
        if (to !== from && to !== void 0 && from !== void 0) {
          graph[from]
            ? graph[from].incomes.push(to)
            : (graph[from] = { incomes: [to], outcomes: [] })
          graph[to]
            ? graph[to].outcomes.push(from)
            : (graph[to] = { incomes: [], outcomes: [from] })
        }
      }
    }
  })

  Object.keys(graph).forEach(name => {
    graph[name].incomes = graph[name].incomes.filter(
      (income, i, incomes) => incomes.indexOf(income) === i
    )
    graph[name].outcomes = graph[name].outcomes.filter(
      (outcome, i, outcomes) => outcomes.indexOf(outcome) === i
    )
  })

  return graph
}
