import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const lyricsDir = join(process.cwd(), 'content/lyrics')

// Songs to add full video.youtube block (no existing video block)
const addVideoBlock = [
  { file: 'dimensional-war.md', youtubeId: '1J-oNiVlVE4' },
  { file: 'eternal-praise.md', youtubeId: 'nE9NkPHreG8' },
  { file: 'exceeding-great-reward.md', youtubeId: 'VNgbCyr17uY' },
  { file: 'forever.md', youtubeId: 'gWqe9Mdj--M' },
  { file: 'glory-to-the-lamb.md', youtubeId: 'uuDyXFZeSEQ' },
  { file: 'holy-partnership.md', youtubeId: 'ueFfq1Q8oWk' },
  { file: 'i-worship-you.md', youtubeId: '6oNdT2q9iQs' },
  { file: 'joyous-war.md', youtubeId: '7k1CyGGKL3A' },
  { file: 'majestic.md', youtubeId: 'KpaA4pFOljA' },
  { file: 'no-one-like-you.md', youtubeId: 'EUkdXRRdFDg' },
  { file: 'raise-a-banner.md', youtubeId: 'Am76nMQ7UN8' },
  { file: 'rest-on-us.md', youtubeId: 'tp-puRpFgt0' },
  { file: 'sovereign.md', youtubeId: 'blAjc4QQcf8' },
  { file: 'sovereign-god.md', youtubeId: 'nxsIp8-uC4M' },
  { file: 'the-path.md', youtubeId: 'RIyHNCOcgQw' },
  { file: 'unchallenged.md', youtubeId: 'NE7KktUh520' },
  { file: 'we-honour-you.md', youtubeId: 'Fyt8WR-7QQ0' },
  { file: 'we-magnify-you.md', youtubeId: 'WWU5TqSMjco' },
  { file: 'we-rise.md', youtubeId: 'soWTbdJSvCU' },
  { file: 'we-will-praise-you.md', youtubeId: 'FvnGpjp1FzA' },
]

// Songs with existing video block — add youtube: inside it
const addInsideVideoBlock = [
  { file: 'high-and-lifted-up.md', youtubeId: 'QV24au7EV7s' },
]

let updated = 0
let skipped = 0

// Process files that need a new video block inserted after the audio block
for (const { file, youtubeId } of addVideoBlock) {
  const filePath = join(lyricsDir, file)
  let content
  try {
    content = readFileSync(filePath, 'utf-8')
  } catch {
    console.log(`SKIP (not found): ${file}`)
    skipped++
    continue
  }

  // Check if video block already exists
  if (/^video:/m.test(content)) {
    // If youtube key already exists inside video block, skip
    if (/^\s+youtube:/m.test(content)) {
      console.log(`SKIP (youtube already set): ${file}`)
      skipped++
      continue
    }
    // Has video block but no youtube — add youtube as first key
    const newContent = content.replace(/^(video:\s*\n)/m, `$1  youtube: "https://www.youtube.com/watch?v=${youtubeId}"\n`)
    writeFileSync(filePath, newContent, 'utf-8')
    console.log(`UPDATED (added youtube to video block): ${file}`)
    updated++
    continue
  }

  // No video block — insert after the last line of the audio block
  // Find the end of the audio block by looking for the next top-level key after audio:
  const lines = content.split('\n')
  let inAudio = false
  let insertAfter = -1

  for (let i = 0; i < lines.length; i++) {
    if (/^audio:/.test(lines[i])) {
      inAudio = true
      continue
    }
    if (inAudio) {
      // End of audio block is when we hit a non-indented, non-empty line that isn't audio
      if (lines[i].length > 0 && !/^\s/.test(lines[i])) {
        insertAfter = i - 1
        break
      }
    }
  }

  if (insertAfter === -1) {
    console.log(`SKIP (couldn't find audio block end): ${file}`)
    skipped++
    continue
  }

  const videoBlock = `video:\n  youtube: "https://www.youtube.com/watch?v=${youtubeId}"`
  lines.splice(insertAfter + 1, 0, videoBlock)
  writeFileSync(filePath, lines.join('\n'), 'utf-8')
  console.log(`UPDATED (added video block): ${file}`)
  updated++
}

// Process files with existing video block needing youtube: added inside
for (const { file, youtubeId } of addInsideVideoBlock) {
  const filePath = join(lyricsDir, file)
  let content
  try {
    content = readFileSync(filePath, 'utf-8')
  } catch {
    console.log(`SKIP (not found): ${file}`)
    skipped++
    continue
  }

  if (/^\s+youtube:/m.test(content)) {
    console.log(`SKIP (youtube already set): ${file}`)
    skipped++
    continue
  }

  // Insert youtube: as first key inside video block
  const newContent = content.replace(/^(video:\s*\n)/m, `$1  youtube: "https://www.youtube.com/watch?v=${youtubeId}"\n`)
  writeFileSync(filePath, newContent, 'utf-8')
  console.log(`UPDATED (added youtube to existing video block): ${file}`)
  updated++
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped`)
