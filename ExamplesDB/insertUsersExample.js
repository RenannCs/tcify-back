const User = require("../Schemas/User");
const Database = require("../Model/Database");
const db = new Database();
db.conect();
const data = [
  {
    _id: {
      $oid: "669844add5dad17b232396a2",
    },
    name: "Super Admin",
    email: "admin@admin.com",
    register: "0000001",
    user_type: "Administrador",
    phone_number: "1194sas85158",
    link: "linkedin.link",
    status: true,
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2bd91af7d6a607f717e",
    },
    __v: 0,
    image: "Uploads/UsersImages/669844add5dad17b232396a2.jpeg",
  },
  {
    _id: {
      $oid: "669b39c1f92952926863dce1",
    },
    status: true,
    name: "Isabele Pires",
    email: "isabelepires@gmail.com",
    register: "50220123",
    user_type: "Estudante",
    phone_number: "11948521814",
    link: "123.link",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c1f92952926863dce7",
    },
    status: true,
    name: "Marina Ribeiro",
    email: "marinaribeiro4612@gmail.com",
    register: "50220666",
    user_type: "Estudante",
    phone_number: "11948521814",
    link: "123.link",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c1f92952926863dced",
    },
    status: true,
    name: "Mileny Sabrina",
    email: "milenysabrina98@gmail",
    register: "50220789",
    user_type: "Estudante",
    link: "123.link",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c1f92952926863dcf3",
    },
    status: true,
    name: "Enzo Lelis",
    email: "enzolelis12@gmail.com",
    register: "50220159",
    user_type: "Estudante",
    phone_number: "11948521814",
    link: "123.link",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c1f92952926863dcf9",
    },
    status: true,
    name: "Renan Cordeiro Santo",
    email: "rcordeiro945@gmail.com",
    register: "50220404",
    user_type: "Estudante",
    phone_number: "11948521814",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c2f92952926863dcff",
    },
    status: true,
    name: "Thiago Bitencourt Sancho",
    email: "thiagosancho2006@gmail.com",
    register: "50220434",
    user_type: "Estudante",
    phone_number: "11948521814",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c2f92952926863dd05",
    },
    status: true,
    name: "Rayssa Texeira Brito",
    email: "rayssateixeira@gmail.com",
    register: "50220731",
    user_type: "Estudante",
    link: "123.link",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2bd91af7d6a607f717e",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c2f92952926863dd0b",
    },
    status: true,
    name: "Giovanna Alckmin",
    email: "giovannalckmin@gmail.com",
    register: "50220951",
    user_type: "Estudante",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2bd91af7d6a607f717e",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c2f92952926863dd11",
    },
    status: true,
    name: "Camila Cunha",
    email: "camilacunha@gmail.com",
    register: "50220357",
    user_type: "Estudante",
    link: "123.link",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2bd91af7d6a607f717e",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c2f92952926863dd17",
    },
    status: true,
    name: "Matheus Cavalerio",
    email: "matheuscavaleiro36@gmail.com",
    register: "50220456",
    user_type: "Estudante",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c2f92952926863dd1d",
    },
    status: true,
    name: "Giovana Franco",
    email: "gigifrancosantos@gmail.com",
    register: "50220654",
    user_type: "Estudante",
    phone_number: "11948521814",
    link: "123.link",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c2f92952926863dd23",
    },
    status: true,
    name: "Beatriz Faria",
    email: "beatrizfariamendes@gmail.com",
    register: "50220852",
    user_type: "Estudante",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c2f92952926863dd29",
    },
    status: true,
    name: "Kauê Cordeiro de Abreu",
    email: "kauecordeiro@gmail.com",
    register: "50220039",
    user_type: "Estudante",
    phone_number: "11948521814",
    link: "123.link",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c3f92952926863dd2f",
    },
    status: true,
    name: "Kethlin Gouveia",
    email: "gouveiakethlin@gmail.com",
    register: "50220733",
    user_type: "Estudante",
    phone_number: "11948521814",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c3f92952926863dd35",
    },
    status: true,
    name: "Guilherme Cordeiro",
    email: "guilhermecordeiro@gmail.com",
    register: "50220746",
    user_type: "Estudante",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c3f92952926863dd3b",
    },
    status: true,
    name: "Alberson Wander Sá dos Santos",
    email: "thiagosancho20061@gmail.com",
    register: "502206477",
    user_type: "Administrador",
    link: "123.link",
    password: "202cb962ac59075b964b07152d234b70",
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c3f92952926863dd3f",
    },
    status: true,
    name: "Ana Paula",
    email: "anapaula@gmail.com",
    register: "502204537",
    user_type: "Administrador",
    link: "123.link",
    password: "202cb962ac59075b964b07152d234b70",
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c3f92952926863dd43",
    },
    status: true,
    name: "Hélio Esperidião",
    email: "helioesperidiao@gmail.com",
    register: "502205265",
    user_type: "Professor",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c3f92952926863dd49",
    },
    status: true,
    name: "Marcia Máia",
    email: "marciomaia@gmail.com",
    register: "502206345",
    user_type: "Professor",
    link: "123.link",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2bd91af7d6a607f717e",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c3f92952926863dd4f",
    },
    status: true,
    name: "Adriana Nakahara",
    email: "adriananakahara@gmail.com",
    register: "502204285",
    user_type: "Professor",
    phone_number: "11948521814",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c3f92952926863dd55",
    },
    status: true,
    name: "Bruno Michel",
    email: "brunomichel@gmail.com",
    register: "502204846",
    user_type: "Professor",
    link: "123.link",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "666da2b791af7d6a607f717b",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "669b39c3f92952926863dd5b",
    },
    status: true,
    name: "Tatiana Roberta Bitencourt Sancho",
    email: "tatianasancho2020@gmail.com",
    register: "502207548",
    user_type: "Estudante",
    password: "202cb962ac59075b964b07152d234b70",
    course_id: {
      $oid: "66831ee9dfed1adc24ab1340",
    },
    __v: 0,
  },
];

data.map((_user) => {
  const user = new User();
  user._id = _user._id.$oid;
  user.name = _user.name;
  user.course_id =
    _user.course_id == undefined ? undefined : _user.course_id.$oid;
  user.register = _user.register;
  user.email = _user.email;
  user.password = "123";
  user.phone_number = _user.phone_number;
  user.link = _user.link;
  user.user_type = _user.user_type;
  user.status = "1";
  user.save();
});
