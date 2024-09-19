async function roda() {
  const Group = require("../Schemas/Group");
  const User = require("../Schemas/User");
  const Database = require("../Model/Database");
  const db = new Database();
  db.conect();

  const temasTCC = [
    "Inteligência Artificial na Medicina",
    "Blockchain na Gestão Pública",
    "Realidade Aumentada na Educação",
    "Análise de Dados para Prevenção de Crimes",
    "Desenvolvimento Sustentável e Tecnologias Verdes",
    "O Impacto das Redes Sociais na Saúde Mental",
    "Transformação Digital nas Pequenas Empresas",
    "Segurança da Informação em Sistemas de Pagamento Online",
    "Eficiência Energética em Edificações Comerciais",
    "Desenvolvimento de Aplicações Móveis para Saúde",
    "Tendências em Automação Industrial",
    "Big Data e Análise de Sentimentos em Redes Sociais",
    "Educação a Distância e seu Impacto no Ensino Superior",
    "Análise de Algoritmos de Machine Learning",
    "Gestão de Resíduos Sólidos e Tecnologias de Reciclagem",
    "Desafios e Oportunidades da Telemedicina",
    "Tecnologias Emergentes em Agricultura de Precisão",
    "A Evolução do Comércio Eletrônico",
    "Design de Interfaces para Experiência do Usuário",
    "O Futuro da Mobilidade Urbana e Veículos Elétricos",
    "A Influência da Internet das Coisas na Indústria 4.0",
    "Acessibilidade Digital em Plataformas Online",
    "Impacto das Tecnologias Emergentes na Privacidade",
    "Educação Ambiental e Tecnologias Sustentáveis",
    "Desenvolvimento de Software para Análise de Dados",
    "Estratégias de Marketing Digital para Startups",
    "O Papel da Automação no Setor de Serviços",
    "Tendências em Computação em Nuvem",
    "O Uso de Drones em Operações Logísticas",
    "O Papel da Inteligência Artificial na Pesquisa Científica",
    "Tecnologias para Gestão de Energia Renovável",
    "Blockchain e Contratos Inteligentes",
    "Análise de Dados para Tomada de Decisões em Negócios",
    "Desenvolvimento de Ferramentas de Acessibilidade para Deficientes",
    "Sistemas de Recomendação em Comércio Eletrônico",
  ];

  const users = await User.find({
    group_id: null,
    user_type: "Estudante",
  }).exec();

  let contador_estudantes = 0;
  for (let tema of temasTCC) {
    let group = new Group();
    group.title = tema;
    group.leader_id = users[contador_estudantes]._id;
    group.students = [
      users[contador_estudantes]._id,
      users[contador_estudantes + 1]._id,
      users[contador_estudantes + 2]._id,
    ];
    contador_estudantes += 3;

    const student = await User.findById(users[contador_estudantes]).exec();

    group.course_id = student.course_id;
    group.supervisor_id = "669b39c3f92952926863dd43";
    let res = await group.save();
    await User.updateOne({ _id: users[contador_estudantes] }, { group_id: res._id });
    await User.updateOne(
      { _id: users[contador_estudantes + 1] },
      { group_id: res._id }
    );
    await User.updateOne(
      { _id: users[contador_estudantes + 2] },
      { group_id: res._id }
    );
  }
}

roda();
