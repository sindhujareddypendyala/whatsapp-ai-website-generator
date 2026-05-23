const Groq = require('groq-sdk');
const fs = require('fs');

const {
    EXTRACTION_PROMPT,
    GENERATION_PROMPT
} = require('./prompts');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

/**
 * Safely parse JSON
 */
function safeJsonParse(text) {

    try {

        return JSON.parse(text);

    } catch (error) {

        console.error("❌ JSON Parse Error:", error);

        return null;
    }
}

/**
 * Extract website requirements
 */
async function extractRequirements(message) {

    try {

        const completion =
            await groq.chat.completions.create({

                messages: [
                    {
                        role: 'system',
                        content: EXTRACTION_PROMPT
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],

                model: 'llama-3.1-8b-instant',

                temperature: 0.1,

                max_tokens: 500,

                response_format: {
                    type: 'json_object'
                }
            });

        const content =
            completion.choices[0].message.content;

        const parsed =
            safeJsonParse(content);

        if (!parsed) {
            throw new Error(
                "Invalid JSON from Groq"
            );
        }

        // Default values
        parsed.type =
            parsed.type || "portfolio";

        parsed.businessName =
            parsed.businessName || "My Business";

        parsed.sections =
            parsed.sections || [
                "hero",
                "about",
                "services",
                "contact"
            ];

        parsed.colorScheme =
            parsed.colorScheme || "modern";

        parsed.template =
            parsed.template || "modern";

        return parsed;

    } catch (error) {

        console.error(
            "❌ Error extracting requirements:",
            error
        );

        // Fallback structure
        return {
            type: "portfolio",

            businessName: "Creative Portfolio",

            sections: [
                "hero",
                "about",
                "projects",
                "skills",
                "contact"
            ],

            colorScheme: "modern",

            template: "modern"
        };
    }
}

/**
 * Generate website content
 */
async function generateContent(requirements) {

    try {

        const completion =
            await groq.chat.completions.create({

                messages: [
                    {
                        role: 'system',

                        content:
                            GENERATION_PROMPT +
                            JSON.stringify(requirements)
                    },
                    {
                        role: 'user',
                        content:
                            "Generate the website content now."
                    }
                ],

                model: 'llama-3.1-8b-instant',

                temperature: 0.7,

                max_tokens: 900,

                response_format: {
                    type: 'json_object'
                }
            });

        const content =
            completion.choices[0].message.content;

        const parsed =
            safeJsonParse(content);

        if (!parsed) {
            throw new Error(
                "Invalid generated content JSON"
            );
        }

        return parsed;

    } catch (error) {

        console.error(
            "❌ Error generating content:",
            error
        );

        // Fallback content
        const fallback = {};

        requirements.sections.forEach(section => {

            fallback[section] =
                `Professional content for the ${section} section of ${requirements.businessName}.`;
        });

        return fallback;
    }
}

/**
 * Edit website requirements
 */
async function editRequirements(
    message,
    previousRequirements
) {

    try {

        // Detect completely new website request
        const isNewWebsiteRequest = [

            'portfolio',
            'restaurant',
            'store',
            'shop',
            'agency',
            'blog',
            'website',
            'business'
        ].some(keyword =>
            message.toLowerCase().includes(keyword)
        );

        // If NEW website requested,
        // generate fresh requirements
        if (isNewWebsiteRequest) {

            return await extractRequirements(
                message
            );
        }

        // Otherwise perform edit merge
        const completion =
            await groq.chat.completions.create({

                messages: [

                    {
                        role: 'system',
                        content:
`You are an expert website requirements analyst.

Previous requirements:
${JSON.stringify(previousRequirements)}

The user wants to MODIFY the existing website.

Update ONLY necessary fields.

Return ONLY valid JSON.`
                    },

                    {
                        role: 'user',
                        content: message
                    }
                ],

                model: 'llama-3.1-8b-instant',

                temperature: 0.1,

                max_tokens: 500,

                response_format: {
                    type: 'json_object'
                }
            });

        return JSON.parse(
            completion.choices[0]
            .message.content
        );

    } catch (error) {

        console.error(
            'Error editing requirements:',
            error
        );

        return previousRequirements;
    }
}


/**
 * Transcribe voice audio
 */
async function transcribeAudio(audioFilePath) {

    try {

        const transcription =
            await groq.audio.transcriptions.create({

                file: fs.createReadStream(audioFilePath),

                model: "whisper-large-v3"
            });

        return transcription.text;

    } catch (error) {

        console.error(
            "❌ Error transcribing audio:",
            error
        );

        return "";
    }
}

module.exports = {

    extractRequirements,

    generateContent,

    editRequirements,

    transcribeAudio
};