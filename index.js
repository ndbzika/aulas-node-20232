const express = require('express');
const app = express();
app.use(express.json());

const Usuario = require('./model/Usuario');

app.get('/usuarios', async function (req, res) {
  const usuarios = await Usuario.findAll();
  res.status(200).send(usuarios);
});

app.get('/usuarios/:email', async function(req,res){
  const usuario = await Usuario.findByPk(req.params.email);

  if(usuario){
    res.status(200).send(usuario);
  }else{
    res.status(404).send('Usuário não encontrado');
  }

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

app.delete('/usuarios/:email', async function(req,res){
  try{
    const deletados = await Usuario.destroy({
      where: {
        email: req.params.email
      }
    });
    if(deletados>0){
      res.status(200).send('Usuário removido');
    }else{
      res.status(404).send('Usuário não encontrado');
    }
  }catch(error){
    res.status(400).send('Falha ao deletar');
  }
});

app.listen(3000);