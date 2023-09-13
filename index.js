const express = require('express');
const app = express();
app.use(express.json());

const Usuario = require('./model/Usuario');

app.get('/usuarios', async function (req, res) {
  const usuarios = await Usuario.findAll();
  res.status(200).send(usuarios);
});

app.post('/usuarios', async function (req, res){
  const usuario = Usuario.build(req.body);
  try{
    await usuario.save();
    res.status(201).send('Salvo');
  }catch{
    res.status(400).send('Falha ao salvar');
  }
});

app.listen(3000);