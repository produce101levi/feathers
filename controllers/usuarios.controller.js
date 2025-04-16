exports.get_usuarios = async (request, response, next) => {
    try {
        // Llama al servicio Feathers para obtener todos los usuarios
        const usuarios = await request.app.service('api/usuarios').find();
        // Renderiza la vista EJS
        console.log(usuarios)
        response.render('list', { usuarios });
  } catch (error) {
        console.error(error);
        response.status(500).render('500'); // Tu vista de error
  }
};


exports.get_agregar_usuario = async (request, response, next) => {
    response.render('create');
};

exports.post_agregar_usuario = async (request, response, next) => {
    try {
        const { IDUsuario, Email, Nombre, FirebaseUID } = request.body;

        await request.app.service('api/usuarios').create({ 
            IDUsuario, 
            Email, 
            Nombre, 
            FirebaseUID 
      });
        response.redirect('/usuarios');
  } catch (error) {
        console.error(error);
        response.status(500).render('500');
  }
};

exports.get_modificar_usuario = async (request, response, next) => {
    try {
        const id = request.params.id;
        // Obtiene un usuario específico
        const usuario = await request.app.service('api/usuarios').get(id);
        response.render('edit', { usuario });
  } catch (error) {
        console.error(error);
        response.status(500).render('500');
  }
};

exports.post_modificar_usuario = async (request, response, next) => {
    try {
        const id = request.params.id;
        const { IDUsuario, Email, Nombre, FirebaseUID } = request.body;
        // Actualiza solo campos específicos con patch
        await request.app.service('api/usuarios').patch(
            id,
            { IDUsuario, Email, Nombre, FirebaseUID }
      );
        response.redirect('/usuarios');
  } catch (error) {
        console.error(error);
        response.status(500).render('500');
  }
};

exports.get_eliminar_usuario = async (request, response, next) => {
    try {
        const id = request.params.id;
        await request.app.service('api/usuarios').remove(id);
        response.redirect('/usuarios');
  } catch (error) {
        console.error(error);
        response.status(500).render('500');
  }
};