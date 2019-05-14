//Camera
let zoom_speed = 0.01
let camera_speed = 10;
let camera_width = 896;
let camera_height = 896;

let world_width = 1000;
let world_height = 1000;

let tile_size = 16;

let world_widthP = world_width * tile_size;
let world_heightP = world_height * tile_size;

let c = document.getElementById("c");
let ctx = c.getContext("2d");

let Objs = [];

let world_background = '#000000';
let states = {"None": "#C5DBCD", "Unactivated": "#F3F138", "Head": "#0B44DE", "Tail": "#F51100"};
let states_list = ["None", "Unactivated", "Head", "Tail"];
