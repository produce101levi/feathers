const { Service } = require('feathers-mongoose');
const UsuarioModel = require('../models/usuario.model');
const { log } = require('../hooks/console-log');

class TestOneService extends Service {

}

function testOneService(app){
    const options = {
        Model: UsuarioModel,
        paginate: false
    };

    const service = app.use('/api/test_one', new TestOneService(options));

    service.hooks({
        before: {
            all: [log]
        }
    })
}

module.exports = {
    testOneService
}