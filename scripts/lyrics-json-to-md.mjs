import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import { join, basename, extname } from 'path'

const INPUT_DIR = new URL('../content/apps/lyrics', import.meta.url).pathname
const OUTPUT_DIR = new URL('../content/apps/lyricsMdFiles', import.meta.url).pathname

const lyricSections = {
  verse1: { sectionTitle: 'Verse 1' },
  verse2: { sectionTitle: 'Verse 2' },
  verse3: { sectionTitle: 'Verse 3' },
  verse4: { sectionTitle: 'Verse 4' },
  verse5: { sectionTitle: 'Verse 5' },
  prechorus1: { sectionTitle: 'Prechorus 1' },
  prechorus2: { sectionTitle: 'Prechorus 2' },
  chorus1: { sectionTitle: 'Chorus 1' },
  chorus2: { sectionTitle: 'Chorus 2' },
  chorus3: { sectionTitle: 'Chorus 3' },
  chorus4: { sectionTitle: 'Chorus 4' },
  bridge1: { sectionTitle: 'Bridge 1' },
  bridge2: { sectionTitle: 'Bridge 2' },
}

const lyricKeys = new Set(Object.keys(lyricSections))

function toFrontmatterValue(value) {
  if (typeof value !== 'string') return String(value)
  // Quote strings that contain special YAML characters
  if (value === '') return '""'
  if (/[:#\[\]{},|>&*!'"@%`]/.test(value) || value.includes('\n')) {
    return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
  }
  return value
}

function buildMarkdown(data) {
  const frontmatterLines = ['---']
  const bodyParts = []

  // Separate frontmatter keys from lyric section keys
  for (const [key, value] of Object.entries(data)) {
    if (lyricKeys.has(key)) {
      // Only add non-empty sections to the body
      if (value && typeof value === 'string' && value.trim()) {
        const section = lyricSections[key]
        bodyParts.push(`## ${section.sectionTitle}\n\n${value}`)
      }
    } else {
      frontmatterLines.push(`${key}: ${toFrontmatterValue(value)}`)
    }
  }

  frontmatterLines.push('---')

  const frontmatter = frontmatterLines.join('\n')
  const body = bodyParts.join('\n\n')

  return body ? `${frontmatter}\n\n${body}\n` : `${frontmatter}\n`
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  const files = await readdir(INPUT_DIR)
  const jsonFiles = files.filter(f => extname(f) === '.json')

  let converted = 0
  for (const file of jsonFiles) {
    const stem = basename(file, '.json')
    const inputPath = join(INPUT_DIR, file)
    const outputPath = join(OUTPUT_DIR, `${stem}.md`)

    const raw = await readFile(inputPath, 'utf8')
    const data = JSON.parse(raw)
    const markdown = buildMarkdown(data)

    await writeFile(outputPath, markdown, 'utf8')
    console.log(`✓ ${file} → ${stem}.md`)
    converted++
  }

  console.log(`\nDone. Converted ${converted} file(s).`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
