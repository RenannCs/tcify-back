const User = require("../Schemas/User");
const Database = require("../Model/Database");
const db = new Database();
db.conect();
const data = [{
  "_id": {
    "$oid": "669b39c3f92952926863dd3b"
  },
  "email": "thiagosancho20061@gmail.com",
  "phone_number": null,
  "link": "123.link",
  "user_type": "Administrador",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.995Z"
  },
  "name": "Alberson Wander Sá dos Santos",
  "register": "50220647",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0,
  "course_id": {
    "$oid": "666da2db91af7d6a607f7182"
  }
},
{
  "_id": {
    "$oid": "669b39c3f92952926863dd3f"
  },
  "email": "anapaula@gmail.com",
  "phone_number": null,
  "link": "123.link",
  "user_type": "Administrador",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.995Z"
  },
  "name": "Ana Paula",
  "register": "502204537",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c1f92952926863dcf3"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "enzolelis12@gmail.com",
  "phone_number": "11948521814",
  "link": "123.link",
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.991Z"
  },
  "name": "Enzo Lelis",
  "register": "50220159",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c1f92952926863dcf9"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "rcordeiro945@gmail.com",
  "phone_number": "11948521814",
  "link": null,
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.992Z"
  },
  "name": "Renan Cordeiro Santo",
  "register": "50220404",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669844add5dad17b232396a2"
  },
  "course_id": {
    "$oid": "666da2bd91af7d6a607f717e"
  },
  "email": "admin@admin.com",
  "phone_number": "1194sas85158",
  "link": "linkedin.link",
  "user_type": "Administrador",
  "image": "Uploads/UsersImages/669844add5dad17b232396a2.jpeg",
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.985Z"
  },
  "name": "Super Admin",
  "register": "0000001",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c2f92952926863dcff"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "thiagosancho2006@gmail.com",
  "phone_number": "11948521814",
  "link": null,
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.992Z"
  },
  "name": "Thiago Bitencourt Sancho",
  "register": "50220434",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c1f92952926863dce1"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "isabelepires@gmail.com",
  "phone_number": "11948521814",
  "link": "123.link",
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.990Z"
  },
  "name": "Isabele Pires",
  "register": "50220123",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c2f92952926863dd17"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "matheuscavaleiro36@gmail.com",
  "phone_number": null,
  "link": null,
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.993Z"
  },
  "name": "Matheus Cavalerio",
  "register": "50220456",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c1f92952926863dce7"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "marinaribeiro4612@gmail.com",
  "phone_number": "11948521814",
  "link": "123.link",
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.991Z"
  },
  "name": "Marina Ribeiro",
  "register": "50220666",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c2f92952926863dd0b"
  },
  "course_id": {
    "$oid": "666da2bd91af7d6a607f717e"
  },
  "email": "giovannalckmin@gmail.com",
  "phone_number": null,
  "link": null,
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.993Z"
  },
  "name": "Giovanna Alckmin",
  "register": "50220951",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c2f92952926863dd1d"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "gigifrancosantos@gmail.com",
  "phone_number": "11948521814",
  "link": "123.link",
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.994Z"
  },
  "name": "Giovana Franco",
  "register": "50220654",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c2f92952926863dd29"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "kauecordeiro@gmail.com",
  "phone_number": "11948521814",
  "link": "123.link",
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.994Z"
  },
  "name": "Kauê Cordeiro de Abreu",
  "register": "50220039",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c3f92952926863dd2f"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "gouveiakethlin@gmail.com",
  "phone_number": "11948521814",
  "link": null,
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.994Z"
  },
  "name": "Kethlin Gouveia",
  "register": "50220733",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c2f92952926863dd23"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "beatrizfariamendes@gmail.com",
  "phone_number": null,
  "link": null,
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.994Z"
  },
  "name": "Beatriz Faria",
  "register": "50220852",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c3f92952926863dd35"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "guilhermecordeiro@gmail.com",
  "phone_number": null,
  "link": null,
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.995Z"
  },
  "name": "Guilherme Cordeiro",
  "register": "50220746",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c3f92952926863dd43"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "helioesperidiao@gmail.com",
  "phone_number": null,
  "link": null,
  "user_type": "Professor",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.995Z"
  },
  "name": "Hélio Esperidião",
  "register": "502205265",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c3f92952926863dd49"
  },
  "course_id": {
    "$oid": "666da2bd91af7d6a607f717e"
  },
  "email": "marciomaia@gmail.com",
  "phone_number": null,
  "link": "123.link",
  "user_type": "Professor",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.995Z"
  },
  "name": "Marcia Máia",
  "register": "502206345",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c3f92952926863dd4f"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "adriananakahara@gmail.com",
  "phone_number": "11948521814",
  "link": null,
  "user_type": "Professor",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.996Z"
  },
  "name": "Adriana Nakahara",
  "register": "502204285",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c3f92952926863dd55"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "brunomichel@gmail.com",
  "phone_number": null,
  "link": "123.link",
  "user_type": "Professor",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.996Z"
  },
  "name": "Bruno Michel",
  "register": "502204846",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c3f92952926863dd5b"
  },
  "course_id": {
    "$oid": "66831ee9dfed1adc24ab1340"
  },
  "email": "tatianasancho2020@gmail.com",
  "phone_number": null,
  "link": null,
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.996Z"
  },
  "name": "Tatiana Roberta Bitencourt Sancho",
  "register": "502207548",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c2f92952926863dd05"
  },
  "course_id": {
    "$oid": "666da2bd91af7d6a607f717e"
  },
  "email": "rayssateixeira@gmail.com",
  "phone_number": null,
  "link": "123.link",
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.993Z"
  },
  "name": "Rayssa Texeira Brito",
  "register": "50220731",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c2f92952926863dd11"
  },
  "course_id": {
    "$oid": "666da2bd91af7d6a607f717e"
  },
  "email": "camilacunha@gmail.com",
  "phone_number": null,
  "link": "123.link",
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.993Z"
  },
  "name": "Camila Cunha Pereira",
  "register": "50220357",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "669b39c1f92952926863dced"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "milenysabrina98@gmail",
  "phone_number": null,
  "link": "123.link",
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-25T21:58:26.991Z"
  },
  "name": "Mileny Sabrina",
  "register": "50220789",
  "password": "202cb962ac59075b964b07152d234b70",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "66cdd5effde14f8764e8263d"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "re",
  "phone_number": null,
  "link": null,
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-27T13:34:39.581Z"
  },
  "name": "fafa",
  "password": "b30a8d08d123440e5b51d5574ed679a9",
  "register": "47847847",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "66cdd5fefde14f8764e82643"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "323",
  "phone_number": null,
  "link": null,
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-27T13:34:54.928Z"
  },
  "name": "fefe",
  "password": "a587c3ad9ff85bceed026c8fe9c0a1e7",
  "register": "78778787",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "66cdd60afde14f8764e82649"
  },
  "course_id": {
    "$oid": "666da2b791af7d6a607f717b"
  },
  "email": "432",
  "phone_number": null,
  "link": null,
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-27T13:35:06.736Z"
  },
  "name": "fifi",
  "password": "085217a52cbe28fcaa5369a682a9a627",
  "register": "42342421",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "66cde3864611e51aa0d27e75"
  },
  "course_id": {
    "$oid": "666da2bd91af7d6a607f717e"
  },
  "email": "w",
  "phone_number": null,
  "link": null,
  "user_type": "Professor",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-27T14:32:38.444Z"
  },
  "name": "aa",
  "password": "202cb962ac59075b964b07152d234b70",
  "register": "24510452",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "66cf257e0ef830224a2922cf"
  },
  "course_id": {
    "$oid": "666da2db91af7d6a607f7182"
  },
  "email": "y",
  "phone_number": null,
  "link": null,
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-28T13:26:22.718Z"
  },
  "name": "fofo",
  "password": "f584c459a5ecaf18a7ebcb89e41a5ed6",
  "register": "54548448",
  "linkedin": null,
  "__v": 0
},
{
  "_id": {
    "$oid": "66cf25f30ef830224a2922dc"
  },
  "course_id": {
    "$oid": "666da2db91af7d6a607f7182"
  },
  "email": "ds",
  "phone_number": null,
  "link": null,
  "user_type": "Estudante",
  "image": null,
  "status": "1",
  "date": {
    "$date": "2024-08-28T13:28:19.163Z"
  },
  "name": "fufu",
  "password": "bbd5cffe0520a3de7249f9e2b2791506",
  "register": "87484848",
  "linkedin": null,
  "__v": 0
}];
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
