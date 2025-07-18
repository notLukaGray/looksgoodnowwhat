const fs = require('fs');
const https = require('https');
const path = require('path');
const { execSync } = require('child_process');

require('dotenv').config();

const subscriptionKey = process.env.AZURE_SPEECH_KEY;
const region = 'eastus';

// Argument validation
function validateArguments() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error(
      '[FAIL] Usage: npm run audio:generate <chapter-slug> <output-filename>'
    );
    console.error(
      '   Example: npm run audio:generate chapterthree chapterthree-audio.mp3'
    );
    console.error(
      '   Example: npm run audio:generate chapterone chapterone-audio.mp3'
    );
    process.exit(1);
  }

  const [chapterSlug, outputFilename] = args;

  // Validate chapter slug
  if (!chapterSlug || typeof chapterSlug !== 'string') {
    console.error('[FAIL] Invalid chapter slug provided');
    process.exit(1);
  }

  // Validate output filename
  if (!outputFilename || typeof outputFilename !== 'string') {
    console.error('[FAIL] Invalid output filename provided');
    process.exit(1);
  }

  // Check if output filename has .mp3 extension
  if (!outputFilename.endsWith('.mp3')) {
    console.error('[FAIL] Output filename must end with .mp3');
    process.exit(1);
  }

  return { chapterSlug, outputFilename };
}

function extractSectionsFromMarkdown(markdownContent) {
  let content = markdownContent.replace(/^---[\s\S]*?---\s*/, '');

  const headingMatch = content.match(/#\s+(.+)/);
  if (headingMatch) {
    const headingText = headingMatch[1];
    const headingIndex = content.indexOf(`# ${headingText}`);
    content = content.substring(headingIndex);
  }

  const sections = content
    .split(/\n(?=#+\s)/g)
    .map(section => {
      // Remove HTML tags
      section = section.replace(/<[^>]*>/g, '');

      // Remove markdown headers
      section = section.replace(/#{1,6}\s+/g, '');

      // Remove bold formatting (keep content)
      section = section.replace(/\*\*(.*?)\*\*/g, '$1');

      // Remove italic formatting (keep content)
      section = section.replace(/\*(.*?)\*/g, '$1');

      // Remove underscore italic formatting (keep content)
      section = section.replace(/_(.*?)_/g, '$1');

      // Remove code formatting (keep content)
      section = section.replace(/`(.*?)`/g, '$1');

      // Remove links (keep link text)
      section = section.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');

      // Remove images
      section = section.replace(/!\[([^\]]*)\]\([^)]*\)/g, '');

      // Remove any remaining markdown formatting characters
      section = section.replace(/\*\*/g, '');
      section = section.replace(/\*/g, '');
      section = section.replace(/_/g, '');
      section = section.replace(/`/g, '');

      // Clean up extra whitespace
      section = section.replace(/\n\s*\n/g, '\n\n');
      section = section.replace(/\s+/g, ' ');
      section = section.trim();

      return section;
    })
    .filter(Boolean);
  return sections;
}

function generateMP3(text, outputFilename) {
  return new Promise((resolve, reject) => {
    if (!subscriptionKey) {
      reject(new Error('AZURE_SPEECH_KEY not found in environment variables'));
      return;
    }

    const ssml = `<speak version='1.0' xml:lang='en-US'>
            <voice xml:lang='en-US' xml:gender='Male' name='en-US-AlloyTurboMultilingualNeural'>
                ${text}
            </voice>
        </speak>`;
    const options = {
      hostname: `${region}.tts.speech.microsoft.com`,
      path: '/cognitiveservices/v1',
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent': 'YourApp/1.0',
      },
    };
    const req = https.request(options, res => {
      if (res.statusCode === 200) {
        const chunks = [];
        res.on('data', chunk => {
          chunks.push(chunk);
        });
        res.on('end', () => {
          const audioData = Buffer.concat(chunks);
          fs.writeFileSync(outputFilename, audioData);
          resolve();
        });
      } else {
        res.on('data', chunk => {
          console.error(chunk.toString());
        });
        reject(new Error(`HTTP ${res.statusCode}`));
      }
    });
    req.on('error', error => {
      reject(error);
    });
    req.write(ssml);
    req.end();
  });
}

function concatMP3s(mp3Files, outputFile) {
  const listFile = 'mp3list.txt';
  fs.writeFileSync(listFile, mp3Files.map(f => `file '${f}'`).join('\n'));
  execSync(`ffmpeg -y -f concat -safe 0 -i ${listFile} -c copy ${outputFile}`);
  fs.unlinkSync(listFile);
}

async function processMarkdownFile(inputFile, outputFilename) {
  try {
    console.log(`\n Processing: ${inputFile}`);

    // Check if input file exists
    if (!fs.existsSync(inputFile)) {
      throw new Error(`Input file not found: ${inputFile}`);
    }

    const markdownContent = fs.readFileSync(inputFile, 'utf8');
    const sections = extractSectionsFromMarkdown(markdownContent);
    console.log(` Found ${sections.length} sections`);

    if (sections.length === 0) {
      throw new Error('No content sections found in markdown file');
    }

    const tempFiles = [];
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (!section.trim()) continue;

      const tempFile = `temp_section_${i}.mp3`;
      console.log(`[AUDIO] Generating section ${i + 1}/${sections.length}...`);
      await generateMP3(section, tempFile);
      tempFiles.push(tempFile);
    }

    const outputPath = path.join('public', 'vo', outputFilename);
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (tempFiles.length > 0) {
      concatMP3s(tempFiles, outputPath);
      tempFiles.forEach(f => fs.unlinkSync(f));
      console.log(`[PASS] Generated: ${outputPath}`);
    } else {
      throw new Error('No audio sections were generated');
    }
  } catch (error) {
    console.error(`[FAIL] Error processing ${inputFile}:`, error.message);
    throw error;
  }
}

async function main() {
  try {
    console.log(' Starting audio generation...\n');

    const { chapterSlug, outputFilename } = validateArguments();

    // Construct input file path
    const inputFile = `src/content/${chapterSlug}.md`;

    // Validate input file exists
    if (!fs.existsSync(inputFile)) {
      console.error(`[FAIL] Chapter file not found: ${inputFile}`);
      console.error('   Available chapters:');
      const contentDir = 'src/content';
      if (fs.existsSync(contentDir)) {
        const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
        files.forEach(f => console.error(`     - ${f.replace('.md', '')}`));
      }
      process.exit(1);
    }

    await processMarkdownFile(inputFile, outputFilename);

    console.log('\n[SUCCESS] Audio generation complete!');
  } catch (error) {
    console.error('\n[FAIL] Audio generation failed:', error.message);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('\n[FAIL] Unexpected error:', error.message);
  process.exit(1);
});
