const fs = require('fs');
const files = [
    'e:/career/CareerAi/backend/controllers/auth.controller.js',
    'e:/career/CareerAi/backend/controllers/admin.controller.js',
    'e:/career/CareerAi/backend/controllers/career.controller.js'
];
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\\`/g, '`').replace(/\\\${/g, '${');
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
}
