const fs = require('fs');
const path = require('path');

// =====================================
// ANALYTICS FILE
// =====================================

const analyticsPath =
    path.join(
        __dirname,
        '../../analytics.json'
    );

// =====================================
// ENSURE ANALYTICS FILE EXISTS
// =====================================

function initializeAnalytics() {

    if (!fs.existsSync(analyticsPath)) {

        const defaultStats = {

            generatedSites: 0,

            deployments: 0,

            failedDeployments: 0,

            lastGenerated: null
        };

        fs.writeFileSync(
            analyticsPath,
            JSON.stringify(defaultStats, null, 2)
        );
    }
}

// =====================================
// READ ANALYTICS
// =====================================

function readAnalytics() {

    initializeAnalytics();

    try {

        const data =
            fs.readFileSync(
                analyticsPath,
                'utf8'
            );

        return JSON.parse(data);

    } catch (error) {

        console.error(
            '❌ Failed to read analytics:',
            error
        );

        return {

            generatedSites: 0,

            deployments: 0,

            failedDeployments: 0,

            lastGenerated: null
        };
    }
}

// =====================================
// WRITE ANALYTICS
// =====================================

function writeAnalytics(stats) {

    try {

        fs.writeFileSync(
            analyticsPath,
            JSON.stringify(stats, null, 2)
        );

    } catch (error) {

        console.error(
            '❌ Failed to write analytics:',
            error
        );
    }
}

// =====================================
// INCREMENT GENERATED SITES
// =====================================

function incrementAnalyticsCounter() {

    const stats =
        readAnalytics();

    stats.generatedSites += 1;

    stats.lastGenerated =
        new Date().toISOString();

    writeAnalytics(stats);
}

// =====================================
// INCREMENT DEPLOYMENTS
// =====================================

function incrementDeploymentCounter() {

    const stats =
        readAnalytics();

    stats.deployments += 1;

    writeAnalytics(stats);
}

// =====================================
// INCREMENT FAILED DEPLOYMENTS
// =====================================

function incrementFailedDeployments() {

    const stats =
        readAnalytics();

    stats.failedDeployments += 1;

    writeAnalytics(stats);
}

// =====================================
// GET ANALYTICS
// =====================================

function getAnalyticsStats() {

    return readAnalytics();
}

// =====================================
// ENSURE DIRECTORY EXISTS
// =====================================

function ensureDirExists(dirPath) {

    try {

        if (!fs.existsSync(dirPath)) {

            fs.mkdirSync(dirPath, {
                recursive: true
            });

            console.log(
                `📁 Created directory: ${dirPath}`
            );
        }

    } catch (error) {

        console.error(
            `❌ Failed creating directory: ${dirPath}`,
            error
        );
    }
}

// =====================================
// CLEANUP DIRECTORY
// =====================================

function cleanupDir(dirPath) {

    try {

        if (fs.existsSync(dirPath)) {

            fs.rmSync(dirPath, {
                recursive: true,
                force: true
            });

            console.log(
                `🗑️ Cleaned directory: ${dirPath}`
            );
        }

    } catch (error) {

        console.error(
            `❌ Failed cleaning directory: ${dirPath}`,
            error
        );
    }
}

// =====================================
// DELETE FILE
// =====================================

function deleteFile(filePath) {

    try {

        if (fs.existsSync(filePath)) {

            fs.unlinkSync(filePath);

            console.log(
                `🗑️ Deleted file: ${filePath}`
            );
        }

    } catch (error) {

        console.error(
            `❌ Failed deleting file: ${filePath}`,
            error
        );
    }
}

// =====================================
// FORMAT FILE SIZE
// =====================================

function formatFileSize(bytes) {

    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(2)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// =====================================
// GENERATE RANDOM ID
// =====================================

function generateId(length = 8) {

    return Math.random()
        .toString(36)
        .substring(2, 2 + length);
}

module.exports = {

    ensureDirExists,

    cleanupDir,

    deleteFile,

    formatFileSize,

    generateId,

    incrementAnalyticsCounter,

    incrementDeploymentCounter,

    incrementFailedDeployments,

    getAnalyticsStats
};