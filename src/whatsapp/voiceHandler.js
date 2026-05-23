const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Save WhatsApp audio temporarily
 */
async function saveAudioFile(media) {

    try {

        if (!media) {
            throw new Error("No media found");
        }

        const ext = media.mimetype
            .split('/')[1]
            .split(';')[0];

        const fileName =
            `audio_${Date.now()}.${ext}`;

        const filePath =
            path.join(os.tmpdir(), fileName);

        fs.writeFileSync(
            filePath,
            media.data,
            'base64'
        );

        return filePath;

    } catch (error) {

        console.error(
            "❌ Error saving audio:",
            error
        );

        return null;
    }
}

/**
 * Delete temporary audio file
 */
function deleteAudioFile(filePath) {

    try {

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);

            console.log(
                `🗑️ Deleted temp audio: ${filePath}`
            );
        }

    } catch (error) {

        console.error(
            "❌ Error deleting audio file:",
            error
        );
    }
}

/**
 * Validate supported audio format
 */
function isSupportedAudio(mimetype) {

    const supportedFormats = [
        'audio/ogg',
        'audio/mpeg',
        'audio/mp3',
        'audio/wav',
        'audio/webm'
    ];

    return supportedFormats.includes(
        mimetype.split(';')[0]
    );
}

module.exports = {
    saveAudioFile,
    deleteAudioFile,
    isSupportedAudio
};