const express = require('express');

const router = express.Router();

const usuariosController = require('../controllers/usuarios.controller');

// Listar Usuarios
router.get('/', usuariosController.get_usuarios);

// Mostrar Formulario para Crear
router.get('/create', usuariosController.get_agregar_usuario);
router.post('/create', usuariosController.post_agregar_usuario);

// Mostrar Formulario para Editar
router.get('/edit/:id', usuariosController.get_modificar_usuario);
router.post('/edit/:id', usuariosController.post_modificar_usuario);

// Eliminar Usuario
router.get('/delete/:id', usuariosController.get_eliminar_usuario);

module.exports = router;