// ===== EDIT YOUR PROJECTS HERE =====
// Each project has an image slot number (img). Send photos labeled with that number,
// save as assets/projects/<number>.jpg (e.g. 01.jpg) and set image: "assets/projects/01.jpg".
// featured: true = shows in the top carousel.
window.PROJECTS = [
  { img: "01", title: "Autonomous Quadruped Robot", year: 2026, tags: ["robotics","cad","software"], featured: true, image: "assets/photos/robot-dog.jpg",
    blurb: "A 60 cm tall, fully autonomous four-legged robot built to cross rough terrain at 5 mph and avoid obstacles.",
    desc: "My current independent project. I'm designing the legs, joints and frame in CAD, fabricating parts with 3D printing and CNC, and writing autonomy software for gait control, terrain handling and obstacle avoidance. Target: 60 cm tall, 5 mph over uneven ground." },
  { img: "02", nda: true, title: "NASA Goddard: CORTEx", year: 2026, tags: ["software","robotics"], featured: true, image: "assets/photos/cortex-poster.jpg",
    blurb: "CORTEx (Cross-sensor Onboard Reflex & Terrain Exploration): a layered RL + provably-safe navigation stack with a camera-free terrain classifier, running on a TurtleBot 4.",
    desc: "National Space Club Scholars Program at NASA Goddard (Engineering & Technology Directorate), summer 2026, as part of a six-student team. We built a fully custom, no-Nav2 navigation stack for a wheeled robot: an RL policy trained in MATLAB on randomized rooms and obstacles, Kalman-filter sensor fusion, safety layers (CBF/CLF/QP) validated before hardware, and a lightweight hyperdimensional-computing terrain classifier needing no camera and no ground-truth labels. Deployed on a TurtleBot 4 (Raspberry Pi 4, RPLIDAR, IR, IMU, wheel encoders). Results: 90.2% arrival rate for the actor-led stack vs 30.1% for the baseline, and a terrain model under 100 KB vs about 150 MB for a deep-learning classifier." },
  { img: "03", title: "FRC 2026 REBUILT Robot", year: 2026, tags: ["robotics","cad","fabrication"], featured: true, image: "assets/photos/robot-hero.jpg",
    blurb: "Saxon Robotics. Designed in Onshape on Team 526 (Alliance 8 captain at FCH Alexandria), then rebuilt with Team 611: 16th of 30 at WV ROCKS.",
    desc: "As co-leader of Team 526's mechanical and construction team (Saxon Robotics B team), I led the design of our 2026 FIRST Robotics competition robot and managed building and testing. I lead a mechanical and construction team of 10 freshmen and sophomores." },
  { img: "04", title: "Bunnybots 2025 Robot", year: 2025, tags: ["robotics","fabrication"], featured: true, image: "assets/photos/bb25-card.jpg",
    blurb: "My first build season with Saxon Robotics Team 526. We competed at Blair Bunnybots 2025.",
    desc: "I led the mechanical and construction team through the design, build and iteration of this robot for Blair Bunnybots 2025." },
  { img: "05", title: "NYU Autonomous Vehicle", year: 2025, tags: ["robotics","electronics","software"], featured: false, image: "",
    blurb: "A mechatronic vehicle that followed a programmed path and avoided obstacles on its own.",
    desc: "NYU Summer Program in Automation, Robotics and Coding. During a 2-week mechatronics course combining mechanical, electrical and systems integration, I designed and built an autonomous vehicle that followed a programmed path and avoided obstacles." },
  { img: "06", title: "50+ Motorized LEGO Technic / EV3 Builds", year: 2016, tags: ["robotics","cad"], featured: false, image: "assets/photos/lego-1.jpg", gallery: ["assets/photos/lego-1.jpg", "assets/photos/lego-2.jpg", "assets/photos/lego-3.jpg", "assets/photos/lego-4.jpg", "assets/photos/lego-5.jpg", "assets/photos/lego-6.jpg", "assets/photos/lego-7.jpg", "assets/photos/lego-8.jpg"],
    blurb: "Since 2016 I've designed and engineered more than 50 working motorized and remote-controlled models.",
    desc: "Since 2016 I've designed and engineered more than 50 fully working motorized and remote-controlled LEGO Technic/EV3 models, using mechanics, gearing, pneumatics and system integration. I share design tutorials and build processes on social media to inspire other young engineers." },
  { img: "07", title: "FIRST LEGO League Mentoring", year: 2025, tags: ["leadership"], featured: false, image: "",
    blurb: "Mentored 4th and 5th graders to a Core Values award. About 50 volunteer hours.",
    desc: "I mentored a FIRST LEGO League team of 4th and 5th graders, who won the Core Values award in 2025. About 50 volunteer hours with FIRST LEGO League." },
  { img: "08", title: "Gracious Professionalism → Saxon Sparks", year: 2025, tags: ["leadership","robotics"], featured: false, image: "assets/photos/gp-alexandria.jpg",
    blurb: "Helping rival teams at competitions earned two Gracious Professionalism awards and laid the base for Langley's B team, Saxon Sparks (526).",
    desc: "I helped opposing teams repair and tune their robots at FIRST Robotics competitions, earning the Gracious Professionalism award at both Regional and District events (3/2025). Photo: with members of other teams at FCH District Alexandria. Those efforts directly provided the base for Langley Robotics to start a B team, Saxon Sparks (526)." },
  { img: "12", title: "Adaptive Basketball Catapult", year: 2024, tags: ["cad","fabrication","leadership"], featured: true, image: "assets/photos/catapult.jpg", video: "assets/video/catapult.mp4",
    blurb: "A catapult I built in 8th grade so a student with a disability could play basketball at school.",
    desc: "In 2024, during 8th grade, I designed and built a catapult for my school so a student with a disability could shoot baskets and play alongside classmates. The build had to be safe, easy to operate, and adjustable for distance and arc." },
  { img: "13", title: "VEX Robotics Season", year: 2023, tags: ["robotics"], featured: false, image: "",
    blurb: "One season of VEX: designing, building and driving a competition robot.",
    desc: "Competed in VEX Robotics for one season in 2023: designing, building and driving a competition robot." },
  { img: "14", title: "LEGO Battlebots", year: 2022, tags: ["robotics","fabrication"], featured: false, image: "assets/photos/battlebot.jpg",
    blurb: "Built LEGO Technic combat robots for head-to-head matches (2022–2023).",
    desc: "Competed in LEGO Battlebots from 2022 to 2023, designing and building combat robots out of LEGO Technic for head-to-head matches." },
  { img: "16", title: "Harvest Havoc Strategy Simulator", year: 2026, tags: ["software","robotics"], featured: true, image: "assets/photos/sim.webp",
    blurb: "A browser-based, multiplayer 3D simulator of Bunnybots 2026 that I built to test strategy and robot designs.",
    desc: "Harvest Havoc Sim recreates Blair Bunnybots 2026 from the official field CAD and game manual: swerve driving, AI opponents, scoring, fouls and ranking points. You can configure each robot's mechanisms (ground, depot and ramp intakes, elevator height, passthrough or hopper layouts) to compare designs before building. Play it at toungesimbunnybots.onrender.com. Code: github.com/NicholiVirus/TongueSimBunnybots", link: "https://toungesimbunnybots.onrender.com/" },
  // ---- CAD slots: send CAD screenshots/renders for these numbers ----
  { img: "09", title: "Bunnybots 2026 Robot CAD", year: 2026, tags: ["cad","robotics"], featured: false, image: "assets/photos/cad-bb26.png",
    blurb: "Full Onshape assembly of Team 611's Bunnybots 2026 robot: elevator, intake, swerve drivebase and polycarbonate hopper.",
    desc: "As CAD & Fabrication Lead for Team 611, I designed the Bunnybots 2026 robot in Onshape: a tall elevator for reaching the pantry shelves, a front intake, a swerve drivebase and clear polycarbonate side plates. You can spin the 3D model in the viewer at the top of the page." },
  { img: "10", title: "CAD Design (coming soon)", year: 2026, tags: ["cad"], featured: false, image: "",
    blurb: "Placeholder for a CAD model.", desc: "Details coming soon." },
  { img: "11", title: "CAD Design (coming soon)", year: 2026, tags: ["cad"], featured: false, image: "",
    blurb: "Placeholder for a CAD model.", desc: "Details coming soon." },
];

// ===== EVENT PHOTO LOOPS (one per event in the Saxon Robotics story) =====
window.EVENT_PHOTOS = {
  alexandria: [
    { src: "assets/photos/alex-1.jpg", caption: "526 at the hub" },
    { src: "assets/photos/alex-2.jpg", caption: "526 in a qualification match" },
    { src: "assets/photos/alex-3.jpg", caption: "526 collecting fuel" },
    { src: "assets/photos/alex-4.jpg", caption: "Setting up 526 before a match" },
  ],
  chesapeake: [
    { src: "assets/photos/ches-1.jpg", caption: "526 on the field" },
    { src: "assets/photos/ches-2.jpg", caption: "526 lining up" },
    { src: "assets/photos/ches-4.jpg", caption: "Match in progress" },
  ],
  wvrocks: [
    { src: "assets/photos/robot-hero.jpg", caption: "Our rebuilt robot, hopper full" },
    { src: "assets/photos/wvrox-robot.jpg", caption: "611 on the field" },
    { src: "assets/photos/wvrox-field.jpg", caption: "The WV ROCKS field" },
  ],
};



