// Pré-renderiza a página no build: injeta o HTML do React dentro de dist/index.html.
import { readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const htmlPath = resolve('dist/index.html')
const { render } = await import(pathToFileURL(resolve('node_modules/.cache/ssr/entry-server.js')).href)

const html = readFileSync(htmlPath, 'utf-8')
if (!html.includes('<div id="root"></div>')) throw new Error('Não encontrei <div id="root"></div> em dist/index.html')
writeFileSync(htmlPath, html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`))
console.log('✓ HTML pré-renderizado em dist/index.html')
