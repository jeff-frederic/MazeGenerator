
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

const rows = 50, columns = 50;
const cellWidth = Math.floor(canvas.width/columns);
const cellHeight = Math.floor(canvas.height/rows);

export {canvas, ctx, rows, columns, cellHeight, cellWidth};