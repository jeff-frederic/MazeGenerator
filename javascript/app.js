import { Cell } from "./models.js";
import { buildView } from "./views.js";

let cell = new Cell(0, 0);
let view = buildView();
view.generateCell(cell);