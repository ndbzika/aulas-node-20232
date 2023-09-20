const express = require('express');
const usuarioRouter = express.Router();
const usuarioController = require('../controller/UsuarioController');

usuarioRouter.get('/', usuarioController.listarUsuarios);
usuarioRouter.get('/:email', usuarioController.buscarPorEmail);
usuarioRouter.post('/', usuarioController.salvarUsuario);
usuarioRouter.delete('/:email', usuarioController.deletarUsuario);
usuarioRouter.put('/:email', usuarioController.atualizarUsuario);

module.exports = usuarioRouter;