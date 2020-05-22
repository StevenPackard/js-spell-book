import _spellsService from "../Services/SpellsService.js";
import store from "../store.js";

//Private
function _drawSpells() {
  let spells = store.State.spells;
  console.log(spells);

  let template = ''
  spells.forEach(s => {
    template += `<li class="action" onclick="app.spellsController.getDetails('${s.id}')">${s.name}</li>`
  });
  document.getElementById("spells").innerHTML = template
}

function _drawActive() {
  let spell = store.State.activeSpell;
  if (spell) {
    document.getElementById("active-spell").innerHTML = spell.ActiveTemplate
  } else {
    document.getElementById("active-spell").innerHTML = ""
  }
}

function _drawMySpells() {
  let spells = store.State.mySpells;
  let template = ''
  spells.forEach(s => {
    template += s.MyTemplate
  })
  document.getElementById("mySpells").innerHTML = template
}

//Public
export default class SpellsController {
  constructor() {
    store.subscribe("spells", _drawSpells);
    store.subscribe("activeSpell", _drawActive);
    store.subscribe("mySpells", _drawMySpells);
  }


  getSpells() {
    _spellsService.getSpells()
  }

  addSpell() {
    _spellsService.addSpell()
  }

  deleteSpell() {
    _spellsService.deleteSpell()
  }

  setActive(id) {
    _spellsService.setActive(id)
  }

  getDetails(id) {
    _spellsService.getDetails(id)
  }

  spin() {
    document.body.classList.add("fa-spin")
  }
}
