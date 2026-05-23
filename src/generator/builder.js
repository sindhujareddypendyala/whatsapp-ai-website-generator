const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const {
    ensureDirExists
} = require('../utils/helpers');

// =====================================
// GENERATE WEBSITE HTML
// =====================================

function generateHTML(requirements, content) {

    const {
        businessName,
        type
    } = requirements;

    // =====================================
    // WEBSITE THEMES
    // =====================================

    let theme = {

        primary: 'blue',

        secondary: 'purple',

        bg: '#f5f7ff',

        sectionBg: '#ffffff',

        gradient:
            'from-blue-900 via-indigo-700 to-purple-700',

        font: 'Poppins',

        heroImage:
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
    };

    // =====================================
    // RESTAURANT
    // =====================================

    if (
        type.toLowerCase().includes('restaurant')
    ) {

        theme = {

            primary: 'orange',

            secondary: 'red',

            bg: '#fff8f1',

            sectionBg: '#fffaf5',

            gradient:
                'from-orange-900 via-red-700 to-yellow-600',

            font: 'Playfair Display',

            heroImage:
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'
        };
    }

    // =====================================
    // ECOMMERCE
    // =====================================

    if (
        type.toLowerCase().includes('store') ||
        type.toLowerCase().includes('ecommerce')
    ) {

        theme = {

            primary: 'emerald',

            secondary: 'green',

            bg: '#f6fff9',

            sectionBg: '#ffffff',

            gradient:
                'from-emerald-900 via-green-700 to-lime-600',

            font: 'Inter',

            heroImage:
                'https://images.unsplash.com/photo-1472851294608-062f824d29cc'
        };
    }

    // =====================================
    // AGENCY
    // =====================================

    if (
        type.toLowerCase().includes('agency')
    ) {

        theme = {

            primary: 'gray',

            secondary: 'black',

            bg: '#f8fafc',

            sectionBg: '#ffffff',

            gradient:
                'from-gray-900 via-black to-gray-700',

            font: 'Manrope',

            heroImage:
                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'
        };
    }

    // =====================================
    // PORTFOLIO
    // =====================================

    if (
        type.toLowerCase().includes('portfolio')
    ) {

        theme = {

            primary: 'blue',

            secondary: 'purple',

            bg: '#f5f7ff',

            sectionBg: '#ffffff',

            gradient:
                'from-blue-900 via-indigo-700 to-purple-700',

            font: 'Poppins',

            heroImage:
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
        };
    }

    // =====================================
    // STARTUP
    // =====================================

    if (
        type.toLowerCase().includes('startup')
    ) {

        theme = {

            primary: 'violet',

            secondary: 'purple',

            bg: '#f7f5ff',

            sectionBg: '#ffffff',

            gradient:
                'from-violet-900 via-purple-700 to-fuchsia-600',

            font: 'Inter',

            heroImage:
                'https://images.unsplash.com/photo-1552664730-d307ca884978'
        };
    }

    // =====================================
    // LOGO
    // =====================================

    const logoUrl =
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            businessName
        )}&background=random&color=fff&size=256`;

    // =====================================
    // SECTIONS HTML
    // =====================================

    let sectionsHtml = '';

    requirements.sections.forEach(section => {

        const secName =
            section.toLowerCase();

        let secContent =
            content[section] ||
            content[secName] ||
            `Welcome to ${businessName}`;

        if (
            typeof secContent === 'object' &&
            secContent !== null
        ) {

            secContent =
                Object.values(secContent)
                .join('<br>');
        }

        // =====================================
        // HERO
        // =====================================

        if (secName === 'hero') {

            sectionsHtml += `
<section
id="hero"
class="relative min-h-screen flex items-center justify-center overflow-hidden text-white"
>

<div class="absolute inset-0">

<img
src="${theme.heroImage}"
class="w-full h-full object-cover"
/>

<div class="absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-80"></div>

</div>

<div class="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

<div data-aos="fade-right">

<p class="uppercase tracking-[8px] text-sm mb-6 text-${theme.primary}-300">
Premium ${type}
</p>

<h1 class="text-5xl sm:text-6xl lg:text-8xl font-black leading-tight mb-8">
${businessName}
</h1>

<p class="text-lg md:text-xl text-gray-200 leading-relaxed mb-10">
${secContent}
</p>

<div class="flex flex-wrap gap-5">

<a
href="#contact"
class="bg-white text-${theme.primary}-700 px-8 py-4 rounded-full font-bold shadow-2xl hover:scale-105 transition duration-300"
>
Get Started
</a>

<a
href="#about"
class="border border-white/40 px-8 py-4 rounded-full hover:bg-white hover:text-black transition duration-300"
>
Explore More
</a>

</div>

</div>

<div
class="hidden lg:flex justify-center"
data-aos="zoom-in"
>

<img
src="${logoUrl}"
class="w-96 h-96 rounded-[40px] object-cover border border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.2)]"
/>

</div>

</div>

</section>
`;
        }

        // =====================================
        // ABOUT
        // =====================================

        else if (secName === 'about') {

            sectionsHtml += `
<section
id="about"
class="py-24"
style="background:${theme.sectionBg}"
>

<div
class="max-w-5xl mx-auto px-6 text-center"
data-aos="fade-up"
>

<h2 class="text-5xl font-bold mb-8 gradient-text">
About Us
</h2>

<p class="text-lg text-gray-700 leading-relaxed">
${secContent}
</p>

</div>

</section>
`;
        }

        // =====================================
        // CONTACT
        // =====================================

        else if (secName === 'contact') {

            sectionsHtml += `
<section
id="contact"
class="py-24 bg-black text-white"
>

<div
class="max-w-4xl mx-auto px-6 text-center"
data-aos="fade-up"
>

<h2 class="text-5xl font-bold mb-6">
Let's Work Together
</h2>

<p class="text-lg text-gray-300 mb-12">
${secContent}
</p>

<form class="space-y-6 text-left">

<input
type="text"
placeholder="Your Name"
class="w-full p-5 rounded-2xl bg-white/10 border border-white/20 outline-none"
/>

<input
type="email"
placeholder="Your Email"
class="w-full p-5 rounded-2xl bg-white/10 border border-white/20 outline-none"
/>

<textarea
rows="6"
placeholder="Your Message"
class="w-full p-5 rounded-2xl bg-white/10 border border-white/20 outline-none"
></textarea>

<button
class="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition duration-300"
>
Send Message
</button>

</form>

</div>

</section>
`;
        }

        // =====================================
        // OTHER SECTIONS
        // =====================================

        else {

            sectionsHtml += `
<section
id="${secName}"
class="py-24"
style="background:${theme.bg}"
>

<div class="max-w-7xl mx-auto px-6">

<div class="text-center mb-20">

<h2
class="text-5xl font-bold capitalize mb-6"
data-aos="fade-up"
>
${secName}
</h2>

<p class="text-gray-600 text-lg">
${secContent}
</p>

</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

${[1,2,3].map(i => `
<div
class="bg-white/80 backdrop-blur-xl border border-white/30 rounded-[30px] shadow-2xl p-10 hover:-translate-y-4 transition duration-300"
data-aos="zoom-in"
>

<div class="w-16 h-16 rounded-2xl bg-${theme.primary}-100 flex items-center justify-center text-3xl mb-6">
✨
</div>

<h3 class="text-2xl font-bold mb-4">
Premium Experience
</h3>

<p class="text-gray-600">
Professional modern solutions tailored for growth and customer satisfaction.
</p>

</div>
`).join('')}

</div>

</div>

</section>
`;
        }
    });

    // =====================================
    // FINAL HTML
    // =====================================

    return `
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8"/>

<meta
name="viewport"
content="width=device-width, initial-scale=1.0"
/>

<title>${businessName}</title>

<meta
name="description"
content="${businessName} AI generated professional website"
/>

<script src="https://cdn.tailwindcss.com"></script>

<link
href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700;800&display=swap"
rel="stylesheet"
/>

<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

<link
href="https://unpkg.com/aos@2.3.1/dist/aos.css"
rel="stylesheet"
/>

<link rel="stylesheet" href="style.css"/>

</head>

<body
style="font-family:'${theme.font}',sans-serif;background:${theme.bg}"
>

<!-- NAVBAR -->

<nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">

<div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

<div class="flex items-center gap-4">

<img
src="${logoUrl}"
class="w-12 h-12 rounded-full shadow-xl"
/>

<h1 class="text-2xl font-extrabold gradient-text">
${businessName}
</h1>

</div>

<div class="hidden lg:flex items-center gap-8 font-medium">

${requirements.sections.map(sec => `
<a
href="#${sec.toLowerCase()}"
class="capitalize hover:text-${theme.primary}-600 transition duration-300"
>
${sec}
</a>
`).join('')}

</div>

</div>

</nav>

${sectionsHtml}

<!-- FOOTER -->

<footer class="bg-black text-white py-16">

<div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

<div>

<h3 class="text-3xl font-bold mb-2">
${businessName}
</h3>

<p class="text-gray-400">
Premium AI Generated Website
</p>

</div>

<div class="flex gap-6 text-gray-400">

<a href="#">Instagram</a>

<a href="#">LinkedIn</a>

<a href="#">GitHub</a>

</div>

</div>

</footer>

<script>

AOS.init({
    duration: 1000,
    once: true
});

</script>

</body>

</html>
`;
}

// =====================================
// BUILD SITE
// =====================================

async function buildSite(
    requirements,
    content,
    outputDir
) {

    return new Promise((resolve, reject) => {

        try {

            ensureDirExists(outputDir);

            // HTML
            const html =
                generateHTML(
                    requirements,
                    content
                );

            fs.writeFileSync(
                path.join(outputDir, 'index.html'),
                html
            );

            // CSS
            const css = `
html {
    scroll-behavior: smooth;
}

body {
    overflow-x: hidden;
}

img {
    max-width: 100%;
    display: block;
}

.gradient-text {
    background: linear-gradient(
        to right,
        #2563eb,
        #7c3aed
    );

    -webkit-background-clip: text;

    -webkit-text-fill-color: transparent;
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(
        #2563eb,
        #7c3aed
    );

    border-radius: 999px;
}

@media (max-width: 768px) {

    h1 {
        font-size: 3rem !important;
    }

    section {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}
`;

            fs.writeFileSync(
                path.join(outputDir, 'style.css'),
                css
            );

            // ZIP FILE
            const zipPath =
                `${outputDir}.zip`;

            const output =
                fs.createWriteStream(zipPath);

            const archive =
                archiver('zip', {
                    zlib: {
                        level: 9
                    }
                });

            output.on('close', () => {
                
                console.log(
                     `✅ ZIP created: ${zipPath}`
                        );

                resolve(zipPath);
            });

            archive.on('error', err => {

                reject(err);
            });

            archive.pipe(output);

            archive.directory(
                outputDir,
                false
            );

            archive.finalize();

        } catch (error) {

            reject(error);
        }
    });
}

module.exports = {
    buildSite
};