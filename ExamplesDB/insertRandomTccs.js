async function roda() {
  const Tcc = require("../Schemas/Tcc");
  const Group = require("../Schemas/Group");
  const Database = require("../Model/Database");
  const db = new Database();
  db.conect();

  const resumosTCC = [
    "Estudo sobre a aplicação de IA para diagnósticos médicos, análise de dados clínicos e automação de processos hospitalares, discutindo vantagens e desafios.",
    "Análise de como a tecnologia blockchain pode trazer maior transparência e segurança para processos administrativos e financeiros na gestão pública.",
    "Investigação sobre como a realidade aumentada pode ser usada para melhorar o aprendizado em sala de aula, tornando o ensino mais interativo e imersivo.",
    "Exploração de técnicas de análise de dados para prever e prevenir atividades criminosas, utilizando algoritmos e modelagem preditiva.",
    "Estudo sobre práticas de desenvolvimento sustentável e a aplicação de tecnologias verdes para minimizar impactos ambientais e promover a sustentabilidade.",
    "Análise de como o uso das redes sociais pode afetar a saúde mental dos usuários, incluindo aspectos positivos e negativos.",
    "Investigação sobre como pequenas empresas estão adotando tecnologias digitais para melhorar operações e competitividade, e os desafios enfrentados.",
    "Estudo sobre segurança da informação em sistemas de pagamento online, incluindo criptografia, autenticação e proteção contra fraudes.",
    "Análise de estratégias para melhorar a eficiência energética em edificações comerciais, utilizando tecnologias e práticas sustentáveis.",
    "Desenvolvimento de aplicações móveis para a área da saúde, focando em monitoramento de condições, gerenciamento de dados e interação com usuários.",
    "Investigação sobre as tendências atuais em automação industrial e seu impacto na eficiência e produtividade dos processos de fabricação.",
    "Estudo sobre como big data e análise de sentimentos em redes sociais podem fornecer insights sobre comportamentos e tendências de mercado.",
    "Análise do impacto da educação a distância no ensino superior, incluindo benefícios, desafios e a eficácia das plataformas de aprendizado online.",
    "Exploração de algoritmos de machine learning e suas aplicações em diferentes setores, como finanças, saúde e marketing.",
    "Estudo sobre gestão de resíduos sólidos e tecnologias de reciclagem para melhorar a eficiência e reduzir o impacto ambiental.",
    "Investigação dos desafios e oportunidades proporcionados pela telemedicina, incluindo aspectos técnicos, éticos e legais.",
    "Análise das tecnologias emergentes em agricultura de precisão, como sensores e drones, e seu impacto na produtividade e sustentabilidade agrícola.",
    "Estudo sobre a evolução do comércio eletrônico e como as tecnologias emergentes estão transformando a experiência de compra online.",
    "Análise do design de interfaces e sua importância para a experiência do usuário em aplicações e websites, incluindo princípios e melhores práticas.",
    "Investigação sobre o futuro da mobilidade urbana, incluindo veículos elétricos e outras inovações para melhorar o transporte nas cidades.",
    "Estudo sobre a influência da Internet das Coisas (IoT) na Indústria 4.0, abordando automação, eficiência e integração de sistemas.",
    "Análise da acessibilidade digital em plataformas online e como as práticas de design inclusivo podem melhorar a experiência para todos os usuários.",
    "Investigação sobre o impacto das tecnologias emergentes na privacidade, incluindo questões de segurança e regulamentações de proteção de dados.",
    "Estudo sobre educação ambiental e o uso de tecnologias sustentáveis para promover a conscientização e práticas ecológicas.",
    "Desenvolvimento de software para análise de dados, abordando ferramentas e técnicas para processar e interpretar grandes volumes de informação.",
    "Análise de estratégias de marketing digital para startups, incluindo técnicas para aumentar a visibilidade e atrair clientes em um mercado competitivo.",
    "Investigação sobre o papel da automação no setor de serviços, focando em como as tecnologias estão transformando operações e atendimento ao cliente.",
    "Estudo sobre as tendências atuais em computação em nuvem, incluindo serviços, segurança e modelos de implementação.",
    "Investigação sobre o uso de drones em operações logísticas, como transporte de mercadorias e monitoramento, e os benefícios e desafios associados.",
    "Análise do papel da inteligência artificial na pesquisa científica, incluindo suas aplicações para acelerar descobertas e otimizar processos de pesquisa.",
    "Estudo sobre tecnologias para gestão de energia renovável, abordando soluções para melhorar a eficiência e integração de fontes de energia verde.",
    "Investigação sobre blockchain e contratos inteligentes, explorando como essas tecnologias podem ser aplicadas para garantir a segurança e transparência em transações.",
    "Análise de como a análise de dados pode auxiliar na tomada de decisões empresariais, incluindo técnicas e ferramentas para interpretar informações e gerar insights.",
    "Desenvolvimento de ferramentas de acessibilidade para deficientes, com foco em como as tecnologias podem ser usadas para melhorar a inclusão e a qualidade de vida.",
    "Estudo sobre sistemas de recomendação em comércio eletrônico, explorando como algoritmos personalizados podem melhorar a experiência de compra e aumentar as vendas.",
  ];

  const groups = await Group.find({ tcc_id: null }).exec();

  let contador = 0;
  for (let resumo of resumosTCC) {
    let tcc = new Tcc();

    tcc.summary = resumo;
    tcc.status = "1";

    let group = await Group.findById(groups[contador]._id).exec();
    tcc.title = group.title;
    tcc.group_id = group._id;
    tcc.course_id = group.course_id;
    tcc.supervisor_id = group.supervisor_id;
    const resp = await tcc.save();
    group.tcc_id = resp._id;
    await group.save();
    await Tcc.addNamesString(resp._id);
    contador += 1;
  }
}

roda();
