import store from "../store.js";
import Spell from "../Models/Spell.js";

// @ts-ignore
const _spellApi = axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api/spells",
  timeout: 15000
})

// @ts-ignore
const _mySpellsApi = axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api/Troy&Steven/spells",
  timeout: 15000
})


class SpellsService {
  constructor() {
    this.getSpells()
    this.getMySpells()
  }

  getSpells() {
    _spellApi.get('')
      .then(res => {
        let newSpells = res.data.map(ns => ns)
        store.commit('spells', newSpells)
      })
      .catch(err => console.log(err)
      )
  }

  getMySpells() {
    _mySpellsApi.get('')
      .then(res => {
        let spell = res.data.data.map(s => new Spell(s))
        store.commit('mySpells', spell)
      })
      .catch(err => console.log(err)
      )
  }

  setActive(id) {
    let spell = store.State.mySpells.find(s => s.id == id)
    if (spell) {
      store.commit('activeSpell', spell)
    }
  }

  getDetails(id) {
    _spellApi.get(id)
      .then(res => {
        let spell = new Spell(res.data)
        store.commit('activeSpell', spell)
      })
  }

  addSpell() {
    debugger
    _mySpellsApi.post('', store.State.activeSpell)
      .then(res => {
        this.getMySpells()
      })
  }

  deleteSpell() {
    _mySpellsApi.delete(store.State.activeSpell.id)
      .then(res => {
        this.getMySpells();
        store.commit('activeSpell', null)
      })
      .catch(err => console.log(err)
      )
  }
}

const SPELLSSERVICE = new SpellsService();
export default SPELLSSERVICE;