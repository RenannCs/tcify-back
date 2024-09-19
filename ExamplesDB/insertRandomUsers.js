const User = require("../Schemas/User");

const Database = require("../Model/Database");
const db = new Database();
db.conect();

const nomes = [
  "Alice",
  "Bruno",
  "Carla",
  "Daniel",
  "Eduardo",
  "Fernanda",
  "Gabriel",
  "Helena",
  "Igor",
  "Julia",
  "Kevin",
  "Laura",
  "Marcelo",
  "Natalia",
  "Oscar",
  "Patricia",
  "Ricardo",
  "Sabrina",
  "Thiago",
  "Vanessa",
  "André",
  "Beatriz",
  "Caio",
  "Diego",
  "Elisa",
  "Felipe",
  "Gustavo",
  "Heloisa",
  "Isabel",
  "João",
  "Karina",
  "Leonardo",
  "Mariana",
  "Nelson",
  "Olivia",
  "Pedro",
  "Raquel",
  "Samuel",
  "Tatiana",
  "Victor",
  "Ana",
  "Bernardo",
  "Camila",
  "Douglas",
  "Evelyn",
  "Felicia",
  "Guilherme",
  "Hugo",
  "Isabela",
  "José",
  "Katia",
  "Lucas",
  "Monica",
  "Nicolas",
  "Otavio",
  "Paula",
  "Renato",
  "Silvia",
  "Tomás",
  "Valeria",
  "Artur",
  "Barbara",
  "Cecilia",
  "David",
  "Emilia",
  "Fabio",
  "Giovanna",
  "Henrique",
  "Iara",
  "Jorge",
  "Kelly",
  "Luis",
  "Manuela",
  "Neusa",
  "Orlando",
  "Priscila",
  "Rodrigo",
  "Sofia",
  "Tiago",
  "Veronica",
  "Augusto",
  "Bruna",
  "Clara",
  "Diana",
  "Emanuel",
  "Flavio",
  "Gisele",
  "Heitor",
  "Ines",
  "Julio",
  "Lorena",
  "Matheus",
  "Nina",
  "Otávia",
  "Paulo",
  "Renata",
  "Sérgio",
  "Talita",
  "Vinicius",
  "Wagner",
  "Yasmin",
  "Zélia",
];

const cursos = [
  "666da2b791af7d6a607f717b",
  "666da2bd91af7d6a607f717e",
  "666da2db91af7d6a607f7182",
  "666da2e391af7d6a607f7184",
  "666da2eb91af7d6a607f7186",
  "66831ee9dfed1adc24ab1340"
];
let cont = 1;
let numeroCurso = 0;
try{
    for (let nome of nomes) {
        let student = new User();
        student.name = nome;
        student.register = cont;
        student.course_id = cursos[numeroCurso];
        student.password = "123";
        student.email = cont + "@"
        student.user_type = "Estudante"
        cont+=1;
        numeroCurso+=1;
        if(numeroCurso == 6){
          numeroCurso = 0;
        }
        await student.save()
      }
      
}catch(error){
    console.error(error.message)
}
