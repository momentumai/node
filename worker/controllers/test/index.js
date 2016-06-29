function handler (event, context) {
    context.succeed({
        'hello': 'world'
    });
}

module.exports.handler = handler;
