/**
 * Generate SEO meta tags
 */

function generateSEO(requirements) {

    const {
        businessName,
        type
    } = requirements;

    return `
<title>${businessName} | ${type}</title>

<meta
    name="description"
    content="Professional ${type} website for ${businessName}"
>

<meta
    name="keywords"
    content="${type}, business website, portfolio, services"
>

<meta
    property="og:title"
    content="${businessName}"
>

<meta
    property="og:description"
    content="Modern AI generated website"
>

<meta
    property="og:type"
    content="website"
>
`;
}

module.exports = {
    generateSEO
};