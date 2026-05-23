/**
 * Validate user website request
 */

function isValidWebsiteRequest(message) {

    if (!message) {
        return false;
    }

    const text =
        message.trim().toLowerCase();

    // =====================================
    // MINIMUM LENGTH CHECK
    // =====================================

    if (text.length < 3) {
        return false;
    }

    // =====================================
    // EMOJI / SYMBOL ONLY CHECK
    // =====================================

    const onlySymbolsRegex =
        /^[^a-zA-Z0-9]+$/;

    if (onlySymbolsRegex.test(text)) {
        return false;
    }

    // =====================================
    // VALID WEBSITE KEYWORDS
    // =====================================

    const websiteKeywords = [

        'website',

        'portfolio',

        'restaurant',

        'store',

        'shop',

        'business',

        'landing',

        'blog',

        'agency',

        'ecommerce',

        'developer',

        'design',

        'create',

        'build',

        'make'
    ];

    const containsKeyword =
        websiteKeywords.some(keyword =>
            text.includes(keyword)
        );

    return containsKeyword;
}

/**
 * Detect edit request
 */

function isEditRequest(message) {

    if (!message) {
        return false;
    }

    const text =
        message.toLowerCase();

    const editKeywords = [

        'change',

        'update',

        'edit',

        'modify',

        'add',

        'remove',

        'replace',

        'make',

        'change color',

        'change font',

        'new section'
    ];

    return editKeywords.some(keyword =>
        text.includes(keyword)
    );
}

/**
 * Validate supported website type
 */

function isSupportedWebsiteType(type) {

    if (!type) {
        return false;
    }

    const supportedTypes = [

        'portfolio',

        'restaurant',

        'store',

        'shop',

        'business',

        'agency',

        'blog',

        'ecommerce',

        'landing page'
    ];

    return supportedTypes.includes(
        type.toLowerCase()
    );
}

/**
 * Sanitize user input
 */

function sanitizeInput(text) {

    if (!text) {
        return '';
    }

    return text
        .replace(/[<>]/g, '')
        .trim();
}

/**
 * Validate deployment URL
 */

function isValidUrl(url) {

    try {

        new URL(url);

        return true;

    } catch {

        return false;
    }
}

module.exports = {

    isValidWebsiteRequest,

    isEditRequest,

    isSupportedWebsiteType,

    sanitizeInput,

    isValidUrl
};