require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const usuarioRouter = require('./routes/UsuarioRouter');
app.use('/usuarios', usuarioRouter);

app.listen(process.env.API_PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.API_PORT}`);
});