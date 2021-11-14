const { Transform } = require('stream');

class myTransform extends Transform {
    constructor(action) {
        super();
        this.action = action;
    }
    _transform(chunk, encoding, callback) {
        let chunkString = chunk.toString();
        callback(null, this.action(chunkString));
    }
}
module.exports = myTransform;