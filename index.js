module.exports = async function (context, req) {
    try {
        context.res = {
            status: 200,
            body: 'Welcome...'
        };
    } catch (error) {
        context.log.error('[ Welcome... ] ', error);
        context.res = {
            status: 500,
            body: '[ Welcome... ] ' + error.toString()
        };
    }
};
