// ===== EDIT YOUR PROJECTS HERE =====
// image: put files in assets/projects/ (e.g. "assets/projects/robot.jpg"). Leave "" for a placeholder.
// featured: true = shows in the top carousel.
window.PROJECTS = [
  { title: "Autonomous Rover", year: 2025, tags: ["electronics","cad"], featured: true, image: "",
    blurb: "Arduino-driven rover with ultrasonic obstacle avoidance and a 3D-printed chassis.",
    desc: "Designed the chassis in Onshape, printed in PETG, and wrote C++ firmware for sensor fusion and motor control." },
  { title: "Custom Mechanical Keyboard", year: 2025, tags: ["electronics","fabrication"], featured: true, image: "",
    blurb: "Hand-wired 65% keyboard with a laser-cut case and QMK firmware.",
    desc: "Laid out the plate in CAD, laser-cut acrylic layers, hand-wired the matrix, and flashed custom firmware." },
  { title: "Robotic Arm", year: 2024, tags: ["cad","software"], featured: true, image: "",
    blurb: "4-DOF servo arm controlled by inverse kinematics in Python.",
    desc: "Modeled every link for printability, then wrote an IK solver that drives the arm from target coordinates." },
  { title: "CNC Plotter", year: 2024, tags: ["fabrication","electronics"], featured: false, image: "",
    blurb: "Pen plotter built from salvaged parts and GRBL.", desc: "Built a 2-axis plotter from recycled steppers, running GRBL." },
  { title: "Smart Plant Monitor", year: 2024, tags: ["electronics","software"], featured: false, image: "",
    blurb: "ESP32 soil sensor with a live web dashboard.", desc: "ESP32 reads moisture and light, pushing data to a dashboard." },
  { title: "Workshop Tool Wall", year: 2023, tags: ["fabrication","cad"], featured: false, image: "",
    blurb: "Modular French-cleat system with printed holders.", desc: "Parametric holders designed for every tool in the shop." },
];
