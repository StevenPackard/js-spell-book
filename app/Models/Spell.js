export default class Spell {
  constructor(data) {
    this.name = data.name
    this.description = data.description || data.desc.join('\n')
    this.level = data.level
    this.range = data.range
    this.duration = data.duration
    this.components = data.components
    this.id = data._id || data.id
    this.user = data.user
  }

  get MyTemplate() {
    return `<li class="action" onclick="app.spellsController.setActive('${this.id}')">${this.name}</li>`
  }

  get ActiveTemplate() {
    return /*html*/`
        <div class="col-8 bg-white shadow border border-dark mt-5">
            <h3 class="mt-3">${this.name}</h3>
            <h5>Range: ${this.range} | Level: ${this.level}</h5>
            <h5>Duration: ${this.duration}</h5>
            <p>"${this.description}"</p>
            ${this.SubTemplate}
        </div>
    `
  }

  get SubTemplate() {
    if (this.user) {
      return `
      <button class="btn btn-success my-3" onclick="app.spellsController.deleteSpell()">Delete Spell</button>
      `
    }
    return `
      <button class="btn btn-success my-3" onclick="app.spellsController.addSpell()">Collect Spell</button>
      `
  }
}


{/* <button class="btn btn-success my-2" onclick="app.spellsController.addSpell()">Collect Spell</button> */ }

{/* <li onclick="app.spellsController.getDetails('${id}')">${id}</li> */ }