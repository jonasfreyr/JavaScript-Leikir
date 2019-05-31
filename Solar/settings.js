let camera_width = 900;
let camera_height = 900;
let zoom_speed = 0.01;
let camera_speed = 10;

let add_radius = 0;
let mouse_is_down = null;

let c = document.getElementById("c");
let ctx = c.getContext("2d");

c.width = camera_width;
c.height = camera_height;

let G = 0.05;
let keyState = {};

let colors = ["red", "yellow", "brown", "pink", "blue", "green", "orange", "purple"];
let color;
let Objs = [];

let white = false;