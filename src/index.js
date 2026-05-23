require('dotenv').config();

const { startClient } = require('./whatsapp/client');

// Required environment variables
const requiredEnvVars = [
    'GROQ_API_KEY',
   'NETLIFY_AUTH_TOKEN'
];

// Check missing variables
const missingVars = requiredEnvVars.filter(
    key => !process.env[key]
);

if (missingVars.length > 0) {

    console.error("❌ Missing required environment variables:");

    missingVars.forEach(variable => {
        console.error(`- ${variable}`);
    });

    process.exit(1);
}

console.log("✅ Environment variables loaded successfully");


// Global crash handling
process.on('uncaughtException', (err) => {
    console.error("❌ Uncaught Exception:", err.message);
});

process.on('unhandledRejection', (reason) => {
    console.error("❌ Unhandled Promise Rejection:", reason);
});

// Start WhatsApp client
startClient();
