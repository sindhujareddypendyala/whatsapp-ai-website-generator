const axios = require('axios');
const fs = require('fs');

/**
 * Deploy ZIP to Netlify
 */
async function deployToNetlify(zipFilePath) {

    const token =
        process.env.NETLIFY_AUTH_TOKEN;

    if (!token) {

        throw new Error(
            "NETLIFY_AUTH_TOKEN is missing."
        );
    }

    // Check ZIP exists
    if (!fs.existsSync(zipFilePath)) {

        throw new Error(
            `ZIP file not found: ${zipFilePath}`
        );
    }

    try {

        const stats =
            fs.statSync(zipFilePath);

        console.log(
            `🚀 Deploying ${zipFilePath}`
        );

        console.log(
            `📦 ZIP Size: ${stats.size} bytes`
        );

        const zipFileStream =
            fs.createReadStream(zipFilePath);

        const response =
            await axios.post(

                'https://api.netlify.com/api/v1/sites',

                zipFileStream,

                {
                    headers: {

                        'Content-Type':
                            'application/zip',

                        'Authorization':
                            `Bearer ${token}`
                    },

                    maxContentLength:
                        Infinity,

                    maxBodyLength:
                        Infinity
                }
            );

        // Validate response
        if (!response.data.url) {

            throw new Error(
                "Netlify did not return a URL."
            );
        }

        console.log(
            `✅ Deployment successful`
        );

        console.log(
            `🔗 URL: ${response.data.url}`
        );

        return {

            url:
                response.data.url,

            siteId:
                response.data.site_id,

            adminUrl:
                response.data.admin_url
        };

    } catch (error) {

        console.error(
            "❌ Deployment Error:"
        );

        if (error.response) {

            console.error(
                error.response.data
            );

        } else {

            console.error(
                error.message
            );
        }

        throw new Error(
            "Failed to deploy website to Netlify."
        );
    }
}

/**
 * Map custom domain
 */
async function mapCustomDomain(
    siteId,
    domain
) {

    const token =
        process.env.NETLIFY_AUTH_TOKEN;

    if (!token) {

        console.error(
            "Missing Netlify token."
        );

        return false;
    }

    try {

        console.log(
            `🌐 Mapping custom domain: ${domain}`
        );

        await axios.put(

            `https://api.netlify.com/api/v1/sites/${siteId}`,

            {
                custom_domain: domain
            },

            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        console.log(
            `✅ Domain mapped successfully`
        );

        return true;

    } catch (error) {

        console.error(
            "❌ Failed to map domain:"
        );

        if (error.response) {

            console.error(
                error.response.data
            );

        } else {

            console.error(
                error.message
            );
        }

        return false;
    }
}

/**
 * Validate deployment URL
 */
function isValidDeploymentUrl(url) {

    try {

        const parsed =
            new URL(url);

        return (
            parsed.protocol === 'https:'
        );

    } catch {

        return false;
    }
}

module.exports = {

    deployToNetlify,

    mapCustomDomain,

    isValidDeploymentUrl
};