const fs = require('fs');
const path = require('path');

// Read the seed.sql file
const seedFile = fs.readFileSync(path.join(__dirname, '../supabase/seed.sql'), 'utf8');

// Extract all skills arrays using regex
const skillsPattern = /ARRAY\[(.*?)\]/g;
const matches = [...seedFile.matchAll(skillsPattern)];

// Process each match to extract individual skills
const allSkills = matches.flatMap(match => {
  const skillsString = match[1];
  return skillsString.split(',').map(skill => 
    skill.trim().replace(/'/g, '').trim()
  );
});

// Create a unique, sorted set of skills
const uniqueSkills = [...new Set(allSkills)].sort();

// Format the skills array as a string
const skillsArrayString = JSON.stringify(uniqueSkills, null, 2);

// Write to a new file
fs.writeFileSync(
  path.join(__dirname, '../lib/skills.ts'),
  `export const skills = ${skillsArrayString} as const;\n`
);

console.log('Unique skills extracted and saved to lib/skills.ts');
