//Camera
let camera_speed = 10;
let camera_width = 896;
let camera_height = 896;

let world_width = 30;
let world_height = 30;

let tile_size = 64;

let world_widthP = world_width * tile_size;
let world_heightP = world_height * tile_size;

let c = document.getElementById("c");
let ctx = c.getContext("2d");

let Objs = [];

let world_background = '#000132';
let background_colors = {"Sand": "#FFE600", "Ocean": "#1053FF", "Grass": "#357B00"};
let ground = ["Ocean", "Sand"];
let chances = {"Sand": 20, "Ocean": 20};