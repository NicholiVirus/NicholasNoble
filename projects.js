// ===== EDIT YOUR PROJECTS HERE =====
// Each project has an image slot number (img). Send photos labeled with that number,
// save as assets/projects/<number>.jpg (e.g. 01.jpg) and set image: "assets/projects/01.jpg".
// featured: true = shows in the top carousel.
window.PROJECTS = [
  { img: "01", title: "Autonomous Quadruped Robot", year: 2026, tags: ["robotics","cad","software"], featured: true, image: "",
    blurb: "A 60 cm tall, fully autonomous four-legged robot built to cross rough terrain at 5 mph and avoid obstacles.",
    desc: "My current independent project. I'm designing the legs, joints and frame in CAD, fabricating parts with 3D printing and CNC, and writing autonomy software for gait control, terrain handling and obstacle avoidance. Target: 60 cm tall, 5 mph over uneven ground." },
  { img: "02", title: "NASA Goddard: Mobile Robot Simulation", year: 2026, tags: ["software","robotics"], featured: true, image: "",
    blurb: "Paid intern, National Space Club Scholars Program. Built a simulation environment for training mobile robots with reinforcement learning.",
    desc: "Project: Simulation Environment for Mobile Robots. Over 6 weeks I worked on kinematic and dynamic analysis of mobile robots, focused on autonomous path planning and control with reinforcement learning (Python, MATLAB, C++). We met the project goal: a reliable simulation environment with physical robot models that makes RL algorithm development faster and more realistic." },
  { img: "03", title: "FRC 2026 REBUILT Robot", year: 2026, tags: ["robotics","cad","fabrication"], featured: true, image: "",
    blurb: "Saxon Robotics. Designed in Onshape on Team 526 (Alliance 8 captain at FCH Alexandria), then rebuilt for WV ROCKS with Team 611.",
    desc: "As co-leader of Team 526's mechanical and construction team (Saxon Robotics B team), I led the design of our 2026 FIRST Robotics competition robot and managed building and testing. I lead a mechanical and construction team of 10 freshmen and sophomores." },
  { img: "04", title: "Bunnybots 2025: 12th Place", year: 2025, tags: ["robotics","fabrication"], featured: true, image: "",
    blurb: "My first build season with Saxon Robotics Team 526. We placed 12th at Blair Bunnybots 2025.",
    desc: "I led the mechanical and construction team through the design, build and iteration of this robot, which placed 12th at Blair Bunnybots 2025." },
  { img: "05", title: "NYU Autonomous Vehicle", year: 2025, tags: ["robotics","electronics","software"], featured: false, image: "",
    blurb: "A mechatronic vehicle that followed a programmed path and avoided obstacles on its own.",
    desc: "NYU Summer Program in Automation, Robotics and Coding. During a 2-week mechatronics course combining mechanical, electrical and systems integration, I designed and built an autonomous vehicle that followed a programmed path and avoided obstacles." },
  { img: "06", title: "50+ Motorized LEGO Technic / EV3 Builds", year: 2016, tags: ["robotics","cad"], featured: false, image: "",
    blurb: "Since 2016 I've designed and engineered more than 50 working motorized and remote-controlled models.",
    desc: "Since 2016 I've designed and engineered more than 50 fully working motorized and remote-controlled LEGO Technic/EV3 models, using mechanics, gearing, pneumatics and system integration. I share design tutorials and build processes on social media to inspire other young engineers." },
  { img: "07", title: "FIRST LEGO League Mentoring", year: 2025, tags: ["leadership"], featured: false, image: "",
    blurb: "Mentored 4th and 5th graders to a Core Values award. About 50 volunteer hours.",
    desc: "I mentored a FIRST LEGO League team of 4th and 5th graders, who won the Core Values award in 2025. About 50 volunteer hours with FIRST LEGO League." },
  { img: "08", title: "Gracious Professionalism Assist Team", year: 2025, tags: ["leadership","robotics"], featured: false, image: "",
    blurb: "Started a team that helps opposing teams repair and tune their robots at competitions. It won the Gracious Professionalism award twice.",
    desc: "I started an auxiliary team that helps opposing teams at robotics competitions. It won the Gracious Professionalism award at both the Regional and District FIRST Robotics competitions (3/2025)." },
  { img: "12", title: "Adaptive Basketball Catapult", year: 2024, tags: ["cad","fabrication","leadership"], featured: true, image: "",
    blurb: "A catapult I built in 8th grade so a student with a disability could play basketball at school.",
    desc: "In 2024, during 8th grade, I designed and built a catapult for my school so a student with a disability could shoot baskets and play alongside classmates. The build had to be safe, easy to operate, and adjustable for distance and arc." },
  { img: "13", title: "VEX Robotics Season", year: 2023, tags: ["robotics"], featured: false, image: "",
    blurb: "One season of VEX: designing, building and driving a competition robot.",
    desc: "Competed in VEX Robotics for one season in 2023: designing, building and driving a competition robot." },
  { img: "14", title: "LEGO Battlebots", year: 2022, tags: ["robotics","fabrication"], featured: false, image: "",
    blurb: "Built LEGO Technic combat robots for head-to-head matches (2022–2023).",
    desc: "Competed in LEGO Battlebots from 2022 to 2023, designing and building combat robots out of LEGO Technic for head-to-head matches." },
  { img: "16", title: "Harvest Havoc Strategy Simulator", year: 2026, tags: ["software","robotics"], featured: true, image: "",
    blurb: "A browser-based, multiplayer 3D simulator of Bunnybots 2026 that I built to test strategy and robot designs.",
    desc: "Harvest Havoc Sim recreates Blair Bunnybots 2026 from the official field CAD and game manual: swerve driving, AI opponents, scoring, fouls and ranking points. You can configure each robot's mechanisms (ground, depot and ramp intakes, elevator height, passthrough or hopper layouts) to compare designs before building. Code: github.com/NicholiVirus/TongueSimBunnybots" },
  // ---- CAD slots: send CAD screenshots/renders for these numbers ----
  { img: "09", title: "CAD Design (coming soon)", year: 2026, tags: ["cad"], featured: false, image: "",
    blurb: "Placeholder for a CAD model (Fusion 360 / Onshape / Inventor).", desc: "Details coming soon." },
  { img: "10", title: "CAD Design (coming soon)", year: 2026, tags: ["cad"], featured: false, image: "",
    blurb: "Placeholder for a CAD model.", desc: "Details coming soon." },
  { img: "11", title: "CAD Design (coming soon)", year: 2026, tags: ["cad"], featured: false, image: "",
    blurb: "Placeholder for a CAD model.", desc: "Details coming soon." },
];

// ===== EVENT PHOTO SLIDESHOW =====
// Photos crossfade slowly. Save files as assets/photos/P1.jpg ... and set src. Leave src "" for a numbered placeholder.
window.GALLERY = [
  { slot: "P1", src: "", caption: "Blair Bunnybots 2025 · Team 526" },
  { slot: "P2", src: "", caption: "FCH District Alexandria 2026 · Team 526" },
  { slot: "P3", src: "", caption: "FCH District Alexandria 2026 · in the pits" },
  { slot: "P4", src: "", caption: "WV ROCKS 2026 · Team 611" },
  { slot: "P5", src: "", caption: "WV ROCKS 2026 · on the field" },
];
window.PHOTO_CREDIT = "Event photos: robotphoto.smugmug.com";

// ===== VIDEOS (always muted) =====
// youtube: the video ID, the part after "watch?v=" (e.g. "dQw4w9WgXcQ"). Leave "" for a placeholder.
window.VIDEOS = [
  { slot: "V1", youtube: "", title: "Outreach", note: "FIRST LEGO League mentoring & community events" },
  { slot: "V2", youtube: "", title: "NYU autonomous vehicle", note: "Path following and obstacle avoidance" },
  { slot: "V3", youtube: "", title: "Robot dog", note: "Quadruped gait testing" },
];

// ===== LINKS =====
window.LINKS = { youtube: "" }; // your channel URL, e.g. "https://www.youtube.com/@yourhandle"
