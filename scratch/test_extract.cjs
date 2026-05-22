const fs = require('fs');
const path = require('path');

const pyScriptPath = path.join(__dirname, 'generate_all_pages.py');
const pyCode = fs.readFileSync(pyScriptPath, 'utf8');

function extractStringLiteralBlock(varName) {
    const regex = new RegExp(`${varName}\\s*=\\s*f?"""([\\s\\S]*?)"""`, 'm');
    const match = pyCode.match(regex);
    if (!match) {
        throw new Error(`String block ${varName} not found in python script`);
    }
    let block = match[1];
    
    // Convert python string formatting to JS template formatting
    // Replace {header_content} with ${header_content} and {footer_content} with ${footer_content}
    // Also replace {partners_marquee_html} with ${partners_marquee_html}
    block = block.replace(/{header_content}/g, '${header_content}')
                 .replace(/{footer_content}/g, '${footer_content}')
                 .replace(/{partners_marquee_html}/g, '${partners_marquee_html}');
                 
    return block;
}

const header_content = '<header></header>';
const footer_content = '<footer></footer>';
const partners_marquee_html = '<div></div>';

['about_html', 'mission_html', 'leadership_html', 'industries_html', 'careers_html', 'contact_html'].forEach(name => {
    try {
        const tmpl = extractStringLiteralBlock(name);
        // Let's escape backticks in the template string to prevent premature closing of backtick string
        const escapedTmpl = tmpl.replace(/`/g, '\\`').replace(/\${(?!header_content|footer_content|partners_marquee_html)/g, '\\${');
        const res = eval('`' + escapedTmpl + '`');
        console.log(`${name} parsed successfully! Length: ${res.length}`);
    } catch (e) {
        console.error(`Failed to parse ${name}:`, e);
    }
});
