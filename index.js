const Usuario = require('./model/Usuario');

async function salvar(){
  const usuario = Usuario.build({email:"joao@gmail.com", nome:"João"});

  await usuario.save();
  console.log('Salvo');

}

salvar();