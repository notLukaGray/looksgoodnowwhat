const fs = require('fs');
const https = require('https');
const path = require('path');
const { execSync } = require('child_process');

require('dotenv').config();

const subscriptionKey = process.env.AZURE_SPEECH_KEY;
const region = 'eastus';

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

      section = section.replace(/#{1,6}\s+/g, '');
      section = section.replace(/\*\*(.*?)\*\*/g, '$1');
      section = section.replace(/\*(.*?)\*/g, '$1');
      section = section.replace(/`(.*?)`/g, '$1');
      section = section.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
      section = section.replace(/!\[([^\]]*)\]\([^)]*\)/g, '');
      section = section.replace(/\n\s*\n/g, '\n\n');
      section = section.trim();
      return section;
    })
    .filter(Boolean);
  return sections;
}

function generateMP3(text, outputFilename) {
  return new Promise((resolve, reject) => {
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
    console.log(`\n📖 Processing: ${inputFile}`);
    const markdownContent = fs.readFileSync(inputFile, 'utf8');
    const sections = extractSectionsFromMarkdown(markdownContent);
    console.log(`📝 Found ${sections.length} sections`);
    const tempFiles = [];
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const tempFile = `temp_section_${i}.mp3`;
      console.log(`🔊 Generating section ${i + 1}/${sections.length}...`);
      await generateMP3(section, tempFile);
      tempFiles.push(tempFile);
    }

    const outputPath = path.join('public', 'vo', outputFilename);
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    concatMP3s(tempFiles, outputPath);

    tempFiles.forEach(f => fs.unlinkSync(f));
    console.log(`✅ Generated: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error processing ${inputFile}:`, error.message);
  }
}

async function main() {
  console.log('🎙️ Starting audio generation...\n');
  await processMarkdownFile(
    'src/content/chaptertwo.md',
    'chaptertwo-audio.mp3'
  );
  console.log('\n🎉 Audio generation complete!');
}

main().catch(console.error);
