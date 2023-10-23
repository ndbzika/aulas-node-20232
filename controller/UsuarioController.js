const Usuario = require('../model/Usuario');
const client = require('../database/redis');

module.exports.listarUsuarios = async function (req, res) {
  const usuarios = await Usuario.findAll();
  res.status(200).send(usuarios);
};

module.exports.buscarPorEmail = async function (req, res) {
  const { email } = req.params;
  const cache = await client.get(email);
  console.log(cache);
  if (cache) {
    console.log('Cache');
    return res.send(cache);
  }
  const usuario = await Usuario.findByPk(email);

  if (!usuario) {
    return res.status(404).send('Usuário não encontrado');
  }
  await client.set(email, JSON.stringify(usuario.dataValues));
  return res.send(usuario);
};

module.exports.salvarUsuario = async function (req, res) {
  const usuario = Usuario.build(req.body);
  try {
    await usuario.save();
    res.status(201).send('Salvo');
  } catch {
    res.status(400).send('Falha ao salvar');
  }
};

module.exports.deletarUsuario = async function (req, res) {
  try {
    const deletados = await Usuario.destroy({
      where: { email: req.params.email },
    });
    if (deletados > 0) {
      res.status(200).send('Usuário removido');
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    res.status(400).send('Falha ao deletar');
  }
};

module.exports.atualizarUsuario = async function (req, res) {
  try {
    const atualizados = await Usuario.update(req.body, {
      where: { email: req.params.email },
    });
    if (atualizados > 0) {
      res.status(200).send('Usuário atualizado');
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    res.status(400).send('Falha ao atualizar');
  }
};
