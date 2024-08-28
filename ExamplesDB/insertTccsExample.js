const Tcc = require("../Schemas/Tcc");
const Database = require("../Model/Database");
const db = new Database();
db.conect();

const data = [
  {
    _id: {
      $oid: "66c6839003712b97b7358738",
    },
    title: "Sistema de gestão de almoxarifado do curso técnico de eletrônica",
    summary:
      '"Este Trabalho de Conclusão de Curso (TCC) tem como objetivo desenvolver um sistema de gestão de almoxarifado específico para o curso técnico de eletrônica. A proposta surge da necessidade de otimizar o controle e a administração dos materiais e componentes eletrônicos utilizados pelos alunos e professores durante as aulas práticas e projetos.O sistema proposto visa informatizar e automatizar processos que, atualmente, são realizados de forma manual, resultando em maior eficiência, precisão e economia de tempo. Entre as funcionalidades principais do sistema estão o cadastro de materiais, controle de estoque, registro de entradas e saídas de itens, alertas para reposição de estoque, e geração de relatórios detalhados sobre a movimentação de materiais.A metodologia utilizada inclui a análise dos requisitos do almoxarifado, o levantamento das necessidades dos usuários, o desenvolvimento do software utilizando ferramentas adequadas e a implementação de testes para garantir o bom funcionamento do sistema. O projeto foi desenvolvido utilizando a linguagem de programação Python, com a biblioteca Tkinter para a interface gráfica e SQLite como banco de dados.Os resultados obtidos demonstraram que o sistema desenvolvido atendeu às expectativas, proporcionando um controle mais eficiente e preciso dos materiais, além de facilitar a gestão do almoxarifado. A implementação do sistema trouxe benefícios significativos, como a redução de erros na contagem de estoque, maior agilidade na localização de componentes e melhor planejamento na aquisição de novos materiais.Conclui-se que a informatização do almoxarifado do curso técnico de eletrônica é uma solução viável e benéfica, que pode ser expandida e adaptada para outras áreas e cursos, contribuindo para a melhoria da qualidade do ensino técnico.",',
    grade: 10,
    status: "1",
    document: null,
    monography: null,
    zip: null,
    image: null,
    date: {
      $date: "2024-08-25T22:08:06.404Z",
    },
    group_id: {
      $oid: "669b3aa2f92952926863dd75",
    },
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
    supervisor_id: {
      $oid: "669b39c3f92952926863dd55",
    },
  },
  {
    _id: {
      $oid: "66c7affe902c35306b57fb9b",
    },
    title: "Produção de biocombustível a partir de algas marinhas",
    summary:
      "Este Trabalho de Conclusão de Curso (TCC) tem como objetivo desenvolver um site para uma clínica de estética, visando melhorar a presença online da clínica, facilitar o agendamento de serviços e proporcionar uma melhor experiência para os clientes. A proposta surge da necessidade de modernizar a comunicação e o atendimento ao cliente, além de promover os serviços oferecidos pela clínica de maneira eficaz e atraente.O site proposto possui várias funcionalidades essenciais, incluindo:Informações sobre a Clínica: Página inicial com informações detalhadas sobre a clínica, sua missão, visão, valores, equipe de profissionais e instalações.Serviços Oferecidos: Descrição detalhada dos serviços disponíveis, como tratamentos faciais, corporais, depilação, massagens, entre outros, com preços e duração de cada tratamento.Agendamento Online: Sistema de agendamento online que permite aos clientes marcar consultas e tratamentos de forma conveniente, com integração de calendário e confirmação via e-mail ou SMS.Blog e Dicas de Beleza: Seção de blog com artigos e dicas de beleza, cuidados com a pele, tendências de estética, e outros conteúdos relevantes para atrair e engajar os visitantes do site.Depoimentos de Clientes: Área para depoimentos e avaliações de clientes satisfeitos, ajudando a construir credibilidade e confiança.Galeria de Fotos e Vídeos: Galeria visual com fotos e vídeos da clínica, tratamentos realizados, antes e depois, e eventos especiais.Contato e Localização: Página de contato com formulário para envio de mensagens, informações de contato, endereço da clínica e mapa interativo para facilitar a localização.Integração com Redes Sociais: Links para as redes sociais da clínica para aumentar a interação e visibilidade online.A metodologia utilizada para o desenvolvimento do site inclui a análise dos requisitos da clínica, pesquisa de mercado para identificar as melhores práticas em sites de clínicas de estética, design responsivo para garantir a acessibilidade em dispositivos móveis, e desenvolvimento utilizando tecnologias web modernas, como HTML, CSS, JavaScript, e frameworks como React ou Angular.Os resultados obtidos demonstraram que o site desenvolvido atendeu às expectativas, proporcionando uma interface amigável e intuitiva, facilitando o agendamento de serviços e melhorando a comunicação com os clientes. A implementação do sistema de agendamento online resultou em maior conveniência para os clientes e eficiência operacional para a clínica.Conclui-se que a criação de um site para a clínica de estética é uma solução eficaz para modernizar a presença online da clínica, melhorar a experiência do cliente e aumentar a visibilidade dos serviços oferecidos. O site pode ser continuamente atualizado com novos conteúdos e funcionalidades para manter a relevância e atratividade.",
    grade: 0,
    status: "0",
    document: null,
    monography: null,
    zip: null,
    image: null,
    date: {
      $date: "2024-08-25T22:08:06.408Z",
    },
    group_id: {
      $oid: "669b3ba0f92952926863dda1",
    },
    course_id: {
      $oid: "666da2bd91af7d6a607f717e",
    },
    __v: 0,
    supervisor_id: {
      $oid: "669b39c3f92952926863dd49",
    },
  },
  {
    _id: {
      $oid: "66c70f62d277579321ebb913",
    },
    title: "Repositório Digital para Trabalhos de Conclusão de Curso",
    summary:
      "Este Trabalho de Conclusão de Curso (TCC) tem como objetivo desenvolver um repositório digital para a gestão e armazenamento de Trabalhos de Conclusão de Curso (TCCs). A proposta surgiu da necessidade de organizar, centralizar e facilitar o acesso aos TCCs produzidos pelos alunos de uma instituição de ensino, garantindo a preservação e a disseminação do conhecimento produzido.O sistema proposto é uma plataforma web que permite aos alunos submeterem seus TCCs digitalmente, enquanto os professores e administradores podem revisar, aprovar e catalogar esses trabalhos. O repositório oferece funcionalidades como cadastro de usuários (alunos, professores e administradores), submissão de TCCs, revisão e aprovação, busca e visualização de trabalhos, e geração de relatórios. Além disso, o sistema garante a segurança dos dados armazenados e a integridade dos trabalhos submetidos.A metodologia utilizada para o desenvolvimento do repositório digital incluiu a análise de requisitos, definição da arquitetura do sistema, desenvolvimento da aplicação utilizando tecnologias web modernas (como HTML, CSS, JavaScript, Node.js, e MongoDB), e testes rigorosos para assegurar a funcionalidade e usabilidade da plataforma. A interface foi projetada para ser intuitiva e de fácil navegação, visando proporcionar uma boa experiência ao usuário.Os resultados demonstraram que o repositório digital atende às necessidades da instituição, facilitando a gestão dos TCCs e melhorando o acesso aos trabalhos produzidos. A plataforma permite uma maior transparência no processo de submissão e avaliação, além de incentivar a divulgação dos TCCs, contribuindo para a visibilidade e reconhecimento do trabalho dos alunos.Conclui-se que a implementação de um repositório digital para TCCs é uma solução eficaz para a gestão acadêmica, promovendo a organização, acessibilidade e preservação dos trabalhos acadêmicos. A plataforma pode ser expandida para incluir outras formas de produção acadêmica, como dissertações e teses, potencializando ainda mais os benefícios para a comunidade acadêmica.",
    grade: 0,
    status: "0",
    document: null,
    monography: null,
    zip: null,
    image: null,
    date: {
      $date: "2024-08-25T22:08:06.407Z",
    },
    group_id: {
      $oid: "669b3acdf92952926863dd80",
    },
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
    supervisor_id: {
      $oid: "669b39c3f92952926863dd43",
    },
  },
  {
    _id: {
      $oid: "66c713b9df04ed1dd4bd5873",
    },
    title:
      "Plataforma e ferramentar para auxiliar deficientes visuais no transporte público",
    summary:
      "Este Trabalho de Conclusão de Curso (TCC) tem como objetivo desenvolver uma plataforma e um conjunto de ferramentas para auxiliar deficientes visuais na utilização do transporte público. A proposta surge da necessidade de promover a inclusão e a acessibilidade para pessoas com deficiência visual, facilitando sua mobilidade e autonomia no uso de ônibus, metrôs e outros meios de transporte coletivo.A plataforma consiste em um aplicativo móvel que integra diversas funcionalidades para oferecer suporte a deficientes visuais. As principais funcionalidades incluem:Navegação Guiada: Utilizando tecnologia de geolocalização e mapas acessíveis, o aplicativo fornece instruções por voz para orientar o usuário desde a sua localização atual até o ponto de ônibus ou estação de metrô mais próxima.Informações em Tempo Real: Integração com sistemas de transporte público para fornecer informações em tempo real sobre horários de chegada e partida, mudanças de rota e outras atualizações relevantes.Reconhecimento de Ambiente: Utilização de visão computacional para identificar pontos de ônibus, placas e outros elementos do ambiente, fornecendo feedback auditivo ao usuário.Assistência por Voz: Assistente virtual que pode ser acionado por comandos de voz para obter informações, como linhas de ônibus disponíveis, horários e direções.Alertas e Notificações: Sistema de alertas para notificar o usuário sobre a proximidade do ponto de parada, mudanças de rota ou outras informações importantes durante a viagem.A metodologia de desenvolvimento incluiu a análise de requisitos específicos dos deficientes visuais, entrevistas e testes com usuários finais, além da integração com APIs de transporte público e serviços de mapas. O aplicativo foi desenvolvido utilizando tecnologias como React Native para a interface móvel, Node.js para o backend e serviços de visão computacional como o Google Vision API.Os resultados do projeto indicam que a plataforma proporciona uma significativa melhoria na experiência de transporte para deficientes visuais, aumentando sua autonomia e segurança. Os testes com usuários demonstraram que as funcionalidades do aplicativo são intuitivas e eficazes, facilitando a navegação e o acesso às informações necessárias durante o uso do transporte público.Conclui-se que a implementação de uma plataforma e ferramentas específicas para auxiliar deficientes visuais no transporte público é uma solução viável e impactante, que contribui para a inclusão social e a qualidade de vida desses indivíduos. A plataforma pode ser expandida para incluir outras funcionalidades e cobrir diferentes cidades e sistemas de transporte, ampliando ainda mais os benefícios para a comunidade.",
    grade: 0,
    status: "0",
    document: null,
    monography: null,
    zip: null,
    image: null,
    date: {
      $date: "2024-08-25T22:08:06.407Z",
    },
    group_id: {
      $oid: "669b3b12f92952926863dd8b",
    },
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
    supervisor_id: {
      $oid: "669b39c3f92952926863dd4f",
    },
  },
  {
    _id: {
      $oid: "66ce654cc7933509657257a4",
    },
    title: "Teste 2",
    summary: "todos 3",
    grade: 10,
    status: "1",
    document: null,
    monography: "Uploads/Monographys/66ce654cc7933509657257a4.pdf",
    zip: "Uploads/Zips/66ce654cc7933509657257a4.zip",
    image: null,
    group_id: {
      $oid: "66cdd623fde14f8764e82664",
    },
    course_id: {
      $oid: "666da2bd91af7d6a607f717e",
    },
    supervisor_id: {
      $oid: "669b39c3f92952926863dd43",
    },
    date: {
      $date: "2024-08-27T23:46:20.430Z",
    },
    __v: 0,
  },
];


data.map((_tcc) => {
  let tcc = new Tcc();
  tcc._id = _tcc._id.$oid;
  tcc.title = _tcc.title;
  tcc.summary = _tcc.summary;
  tcc.grade = _tcc.grade;
  tcc.status = _tcc.status;
  tcc.group_id = _tcc.group_id.$oid;
  tcc.course_id = _tcc.course_id.$oid;
  tcc.supervisor = _tcc.supervisor.$oid;
  tcc.save();
});
