import assert from 'node:assert/strict'
import { existsSync, readFileSync, realpathSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'))

test('두 마켓플레이스가 같은 맵시 플러그인을 배포한다', () => {
  const claudeMarket = readJson(join(root, '.claude-plugin/marketplace.json'))
  const codexMarket = readJson(join(root, '.agents/plugins/marketplace.json'))
  const claudePackage = claudeMarket.plugins.find(({ name }) => name === 'maepsi')
  const codexPackage = codexMarket.plugins.find(({ name }) => name === 'maepsi')

  assert.ok(claudePackage)
  assert.ok(codexPackage)
  assert.equal(claudeMarket.name, codexMarket.name)

  const claudeRoot = realpathSync(join(root, claudePackage.source))
  const codexRoot = realpathSync(join(root, codexPackage.source.path))
  assert.equal(claudeRoot, codexRoot)

  const claude = readJson(join(claudeRoot, '.claude-plugin/plugin.json'))
  const codex = readJson(join(codexRoot, 'plugin.json'))
  assert.deepEqual([claude.name, claude.version], [codex.name, codex.version])
  assert.equal(claude.name, 'maepsi')
  assert.ok(existsSync(join(claudeRoot, 'skills/setup/SKILL.md')))
  assert.ok(existsSync(join(claudeRoot, 'skills/document/SKILL.md')))
  assert.ok(existsSync(join(claudeRoot, 'skills/lint/SKILL.md')))
})
