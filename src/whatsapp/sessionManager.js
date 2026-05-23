const sessions = {};

/**
 * Create or update a user session
 */
function saveSession(userId, data) {

    sessions[userId] = {
        ...sessions[userId],
        ...data,
        updatedAt: new Date()
    };
}

/**
 * Get existing session
 */
function getSession(userId) {
    return sessions[userId] || null;
}

/**
 * Delete session
 */
function deleteSession(userId) {

    if (sessions[userId]) {
        delete sessions[userId];
    }
}

/**
 * Check if session exists
 */
function hasSession(userId) {
    return !!sessions[userId];
}

/**
 * Get all active sessions
 */
function getAllSessions() {
    return sessions;
}

/**
 * Clear expired sessions
 * (default: 1 hour)
 */
function cleanupExpiredSessions(expiryMinutes = 60) {

    const now = Date.now();

    Object.keys(sessions).forEach(userId => {

        const updatedAt =
            new Date(sessions[userId].updatedAt).getTime();

        const diffMinutes =
            (now - updatedAt) / (1000 * 60);

        if (diffMinutes > expiryMinutes) {

            console.log(
                `🗑️ Removing expired session: ${userId}`
            );

            delete sessions[userId];
        }
    });
}

module.exports = {
    saveSession,
    getSession,
    deleteSession,
    hasSession,
    getAllSessions,
    cleanupExpiredSessions
};