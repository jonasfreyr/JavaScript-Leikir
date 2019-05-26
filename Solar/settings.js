let width = 900;
let height = 900;

let add_radius = 0;
let mouse_is_down = null;

let c = document.getElementById("c");
let ctx = c.getContext("2d");

c.width = width;
c.height = height;

let G = 0.05;

let colors = ["red", "yellow", "brown", "pink", "blue", "green", "orange", "purple"];
let color;
let Objs = [];