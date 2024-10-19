/**
 * ATUALIZAR USUÁRIO
 *
 * Pode alterar  número de telefone, link, linkedin, email
 *
 *
 */
const User = require("../../Schemas/User");

module.exports = async (request, response) => {
  const _id = request.params._id;
  const phone_number = request.body.phone_number;
  const link = request.body.link;
  const linkedin = request.body.linkedin;
  const email = request.body.email;

  let user;
  try {
    user = await User.findById(_id).exec();

    if (user == null) {
      const arr = {
        status: "ERROR",
        message: "Usuário não encontrado!",
      };
      return response.status(404).send(arr);
    }
    if (email) {
      user.email = email;
    }
    if (phone_number) {
      user.phone_number = phone_number;
    }
    if (link) {
      user.link = link;
    }
  } catch (error) {
    const arr = {
      status: "ERROR",
      message: "Erro do servidor, tente novamente mais tarde!",
      data: error,
    };
    return response.status(500).send(arr);
  }

  user
    .save()
    .then(async (data) => {
      //Popula o curso, mas adiciona mais uma requisição

      return await User.single(_id);
    })
    .then((resolve) => {
      const arr = {
        status: "SUCCESS",
        data: resolve,
        message: "Usuário atualizado com sucesso!",
      };
      return response.status(200).send(arr);
    })
    .catch((reject) => {
      if (reject.code == 11000) {
        const arr = {
          status: "ERROR",
          message: "Email já está em uso!",
        };
        return response.status(409).send(arr);
      }
      const arr = {
        status: "ERROR",
        message: "Ocorreu um erro ao atualizar o usuário!",
        data: reject,
      };
      return response.status(500).send(arr);
    });
};
