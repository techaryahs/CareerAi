const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load .env from backend
dotenv.config({ path: path.join(__dirname, '../.env') });

async function run() {
    try {
        // console.log('Connecting to:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        // console.log('Connected to MongoDB');

        const collection = mongoose.connection.db.collection('consultants');
        
        // console.log('Checking indexes...');
        const indexes = await collection.indexes();
        const hasIndex = indexes.some(idx => idx.name === 'normalizedEmail_1');

        if (hasIndex) {
            // console.log('Dropping index: normalizedEmail_1');
            await collection.dropIndex('normalizedEmail_1');
            // console.log('Index dropped successfully.');
        } else {
            // console.log('Index normalizedEmail_1 not found.');
        }

        // Optional: Remove the field from documents if it exists
        // console.log('Removing orphaned normalizedEmail fields from documents...');
        const result = await collection.updateMany(
            { normalizedEmail: { $exists: true } },
            { $unset: { normalizedEmail: "" } }
        );
        // console.log(`Updated ${result.modifiedCount} documents.`);

        await mongoose.disconnect();
        // console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Error during cleanup:', err);
        process.exit(1);
    }
}

run();
