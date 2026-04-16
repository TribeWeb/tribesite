#!/usr/bin/env node
/**
 * Migrates audio/video frontmatter from plain string URLs to nested objects.
 * audio: "url" → audio:\n  spotify|soundcloud|apple|other: "url"
 * video: "url" → video:\n  youtube|vimeo|other: "url"
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'

const LYRICS_DIR = new URL('../content/lyrics', import.meta.url).pathname

function detectAudioService(url) {
  if (!url) return null
  if (url.includes('spotify.com')) return 'spotify'
  if (url.includes('soundcloud.com')) return 'soundcloud'
  if (url.includes('music.apple.com') || url.includes('itunes.apple.com')) return 'apple'
  return 'other'
}

function detectVideoService(url) {
  if (!url) return null
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
  if (url.includes('vimeo.com')) return 'vimeo'
  return 'other'
}

function parseYamlString(value) {
  // Handle quoted strings like "https://..." or unquoted
  const trimmed = value.trim()
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function migrateFrontmatter(content, filename) {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!fmMatch) return { content, changed: false }

  const fmRaw = fmMatch[1]
  const lines = fmRaw.split('\n')
  const newLines = []
  let changed = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    const audioMatch = line.match(/^audio:\s*(.+)$/)
    if (audioMatch) {
      const url = parseYamlString(audioMatch[1])
      if (!url) {
        // Empty audio — omit it
        changed = true
        continue
      }
      const service = detectAudioService(url)
      newLines.push(`audio:`)
      newLines.push(`  ${service}: "${url}"`)
      changed = true
      continue
    }

    const videoMatch = line.match(/^video:\s*(.+)$/)
    if (videoMatch) {
      const url = parseYamlString(videoMatch[1])
      if (!url) {
        // Empty video — omit it
        changed = true
        continue
      }
      const service = detectVideoService(url)
      newLines.push(`video:`)
      newLines.push(`  ${service}: "${url}"`)
      changed = true
      continue
    }

    newLines.push(line)
  }

  if (!changed) return { content, changed: false }

  const newFm = newLines.join('\n')
  const newContent = content.replace(/^---\n[\s\S]*?\n---/, `---\n${newFm}\n---`)
  return { content: newContent, changed: true }
}

const files = readdirSync(LYRICS_DIR).filter(f => f.endsWith('.md'))
let migratedCount = 0

for (const file of files) {
  const filePath = join(LYRICS_DIR, file)
  const original = readFileSync(filePath, 'utf8')
  const { content: migrated, changed } = migrateFrontmatter(original, file)
  if (changed) {
    writeFileSync(filePath, migrated, 'utf8')
    migratedCount++
    console.log(`✓ ${file}`)
  }
}

console.log(`\nMigrated ${migratedCount} of ${files.length} files.`)
