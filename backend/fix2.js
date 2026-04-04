const fs = require('fs');
const files = [
    'e:/career/CareerAi/backend/controllers/auth.controller.js',
    'e:/career/CareerAi/backend/controllers/admin.controller.js',
    'e:/career/CareerAi/backend/controllers/profile.controller.js'
];
for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/\\`/g, '`').replace(/\\\${/g, '${');
        fs.writeFileSync(file, content);
        console.log('Fixed', file);
    }
}
