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
    title: "Sistema de gestão de almoxarifado do curso técnico de eletrônica",
    leader_id: {
      $oid: "669b39c1f92952926863dce7",
    },
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    status: "0",
    __v: 2,
    tcc_id: {
      $oid: "66c6839003712b97b7358738",
    },
    supervisor_id: {
      $oid: "669b39c3f92952926863dd55",
    },
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
    title: "Repositório Digital para Trabalhos de Conclusão de Curso",
    leader_id: {
      $oid: "669b39c2f92952926863dcff",
    },
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    status: "0",
    __v: 2,
    tcc_id: {
      $oid: "66c70f62d277579321ebb913",
    },
    supervisor_id: {
      $oid: "669b39c3f92952926863dd43",
    },
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
    title:
      "Plataforma e ferramentar para auxiliar deficientes visuais no transporte público",
    leader_id: {
      $oid: "669b39c2f92952926863dd1d",
    },
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    status: "0",
    __v: 2,
    tcc_id: {
      $oid: "66c713b9df04ed1dd4bd5873",
    },
    supervisor_id: {
      $oid: "669b39c3f92952926863dd4f",
    },
  },
  {
    _id: {
      $oid: "669b3b65f92952926863dd96",
    },
    students: [
      {
        $oid: "669b39c3f92952926863dd2f",
      },
      {
        $oid: "669b39c2f92952926863dd29",
      },
      {
        $oid: "669b39c3f92952926863dd35",
      },
    ],
    title: "Site para clínica de estética",
    leader_id: {
      $oid: "669b39c3f92952926863dd2f",
    },
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    status: "0",
    __v: 2,
    tcc_id: {
      $oid: "66c7afde902c35306b57fb95",
    },
    supervisor_id: {
      $oid: "669b39c3f92952926863dd55",
    },
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
    title: "Produção de biocombustível a partir de algas marinhas",
    leader_id: {
      $oid: "669b39c2f92952926863dd05",
    },
    course_id: {
      $oid: "666da2bd91af7d6a607f717e",
    },
    status: "0",
    __v: 0,
    tcc_id: {
      $oid: "66c7affe902c35306b57fb9b",
    },
    supervisor_id: {
      $oid: "669b39c3f92952926863dd49",
    },
  },
];

data.map((_group) => {
  try {
    let newStudents = [];
    _group.students.map((student)=>{
      newStudents.push(student.$oid);
    })
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
