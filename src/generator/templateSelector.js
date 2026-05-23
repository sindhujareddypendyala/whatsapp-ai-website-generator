/**
 * Select appropriate template
 * based on website type
 */

function selectTemplate(type = '') {

    const websiteType =
        type.toLowerCase();

    // =====================================
    // PORTFOLIO TEMPLATE
    // =====================================

    if (
        websiteType.includes('portfolio') ||
        websiteType.includes('photography') ||
        websiteType.includes('developer') ||
        websiteType.includes('designer')
    ) {

        return {
            name: 'portfolio',

            sections: [
                'hero',
                'about',
                'skills',
                'projects',
                'services',
                'testimonials',
                'contact',
                'footer'
            ],

            colorScheme: 'modern',

            template: 'modern'
        };
    }

    // =====================================
    // RESTAURANT TEMPLATE
    // =====================================

    if (
        websiteType.includes('restaurant') ||
        websiteType.includes('cafe') ||
        websiteType.includes('bakery') ||
        websiteType.includes('food')
    ) {

        return {
            name: 'restaurant',

            sections: [
                'hero',
                'about',
                'menu',
                'gallery',
                'testimonials',
                'contact',
                'footer'
            ],

            colorScheme: 'warm',

            template: 'classic'
        };
    }

    // =====================================
    // ECOMMERCE / STORE
    // =====================================

    if (
        websiteType.includes('store') ||
        websiteType.includes('shop') ||
        websiteType.includes('ecommerce') ||
        websiteType.includes('product')
    ) {

        return {
            name: 'ecommerce',

            sections: [
                'hero',
                'products',
                'features',
                'reviews',
                'contact',
                'footer'
            ],

            colorScheme: 'modern',

            template: 'modern'
        };
    }

    // =====================================
    // AGENCY TEMPLATE
    // =====================================

    if (
        websiteType.includes('agency') ||
        websiteType.includes('business') ||
        websiteType.includes('company')
    ) {

        return {
            name: 'agency',

            sections: [
                'hero',
                'about',
                'services',
                'team',
                'testimonials',
                'contact',
                'footer'
            ],

            colorScheme: 'dark',

            template: 'modern'
        };
    }

    // =====================================
    // BLOG TEMPLATE
    // =====================================

    if (
        websiteType.includes('blog') ||
        websiteType.includes('news') ||
        websiteType.includes('article')
    ) {

        return {
            name: 'blog',

            sections: [
                'hero',
                'articles',
                'categories',
                'about',
                'contact',
                'footer'
            ],

            colorScheme: 'minimal',

            template: 'minimalist'
        };
    }

    // =====================================
    // DEFAULT TEMPLATE
    // =====================================

    return {

        name: 'default',

        sections: [
            'hero',
            'about',
            'services',
            'contact',
            'footer'
        ],

        colorScheme: 'modern',

        template: 'modern'
    };
}

/**
 * Merge AI requirements
 * with selected template defaults
 */
function applyTemplateDefaults(requirements) {

    const templateData =
        selectTemplate(requirements.type);

    return {

        ...requirements,

        sections:
            requirements.sections?.length
                ? requirements.sections
                : templateData.sections,

        colorScheme:
            requirements.colorScheme ||
            templateData.colorScheme,

        template:
            requirements.template ||
            templateData.template
    };
}

module.exports = {

    selectTemplate,

    applyTemplateDefaults
};