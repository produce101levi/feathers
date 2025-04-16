const { Service } = require('feathers-mongoose');
const UsuarioModel = require('../models/usuario.model');
const { loggerTwo } = require('../hooks/console-log2');

class TestTwoService extends Service {

}

function testTwoService(app){
    const options = {
        Model: UsuarioModel,
        paginate: false
    };

    const service = app.use('/api/test_two', new TestTwoService(options));

    service.hooks({
            before: {
                all: [loggerTwo]
            }
        })

}

module.exports = {
    testTwoService
}