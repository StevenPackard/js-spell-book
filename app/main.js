import SpellsController from "./Controllers/SpellsController.js";

class App {
  constructor() {
    this.spellsController = new SpellsController();
  }

}

window["app"] = new App();
