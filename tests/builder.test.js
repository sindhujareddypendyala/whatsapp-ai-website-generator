const fs = require('fs');
const path = require('path');

const {
    buildSite
} = require('../generator/builder');

describe('Builder Tests', () => {

    const outputDir =
        path.join(__dirname, 'temp-site');

    const requirements = {

        businessName: 'Test Portfolio',

        type: 'portfolio',

        sections: [
            'hero',
            'about',
            'contact'
        ],

        colorScheme: 'modern',

        template: 'modern'
    };

    const content = {

        hero:
            'Welcome to Test Portfolio',

        about:
            'This is a testing website.',

        contact:
            'Contact us today.'
    };

    test(
        'should build website zip successfully',
        async () => {

            const zipPath =
                await buildSite(
                    requirements,
                    content,
                    outputDir
                );

            expect(
                fs.existsSync(zipPath)
            ).toBe(true);
        }
    );
});