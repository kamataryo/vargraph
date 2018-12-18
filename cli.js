#!/usr/bin/env node

const vargraph = require('./')
const fs = require('fs')
const path = require('path')

const filename = process.argv[2]
const code = fs.readFileSync(path.join(__dirname, filename)).toString('utf-8')

const result = vargraph(code)
process.stdout.write(JSON.stringify(result))
