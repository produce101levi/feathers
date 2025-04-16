const { logger } = require('../logger');

async function logError(context, next){
    try {
        await next();
    } catch(error) {
        logger.error(error.stack);
        // Log validation errors
        if (error.data){
            logger.error('Data: %0', error.data);
        }
        throw error;
    }
}

module.exports = {
    logError
};