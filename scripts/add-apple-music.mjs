#!/usr/bin/env node
/**
 * Adds audio.apple frontmatter links to CMF lyrics files.
 * Run with: node scripts/add-apple-music.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const LYRICS_DIR = join(process.cwd(), 'content/lyrics')

const appleLinks = {
  'behold-the-lord': 'https://music.apple.com/us/album/behold-the-lord/1473111487?i=1473111778',
  'dimensional-war': 'https://music.apple.com/us/album/dimensional-war-post-ggpe/1608695618?i=1608695623',
  'eternal-praise': 'https://music.apple.com/us/album/eternal-praise/1484692093?i=1484692113',
  'exceeding-great-reward': 'https://music.apple.com/us/album/exceeding-great-reward/1484692093?i=1484692097',
  'forever': 'https://music.apple.com/us/album/forever/1527314830?i=1527314846',
  'glory-to-the-lamb': 'https://music.apple.com/us/album/glory-to-the-lamb/1482323338?i=1482323343',
  'high-and-lifted-up': 'https://music.apple.com/us/album/high-and-lifted-up/1765413659?i=1765413663',
  'holy-holy': 'https://music.apple.com/us/album/holy-holy-feat-davidic-signature-kingdom-life-advancement/1377975542?i=1377976073',
  'holy-partnership': 'https://music.apple.com/us/album/holy-partnership/1484692093?i=1484692096',
  'i-worship-you': 'https://music.apple.com/us/album/i-worship-you-feat-the-community-davidic-signature/1377975542?i=1377975988',
  'joyous-war': 'https://music.apple.com/us/album/joyous-war/1608695618?i=1608695624',
  'majestic': 'https://music.apple.com/us/album/majestic/1608695618?i=1608695635',
  'no-one-like-you': 'https://music.apple.com/us/album/no-one-like-you/1527314830?i=1527314843',
  'raise-a-banner': 'https://music.apple.com/us/album/raise-a-banner-feat-jon-williams/1273282217?i=1273282748',
  'rest-on-us': 'https://music.apple.com/us/album/rest-on-us-feat-davidic-signature-kingdom-life-advancement/1377975542?i=1377975990',
  'son-of-god': 'https://music.apple.com/us/album/son-of-god/1765413659?i=1765413666',
  'sovereign': 'https://music.apple.com/us/album/sovereign/1484692093?i=1484692099',
  'sovereign-god': 'https://music.apple.com/us/album/sovereign-god/1484685078?i=1484685090',
  'the-path': 'https://music.apple.com/us/album/the-path-feat-davidic-signature-kingdom-life/1377975542?i=1377976083',
  'unchallenged': 'https://music.apple.com/us/album/unchallenged/1484692093?i=1484692103',
  'we-honour-you': 'https://music.apple.com/us/album/we-honour-you/1484692093?i=1484692115',
  'we-magnify-you': 'https://music.apple.com/us/album/we-magnify-you/1473111487?i=1473111503',
  'we-praise-your-name': 'https://music.apple.com/us/album/we-praise-your-name-feat-inuka-band-kingdom-life-advancement/1377975542?i=1377976064',
  'we-rise': 'https://music.apple.com/us/album/we-rise/1765413659?i=1765413661',
  'we-will-praise-you': 'https://music.apple.com/us/album/we-will-praise-you/1484685078?i=1484685088',
}

let updated = 0
let skipped = 0

for (const [slug, appleUrl] of Object.entries(appleLinks)) {
  const filePath = join(LYRICS_DIR, `${slug}.md`)
  let content
  try {
    content = readFileSync(filePath, 'utf8')
  } catch {
    console.warn(`  MISSING: ${slug}.md`)
    skipped++
    continue
  }

  // Check if apple link already exists
  if (content.includes('apple:')) {
    console.log(`  SKIP (already has apple): ${slug}.md`)
    skipped++
    continue
  }

  // Find the audio block and insert the apple line after soundcloud/spotify/other existing line
  // Pattern: find last audio child line and add apple after it
  const audioBlockRegex = /(audio:\n(?:  (?:spotify|soundcloud|other): "[^"]*"\n)+)/
  const match = content.match(audioBlockRegex)

  if (!match) {
    console.warn(`  NO AUDIO BLOCK: ${slug}.md`)
    skipped++
    continue
  }

  const originalBlock = match[1]
  // Remove trailing newline, add apple line, re-add newline
  const newBlock = originalBlock.trimEnd() + `\n  apple: "${appleUrl}"\n`
  const newContent = content.replace(originalBlock, newBlock)

  writeFileSync(filePath, newContent, 'utf8')
  console.log(`  UPDATED: ${slug}.md`)
  updated++
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped.`)
