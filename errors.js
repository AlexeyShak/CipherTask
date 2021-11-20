module.exports = {
    throwError: (message, code) => {
        process.exitCode = code || 1;
        throw message ?  Error(message) : Error('Unhandeled error');
    }
} 