const fs = require('fs');
const https = require('https');
const path = require('path');
const { execSync } = require('child_process');

require('dotenv').config();

const subscriptionKey = process.env.AZURE_SPEECH_KEY;
const region = 'eastus';

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

  if (!chapterSlug || typeof chapterSlug !== 'string') {
    console.error('[FAIL] Invalid chapter slug provided');
    process.exit(1);
  }

  if (!outputFilename || typeof outputFilename !== 'string') {
    console.error('[FAIL] Invalid output filename provided');
    process.exit(1);
  }

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
      section = section.replace(/<[^>]*>/g, '');

      section = section.replace(
        /^(#{1,6})\s+(.+)/gm,
        (match, hashes, title) => {
          const level = hashes.length;
          return `§HEADING${level}§${title}§ENDHEADING§`;
        }
      );

      section = section.replace(/\*\*(.*?)\*\*/g, '§EMPHASIS§$1§ENDEMPH§');

      section = section.replace(/\*(.*?)\*/g, '§EMPHASIS§$1§ENDEMPH§');

      section = section.replace(/_(.*?)_/g, '$1');

      section = section.replace(/`(.*?)`/g, '$1');

      section = section.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');

      section = section.replace(/!\[([^\]]*)\]\([^)]*\)/g, '');

      section = section.replace(/\*\*/g, '');
      section = section.replace(/\*/g, '');
      section = section.replace(/_/g, '');
      section = section.replace(/`/g, '');

      section = section.replace(/\n\s*\n/g, '\n\n');
      section = section.replace(/\s+/g, ' ');
      section = section.trim();

      return section;
    })
    .filter(Boolean);
  return sections;
}

function addSSMLPauses(text, isFirstSection = false) {
  text = text.replace(/<[^>]*>/g, '');

  text = text.replace(/\*\*/g, '');
  text = text.replace(/\*/g, '');
  text = text.replace(/_/g, '');
  text = text.replace(/`/g, '');

  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');

  const quoteMarkers = [];
  text = text.replace(/"([^"]*)"/g, (match, content) => {
    const marker = `__QUOTE_${quoteMarkers.length}__`;
    quoteMarkers.push(content);
    return marker;
  });

  text = text.replace(/(,)/g, '$1<break time="0.15s"/>');
  text = text.replace(/(;)/g, '$1<break time="0.25s"/>');
  text = text.replace(/(:)/g, '$1<break time="0.2s"/>');

  // Fix author name spacing and citations
  text = text.replace(
    /\b(April Dunford|Richard Buchanan|Donald Schön|Ben Terrett|Fernando Machado|Debbie Millman|Vanessa Reyes)\b(?=\s+[A-Z])/g,
    '$1<break time="0.8s"/>'
  );

  // Fix "Robin Mathew" spacing issue specifically
  text = text.replace(
    /Robin Mathew(?=\s+[A-Z])/g,
    'Robin Mathew<break time="0.8s"/>'
  );

  // More conservative name detection - only for clear author citations
  text = text.replace(
    /\b([A-Z][a-z]+ [A-Z][a-z]+)(?=\s+(?:said|explained|noted|stated|summed|called))/g,
    '$1<break time="0.6s"/>'
  );

  // Remove web artifacts that shouldn't be spoken
  text = text.replace(/\bSource\b(?=\s)/g, '');
  text = text.replace(/\bTakeaway\b(?=\s*:)/g, 'Key insight');

  // Fix number formatting for natural speech
  text = text.replace(/(\d+),(\d{3})/g, '$1 thousand $2'); // "2,000" -> "2 thousand"
  text = text.replace(/(\d+) thousand 000/g, '$1 thousand'); // Fix "2 thousand 000" -> "2 thousand"

  // Handle preserved emphasis markers from markdown first
  text = text.replace(
    /§EMPHASIS§(.+?)§ENDEMPH§/g,
    '<emphasis level="moderate">$1</emphasis>'
  );

  // Core design terms section removed - was causing emphasis conflicts and nesting issues

  // Clean up any nested emphasis tags (multiple passes to catch all nesting)
  let prevText = '';
  while (prevText !== text) {
    prevText = text;
    // Remove nested emphasis tags - most aggressive patterns first
    text = text.replace(
      /<emphasis level="moderate"><emphasis level="moderate">([^<]*)<\/emphasis>\s*<emphasis level="moderate">([^<]*)<\/emphasis><\/emphasis>/g,
      '<emphasis level="moderate">$1 $2</emphasis>'
    );
    text = text.replace(
      /<emphasis level="moderate">([^<]*)<emphasis level="moderate">([^<]*)<\/emphasis>([^<]*)<\/emphasis>/g,
      '<emphasis level="moderate">$1$2$3</emphasis>'
    );
    text = text.replace(
      /<emphasis level="moderate">([^<]*?)<emphasis level="moderate">([^<]*?)<\/emphasis>([^<]*?)<\/emphasis>/g,
      '<emphasis level="moderate">$1$2$3</emphasis>'
    );
    // Clean up adjacent emphasis tags
    text = text.replace(/<\/emphasis>\s*<emphasis level="moderate">/g, ' ');
    text = text.replace(/<\/emphasis><emphasis level="moderate">/g, ' ');
  }

  // Final cleanup: ensure no double emphasis on same words
  text = text.replace(
    /<emphasis level="moderate">([^<]+)<\/emphasis>\s*<emphasis level="moderate">\1<\/emphasis>/g,
    '<emphasis level="moderate">$1</emphasis>'
  );

  // Fix list formatting - add proper breaks for bullet points
  text = text.replace(/\s*-\s+([A-Z])/g, '<break time="0.4s"/>$1');

  // Fix spacing after periods that got mangled
  text = text.replace(/\.([A-Z])/g, '.<break time="0.3s"/> $1');

  // Add breaks between sentences for better flow
  text = text.replace(/([.!])\s+([A-Z])/g, '$1<break time="0.3s"/> $2');

  // Comprehensive cleanup of duplicate/redundant elements

  // Clean up multiple consecutive breaks
  text = text.replace(
    /<break time="[^"]*"\/>\s*<break time="[^"]*"\/>/g,
    '<break time="0.3s"/>'
  );
  text = text.replace(
    /<break time="0\.3s"\/>\s*<break time="0\.3s"\/>/g,
    '<break time="0.3s"/>'
  );
  text = text.replace(
    /<break time="0\.15s"\/>\s*<break time="0\.15s"\/>/g,
    '<break time="0.15s"/>'
  );

  // Remove breaks that are too close together
  text = text.replace(
    /<break time="[^"]*"\/>\s*,\s*<break time="[^"]*"\/>/g,
    ',<break time="0.15s"/>'
  );

  // Clean up spacing issues
  text = text.replace(/\s+/g, ' '); // Multiple spaces to single
  text = text.replace(/\s*<break/g, '<break'); // No space before breaks
  text = text.replace(/\/>\s+/g, '/> '); // Single space after breaks

  // Fix number formatting issues consistently for natural speech
  text = text.replace(/2,000/g, 'two thousand');
  text = text.replace(/24 hours/g, 'twenty-four hours');
  text = text.replace(/2012/g, 'twenty twelve');
  text = text.replace(/2010/g, 'twenty ten');
  text = text.replace(/2013/g, 'twenty thirteen');
  text = text.replace(/2018/g, 'twenty eighteen');
  text = text.replace(/2021/g, 'twenty twenty-one');
  text = text.replace(/1969/g, 'nineteen sixty-nine');

  // Fix specific author spacing issues
  text = text.replace(/Ben Terrett(?=<break)/g, 'Ben Terrett ');
  text = text.replace(/Fernando Machado(?=<break)/g, 'Fernando Machado ');
  text = text.replace(/Vanessa Reyes(?=<break)/g, 'Vanessa Reyes ');

  // Final validation: ensure no malformed SSML
  text = text.replace(/<emphasis[^>]*><\/emphasis>/g, ''); // Empty emphasis tags
  text = text.replace(/<break[^>]*><break[^>]*\/>/g, '<break time="0.3s"/>'); // Duplicate breaks

  // Critical fixes for Azure TTS compatibility

  // Fix missing spaces around emphasis tags (be careful not to break the attributes)
  text = text.replace(/([a-z])(<emphasis level="moderate">)/g, '$1 $2');
  text = text.replace(/(<\/emphasis>)([a-z])/gi, '$1 $2');

  // Fix missing spaces around quotes
  text = text.replace(/([a-z])"([A-Z])/g, '$1" $2');
  text = text.replace(/"([a-z])/g, '" $1');

  // Fix breaks inside emphasis (Azure TTS doesn't like this)
  text = text.replace(
    /<emphasis level="moderate">([^<]*)<break[^>]*\/>([^<]*)<\/emphasis>/g,
    '<emphasis level="moderate">$1</emphasis><break time="0.2s"/><emphasis level="moderate">$2</emphasis>'
  );

  // Clean up any double spaces created by fixes
  text = text.replace(/\s{2,}/g, ' ');

  // Fix any malformed emphasis attributes that may have been created
  text = text.replace(
    /<emphasis level="\s+moderate">/g,
    '<emphasis level="moderate">'
  );
  text = text.replace(
    /<emphasis level="moderate\s+">/g,
    '<emphasis level="moderate">'
  );

  quoteMarkers.forEach((content, index) => {
    text = text.replace(
      `__QUOTE_${index}__`,
      `<emphasis level="moderate">"${content}"</emphasis>`
    );
  });

  // Add emphasis to headings that end with colons, but don't add breaks to them
  text = text.replace(
    /([^.!?]*:)(\n|$)/g,
    '<emphasis level="strong">$1</emphasis>$2'
  );

  // Handle headings with preserved structure
  text = text.replace(
    /§HEADING(\d+)§(.+?)§ENDHEADING§/g,
    (match, level, title) => {
      const levelNum = parseInt(level);

      if (levelNum === 1) {
        // Main title (H1) - treat as single unit with emphasis, then pause
        return `<emphasis level="moderate">${title}</emphasis><break time="1.2s"/>`;
      } else if (levelNum === 2) {
        // Section heading (H2) - add pauses before and after
        return `<break time="0.8s"/>${title}<break time="0.6s"/>`;
      } else {
        // Subsection (H3+) - shorter pauses
        return `<break time="0.4s"/>${title}<break time="0.3s"/>`;
      }
    }
  );

  text = text.replace(/\n\s*[-•*]\s/g, '<break time="0.4s"/>\n• ');

  text = text.replace(/\n\s*\d+\.\s/g, '<break time="0.4s"/>\n1. ');

  text = text.replace(/\n\n/g, '<break time="0.6s"/>\n\n<break time="0.6s"/>');

  text = text.replace(/<break[^>]*>\s*<break[^>]*>/g, '<break time="0.3s"/>');

  text = text.replace(/[^\x00-\x7F]/g, '');

  text = text.replace(/\s+/g, ' ');

  return text;
}

function generateMP3(text, outputFilename, isFirstSection = false) {
  return new Promise((resolve, reject) => {
    if (!subscriptionKey) {
      reject(new Error('AZURE_SPEECH_KEY not found in environment variables'));
      return;
    }

    const enhancedText = addSSMLPauses(text, isFirstSection);

    const ssml = `<speak version='1.0' xml:lang='en-US'>
            <voice xml:lang='en-US' xml:gender='Male' name='en-US-AlloyTurboMultilingualNeural'>
                ${enhancedText}
            </voice>
        </speak>`;

    if (process.env.DEBUG_SSML) {
      console.log('Full SSML:');
      console.log(ssml);
      console.log('--- End SSML ---');
    }

    if (process.env.DEBUG_SSML_FILE) {
      const separator = '\n\n<!-- ===== SECTION SEPARATOR ===== -->\n\n';
      if (fs.existsSync(process.env.DEBUG_SSML_FILE)) {
        fs.appendFileSync(process.env.DEBUG_SSML_FILE, separator + ssml);
      } else {
        fs.writeFileSync(process.env.DEBUG_SSML_FILE, ssml);
      }
      console.log(`SSML written to: ${process.env.DEBUG_SSML_FILE}`);
      resolve();
      return;
    }

    const options = {
      hostname: `${region}.tts.speech.microsoft.com`,
      path: '/cognitiveservices/v1',
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent': 'YourApp/1.0',
        'Cache-Control': 'no-cache',
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
        let errorData = '';
        res.on('data', chunk => {
          errorData += chunk.toString();
        });
        res.on('end', () => {
          console.error('Azure TTS Error Response:', errorData);
          reject(new Error(`HTTP ${res.statusCode}: ${errorData}`));
        });
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

    const inputFile = `src/content/${chapterSlug}.md`;

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
