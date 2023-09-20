const express = require('express');
const app = express();
app.use(express.json());

const usuarioRouter = require('./routes/UsuarioRouter');
app.use('/usuarios', usuarioRouter);

app.listen(3000);