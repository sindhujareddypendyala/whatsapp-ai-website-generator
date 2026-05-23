 /**
 * Detect website content language
 */
function detectLanguage(text) {

    if (!text) {
        return 'english';
    }

    // Telugu
    if (/[\u0C00-\u0C7F]/.test(text)) {
        return 'telugu';
    }

    // Hindi
    if (/[\u0900-\u097F]/.test(text)) {
        return 'hindi';
    }

    // Tamil
    if (/[\u0B80-\u0BFF]/.test(text)) {
        return 'tamil';
    }

    // Kannada
    if (/[\u0C80-\u0CFF]/.test(text)) {
        return 'kannada';
    }

    // Malayalam
    if (/[\u0D00-\u0D7F]/.test(text)) {
        return 'malayalam';
    }

    // Spanish keywords
    const spanishWords = [
        'hola',
        'gracias',
        'sitio web',
        'negocio',
        'restaurante',
        'portafolio'
    ];

    const lower =
        text.toLowerCase();

    if (
        spanishWords.some(word =>
            lower.includes(word)
        )
    ) {
        return 'spanish';
    }

    return 'english';
}

/**
 * Get language greeting
 */
function getLanguageGreeting(language) {

    const greetings = {

        english:
            "Welcome",

        telugu:
            "స్వాగతం",

        hindi:
            "स्वागत है",

        tamil:
            "வரவேற்கிறோம்",

        kannada:
            "ಸ್ವಾಗತ",

        malayalam:
            "സ്വാഗതം",

        spanish:
            "Bienvenido"
    };

    return greetings[language] || greetings.english;
}

/**
 * Check if language is supported
 */
function isSupportedLanguage(language) {

    const supported = [
        'english',
        'telugu',
        'hindi',
        'tamil',
        'kannada',
        'malayalam',
        'spanish'
    ];

    return supported.includes(language);
}

module.exports = {
    detectLanguage,
    getLanguageGreeting,
    isSupportedLanguage
};