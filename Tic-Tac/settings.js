let c = document.getElementById("c");
let ctx = c.getContext("2d");

let tile_size = 128;
let tile_width = 3;
let tile_height = 3;

let width = tile_width * tile_size;
let height = tile_height * tile_size;

c.width = width;
c.height = height;

let x_img_src = "img/x.png";
let o_img_src = "img/o.png";

Objs = [];