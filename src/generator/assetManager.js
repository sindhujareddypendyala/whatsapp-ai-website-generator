/**
 * Generate logo URL
 */

function getLogoUrl(name) {

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=80`;
}

/**
 * Get hero image
 */

function getHeroImage(type = '') {

    const websiteType =
        type.toLowerCase();

    if (websiteType.includes('restaurant')) {

        return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4';
    }

    if (websiteType.includes('portfolio')) {

        return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085';
    }

    if (websiteType.includes('store')) {

        return 'https://images.unsplash.com/photo-1472851294608-062f824d29cc';
    }

    return 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f';
}

module.exports = {

    getLogoUrl,

    getHeroImage
};