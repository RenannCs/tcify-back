const Group = require("../Schemas/Group");
const Database = require("../Model/Database");
const db = new Database();
db.conect();

const data = [
  {
    _id: {
      $oid: "669b3aa2f92952926863dd75",
    },
    students: [
      {
        $oid: "669b39c1f92952926863dce7",
      },
      {
        $oid: "669b39c1f92952926863dce1",
      },
      {
        $oid: "669b39c1f92952926863dced",
      },
    ],
    tcc_id: {
      $oid: "66c6839003712b97b7358738",
    },
    status: "0",
    title: "Sistema de gestão de almoxarifado do curso técnico de eletrônica",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    supervisor_id: {
      $oid: "669b39c3f92952926863dd55",
    },
    leader_id: {
      $oid: "669b39c1f92952926863dce7",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b3b12f92952926863dd8b",
    },
    students: [
      {
        $oid: "669b39c2f92952926863dd1d",
      },
      {
        $oid: "669b39c2f92952926863dd17",
      },
      {
        $oid: "669b39c2f92952926863dd23",
      },
    ],
    tcc_id: {
      $oid: "66c713b9df04ed1dd4bd5873",
    },
    status: "0",
    title:
      "Plataforma e ferramentar para auxiliar deficientes visuais no transporte público",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    supervisor_id: {
      $oid: "669b39c3f92952926863dd4f",
    },
    leader_id: {
      $oid: "669b39c2f92952926863dd1d",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b3acdf92952926863dd80",
    },
    students: [
      {
        $oid: "669b39c2f92952926863dcff",
      },
      {
        $oid: "669b39c1f92952926863dcf3",
      },
      {
        $oid: "669b39c1f92952926863dcf9",
      },
    ],
    tcc_id: {
      $oid: "66c70f62d277579321ebb913",
    },
    status: "0",
    title: "Repositório Digital para Trabalhos de Conclusão de Curso",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    supervisor_id: {
      $oid: "669b39c3f92952926863dd43",
    },
    leader_id: {
      $oid: "669b39c2f92952926863dcff",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b3ba0f92952926863dda1",
    },
    students: [
      {
        $oid: "669b39c2f92952926863dd05",
      },
    ],
    tcc_id: {
      $oid: "66c7affe902c35306b57fb9b",
    },
    status: "0",
    title: "Produção de biocombustível a partir de algas marinhas",
    course_id: {
      $oid: "666da2bd91af7d6a607f717e",
    },
    supervisor_id: {
      $oid: "669b39c3f92952926863dd49",
    },
    leader_id: {
      $oid: "669b39c2f92952926863dd05",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "66cdd623fde14f8764e82664",
    },
    students: [
      {
        $oid: "66cdd5effde14f8764e8263d",
      },
      {
        $oid: "66cdd5fefde14f8764e82643",
      },
      {
        $oid: "66cdd60afde14f8764e82649",
      },
    ],
    tcc_id: {
      $oid: "66ce654cc7933509657257a4",
    },
    status: "1",
    title: "Teste",
    leader_id: {
      $oid: "66cdd5effde14f8764e8263d",
    },
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    supervisor_id: {
      $oid: "669b39c3f92952926863dd49",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "66ce6e1c839ca0d250458465",
    },
    students: [
      {
        $oid: "669b39c2f92952926863dd29",
      },
      {
        $oid: "669b39c3f92952926863dd35",
      },
      {
        $oid: "669b39c3f92952926863dd2f",
      },
    ],
    tcc_id: null,
    status: "1",
    title: "Estética",
    leader_id: {
      $oid: "669b39c2f92952926863dd29",
    },
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    supervisor_id: {
      $oid: "669b39c3f92952926863dd55",
    },
    __v: 0,
  },
];

data.map((_group) => {
  try {
    let newStudents = [];
    _group.students.map((student) => {
      newStudents.push(student.$oid);
    });
    let group = new Group();
    group._id = _group._id.$oid;
    group.title = _group.title;
    group.students = newStudents;
    group.course_id = _group.course_id.$oid;
    group.supervisor_id = _group.supervisor_id.$oid;
    group.tcc_id = _group.tcc_id ? _group.tcc_id.$oid : null;
    group.leader_id = _group.leader_id.$oid;
    group.status = _group.status;
    group.save();
  } catch (error) {
    console.log(error);
  }
});
