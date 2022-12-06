const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post('/',async (req, res) => {
  const {code, name, hp, mana} = req.body;//deben llegar por body aquellos que son obligatorios.
  if(!code || !name || !hp || !mana) return res.status(404).send("Falta enviar datos obligatorios");// ! VALIDACION.

  //Si están todos esos datos tratamos de construir un personaje
  try{
    const character = await Character.create(req.body);//crea una instancia del personaje conlos datos que traemos del body.
    res.status(201).json(character);
  }catch(e){
    res.status(404).send("Error en alguno de los datos provistos");
  }
});


router.get('/',async (req, res) => {
  const{race, age}= req.query;

  try{
    if(!race){
      const character = await Character.findAll()
      res.send(character)
    }
    else if (!age){
      const character = await Character.findAll({
        where: {
          race
        }
      })
        
      res.send(character)
    }
    else{
      const character = await Character.findAll({
        where:{
          race,
          age
        }
      })
      res.send(character)
    }
  }catch(e){
    console.log(e)
  }
});

// Si tenemos que armar una ruta que reciba un parámetro la ponemos al final.

router.get('young',async (req, res) => {
  try{
    const character = await Character.findAll({// va a bucar todos los character.
      where: {
        age: {[Op.lt]: 25}
      }
    })
    res.json(character);
  }catch(e){
    console.log(e);
    res.status(500).send(e.msg);
  }
});

/*
router.get('/', async(req, res) => {
  const{ race, age } = req.query;
  const condition{};
  const where = {};
  if(race) where.race = race;
  if(age) where.age = age;
  condition.where = where;

  const character =await Character.findAll(condition);
  res.json(character);
});


condition = {
  where: {
    race: 'Human',
    age: 27
  }
}

*/



router.get('/:code',async (req, res) => {
  const {code}= req.params;
  const character = await Character.findByPk(code);//sabemos el códgo
  if(!character) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`);
  res.status(200).json(character);
});

/*
CON PROMESAS
router.get('/:code', (req, res) => {
  const {code}= req.params;
  Character.findByPk(code)
  .then(character => {
    if(!character) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`);
  res.status(200).json(character);
  })
})


*/


router.put('/addAbilities', async (req, res) => {
  const {codeCharacter, abilities} = req.body;
  let character = await Character.findByPk(codeCharacter);
  let abilitiesArray = abilities.map(el => character.createAbility(el));
  await Promise.all(abilitiesArray);
  res.sttus(201).json(character);
});

router.put('/:attribute',async (req, res) => {
  const {attribute} = req.params;
  const {value} = req.query;

  //si pidiesen un character modificado -> hay que guardarlo en algún laado

  await Character.update({[attribute]: value}, {
    where: {
      [attribute] : null
    }
  })
  res.send("Personajes actualizados");
});

router.get('/roles/:code',async (req, res) => {
  const {code} = req.params;
  const character = await Character.findByPk(code,{
    include: Role
  });
  res.json(character);
});

module.exports = router;
/*
code*: string (Máximo 5 caracteres) [PK]
name*: string (Debe ser único)
age: integer
race: enum (Posibles valores: 'Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other')
hp*: float
mana*: float
date_added: timestamp without time


*/