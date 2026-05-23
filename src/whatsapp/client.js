const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const os = require('os');

const {
    extractRequirements,
    generateContent,
    editRequirements,
    transcribeAudio
} = require('../ai/processor');

const {
    buildSite
} = require('../generator/builder');

const {
    deployToNetlify
} = require('../deployment/deployer');

const {
    cleanupDir,
    incrementAnalyticsCounter,
    getAnalyticsStats
} = require('../utils/helpers');

// =====================================
// WHATSAPP CLIENT
// =====================================
const client = new Client({

    authStrategy: new LocalAuth(),

    puppeteer: {

        headless: true,

        args: [

            '--no-sandbox',

            '--disable-setuid-sandbox',

            '--disable-dev-shm-usage',

            '--disable-accelerated-2d-canvas',

            '--disable-gpu',

            '--disable-extensions',

            '--disable-background-networking',

            '--disable-sync',

            '--metrics-recording-only',

            '--mute-audio',

            '--no-first-run',

            '--disable-default-apps'
        ]
    }
});




// =====================================
// PREVENT MULTIPLE INITIALIZATIONS
// =====================================

let isInitialized = false;

// =====================================
// USER SESSIONS
// =====================================

const userSessions = {};

// =====================================
// QR EVENT
// =====================================

client.on('qr', (qr) => {

    console.log('📱 Scan QR Code');

    qrcode.generate(qr, {
        small: true
    });
});

// =====================================
// READY EVENT
// =====================================

let readyLogged = false;

client.on('ready', () => {

    if (readyLogged) {
        return;
    }

    readyLogged = true;

    console.log(
        '✅ WhatsApp Client is ready!'
    );
});


// =====================================
// AUTH EVENT
// =====================================

let authLogged = false;

client.on('authenticated', () => {

    if (authLogged) {
        return;
    }

    authLogged = true;

    console.log(
        '🔐 WhatsApp authenticated'
    );
});


// =====================================
// AUTH FAILURE
// =====================================

client.on('auth_failure', msg => {

    console.error(
        '❌ Authentication failed:',
        msg
    );
});

// =====================================
// DISCONNECTED
// =====================================

client.on('disconnected', reason => {

    console.log(
        '⚠️ WhatsApp disconnected:',
        reason
    );
});

// =====================================
// MESSAGE HANDLER
// =====================================

client.on('message', async (msg) => {

    try {

        // =====================================
        // IGNORE STATUS BROADCASTS
        // =====================================

        if (
            msg.from === 'status@broadcast'
        ) {
            return;
        }

        // =====================================
        // IGNORE GROUPS
        // =====================================

        const chat =
            await msg.getChat();

        if (chat.isGroup) {
            return;
        }

        let body =
            msg.body?.trim();

        if (!body && !msg.hasMedia) {
            return;
        }

        body = body
            ? body.toLowerCase()
            : '';

        console.log(
            `📩 Message from ${msg.from}: ${body}`
        );

        // =====================================
        // VOICE MESSAGE SUPPORT
        // =====================================

        if (
            msg.hasMedia &&
            (
                msg.type === 'ptt' ||
                msg.type === 'audio'
            )
        ) {

            await msg.reply(
                "🎙️ Processing voice message..."
            );

            try {

                const media =
                    await msg.downloadMedia();

                if (!media) {

                    await msg.reply(
                        "❌ Unable to process audio."
                    );

                    return;
                }

                const ext =
                    media.mimetype
                    .split('/')[1]
                    .split(';')[0];

                const audioPath =
                    path.join(
                        os.tmpdir(),
                        `audio_${Date.now()}.${ext}`
                    );

                fs.writeFileSync(
                    audioPath,
                    media.data,
                    'base64'
                );

                const transcript =
                    await transcribeAudio(
                        audioPath
                    );

                try {

                    fs.unlinkSync(audioPath);

                } catch {}

                if (!transcript) {

                    await msg.reply(
                        "❌ Could not understand audio."
                    );

                    return;
                }

                body =
                    transcript.trim().toLowerCase();

                await msg.reply(
                    `📝 Transcript:\n"${transcript}"`
                );

            } catch (err) {

                console.error(
                    'Audio error:',
                    err
                );

                await msg.reply(
                    "❌ Failed to process voice message."
                );

                return;
            }
        }

        // =====================================
        // ANALYTICS
        // =====================================

        if (body === '!stats') {

            const stats =
                getAnalyticsStats();

            await msg.reply(
                `📊 Websites Generated: ${stats.generatedSites}`
            );

            return;
        }

        // =====================================
        // VALIDATION
        // =====================================

        const validKeywords = [

            'website',
            'portfolio',
            'restaurant',
            'store',
            'shop',
            'landing',
            'agency',
            'blog',
            'business',
            'build',
            'create',
            'design'
        ];

        const containsKeyword =
            validKeywords.some(word =>
                body.includes(word)
            );

        // Reject invalid input
        if (
            !containsKeyword &&
            body.length < 15
        ) {

            await msg.reply(
`⚠️ Please describe the website you want.

Examples:
• Build me a portfolio website
• Create a restaurant website
• Make a bakery landing page`
            );

            return;
        }

        // =====================================
        // WEBSITE EDITING
        // =====================================
        // =====================================
// REQUEST TYPE DETECTION
// =====================================

const editKeywords = [

    'change',
    'update',
    'modify',
    'add',
    'remove',
    'edit',
    'replace',
    'customize',
    'improve',
    'dark',
    'light',
    'theme',
    'color',
    'font',
    'navbar',
    'footer',
    'button',
    'header',
    'section'
];

const newWebsiteKeywords = [

    'build',
    'create',
    'generate',
    'make',
    'portfolio',
    'restaurant',
    'ecommerce',
    'store',
    'agency',
    'startup',
    'landing page',
    'blog',
    'business',
    'website'
];

const isEditRequest =
    editKeywords.some(word =>
        body.includes(word)
    );

const isNewWebsiteRequest =
    newWebsiteKeywords.some(word =>
        body.includes(word)
    );

// =====================================
// WEBSITE EDITING
// =====================================

if (
    userSessions[msg.from] &&
    isEditRequest &&
    !isNewWebsiteRequest
) {

    try {

        await msg.reply(
            "🔄 Updating your website..."
        );

        const previousReqs =
            userSessions[msg.from]
            .requirements;

        const updatedReqs =
            await editRequirements(
                body,
                previousReqs
            );

        await msg.reply(
            "📝 Regenerating content..."
        );

        const content =
            await generateContent(
                updatedReqs
            );

        const tempId =
            Date.now().toString();

        const outputDir =
            path.join(
                os.tmpdir(),
                `site_${tempId}`
            );

        await msg.reply(
            "🏗️ Rebuilding website..."
        );

        const zipPath =
            await buildSite(
                updatedReqs,
                content,
                outputDir
            );

        await msg.reply(
            "🚀 Deploying updated website..."
        );

        const deployResult =
            await deployToNetlify(
                zipPath
            );

        userSessions[msg.from] = {

            requirements:
                updatedReqs,

            content,

            zipPath
        };

        incrementAnalyticsCounter();

        cleanupDir(outputDir);

        await msg.reply(
`✅ Updated website is live!

🔗 ${deployResult.url}

Need more changes? Just send another message.`
        );

        return;

    } catch (error) {

        console.error(
            'Edit error:',
            error
        );

        await msg.reply(
            "❌ Failed to update website."
        );

        return;
    }
}
        
        // =====================================
        // WEBSITE GENERATION
        // =====================================

        if (
            containsKeyword ||
            body.length > 20
        ) {

            await msg.reply(
                "⏳ Analyzing your website request..."
            );

            console.log(
                '📌 Extracting requirements...'
            );

            const requirements =
                await extractRequirements(
                    body
                );

            console.log(
                '✅ Requirements:',
                requirements
            );

            await msg.reply(
`📝 Creating a ${requirements.type} website for "${requirements.businessName}"`
            );

            console.log(
                '✍️ Generating AI content...'
            );

            const content =
                await generateContent(
                    requirements
                );

            const tempId =
                Date.now().toString();

            const outputDir =
                path.join(
                    os.tmpdir(),
                    `site_${tempId}`
                );

            await msg.reply(
                "🏗️ Building website..."
            );

            console.log(
                '🏗️ Building website...'
            );

            const zipPath =
                await buildSite(
                    requirements,
                    content,
                    outputDir
                );

            await msg.reply(
                "🚀 Deploying website..."
            );

            console.log(
                '🚀 Deploying to Netlify...'
            );

            const deployResult =
                await deployToNetlify(
                    zipPath
                );

            userSessions[msg.from] = {

                requirements,
                content,
                zipPath
            };

            incrementAnalyticsCounter();

            cleanupDir(outputDir);

            await msg.reply(
`✅ Your website is live!

🔗 ${deployResult.url}

📋 Features Included:
${requirements.sections
    ?.map(s => `• ${s}`)
    .join('\n')}

💬 Want changes?
Example:
• Make header blue
• Add testimonials
• Change font style`
            );

            console.log(
                `✅ Deployment successful: ${deployResult.url}`
            );
        }

    } catch (error) {

        console.error(
            '❌ Error processing request:',
            error
        );

        try {

            await msg.reply(
                "❌ Something went wrong while generating your website."
            );

        } catch {}
    }
});

// =====================================
// START CLIENT
// =====================================

function startClient() {

    if (isInitialized) {

        console.log(
            '⚠️ WhatsApp client already initialized'
        );

        return;
    }

    isInitialized = true;

    console.log(
        '📡 Initializing WhatsApp client...'
    );

    client.initialize().catch(err => {

        console.error(
            'WhatsApp initialization error:',
            err.message
        );

        isInitialized = false;
    });
}

// =====================================
// EXPORT
// =====================================

module.exports = {
    startClient
};