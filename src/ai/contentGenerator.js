const { generateContent } = require('./processor');

/**
 * Generate complete website content
 */
async function createWebsiteContent(requirements) {

    try {

        console.log(
            "✍️ Generating AI website content..."
        );

        const content =
            await generateContent(requirements);

        // Ensure every section exists
        requirements.sections.forEach(section => {

            if (!content[section]) {

                content[section] =
                    `Professional ${section} content for ${requirements.businessName}.`;
            }
        });

        return content;

    } catch (error) {

        console.error(
            "❌ Content generation failed:",
            error
        );

        return generateFallbackContent(
            requirements
        );
    }
}

/**
 * Fallback content
 */
function generateFallbackContent(requirements) {

    const fallback = {};

    requirements.sections.forEach(section => {

        switch (section) {

            case 'hero':

                fallback[section] =
                    `Welcome to ${requirements.businessName}. We create modern digital experiences for growing businesses.`;

                break;

            case 'about':

                fallback[section] =
                    `${requirements.businessName} is dedicated to delivering professional services with innovation and quality.`;

                break;

            case 'services':

                fallback[section] =
                    `Web Design, Branding, Marketing, Consulting, UI/UX Solutions.`;

                break;

            case 'projects':

                fallback[section] =
                    `Explore our latest innovative projects and successful client work.`;

                break;

            case 'contact':

                fallback[section] =
                    `Contact ${requirements.businessName} today to start your next project.`;

                break;

            case 'footer':

                fallback[section] =
                    `© ${new Date().getFullYear()} ${requirements.businessName}. All rights reserved.`;

                break;

            default:

                fallback[section] =
                    `Professional ${section} content for ${requirements.businessName}.`;
        }
    });

    return fallback;
}

module.exports = {
    createWebsiteContent,
    generateFallbackContent
};