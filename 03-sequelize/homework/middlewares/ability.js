const { Router } = require('express');
const { Ability } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
  try{
    const { name, mana_cost} = req.body;
    if(!name || !mana_cost) return res.status(404).send("Falta enviar datos obligatorios")
    // si no uso ese return debo guardar lo que sigue dentro de un else
    const ability = await Ability.create(req.body);// en caso de que no falten datos
    res.status(201).json(ability);
  }catch(e){
    res.status(500).send("Algo salio mal en el proceso");
  }
});

router.put('/setCharacter', async (req, res) => {
  const {idAbility, codeCharacter} = req.body;
  try{
    let ability = await Ability.findByPk(idAbility);//GUARDAMOS LA INSTANCIA
    await ability.setCharacter(codeCharacter);
    let result = await Ability.findByPk(idAbility,{
      attributes: ['name', 'description', 'mana_cost', 'CharacterCode']
    });
    res.status(201).json(result);
  }catch(e){
    console.log(e);
  }
});




module.exports = router;