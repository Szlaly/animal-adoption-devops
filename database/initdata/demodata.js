db = db.getSiblingDB('menhely'); 


db.users.insertMany([
  {
    name: "Admin Felhasználó 1",
    email: "admin1@menhely.hu",
    password: "$2b$10$lyXAK6wVSVGi4MhFb746Qu8FKJYlaWofyImsRj1GvwWhF1BWLKKFC", // admin123
    role: "admin"
  },
  {
    name: "Admin Felhasználó 2",
    email: "admin2@menhely.hu",
    password: "$2b$10$mMr1Vg/JYFSNnwS9MqjmNOVVRrlkoczvhc13L.NJn4aD4BRUB2CvW", // admin234
    role: "admin"
  },
  {
    name: "Admin Felhasználó 3",
    email: "admin3@menhely.hu",
    password: "$2b$10$7rBSPsoTAM/VTMAbQXDd6u7ZittxWgBWmCJ/Eoz8gQ2dd5voVtfOW", // admin345
    role: "admin"
  },
  {
    name: "Sima Felhasználó 1",
    email: "user1@menhely.hu",
    password: "$2b$10$vnpC.et2fd1vTwV3I8tWDeyw3hu4PXxD7nGaXr4LegbEPNi5ogjRi", // user123 
    role: "user"
  },
  {
    name: "Sima Felhasználó 2",
    email: "user2@menhely.hu",
    password: "$2b$10$2d5b53hyuP/xB3F4i7hCpuUwfBTfW1TIH22B12JO9aq.bWva2JTTe", // user234
    role: "user"
  }
]);

db.animals.insertMany([
  {
    name: "Bodri",
    age: 4,
    species: "kutya",
    breed: "keverék",
    description: "Barátságos, aktív kutya.",
    health: "oltva, féregtelenítve",
    likedBy: [],
    imageUrl: "/uploads/bodri.jpg",
    story: "Bodri egy hűséges családi kedvenc, aki imád játszani a gyerekekkel."
  },
  {
    name: "Cirmi",
    age: 2,
    species: "macska",
    breed: "házi",
    description: "Csendes, dorombolós cica.",
    health: "oltva",
    likedBy: [],
    imageUrl: "/uploads/cirmi.jpg",
    story: "Cirmi a menhely csendes lelke, aki mindig a napos ablakban alszik."
  },
  {
    name: "Nyuszi",
    age: 1,
    species: "nyúl",
    breed: "törpenyúl",
    description: "Puha szőrű, játékos nyuszi.",
    health: "oltva",
    likedBy: [],
    imageUrl: "/uploads/nyuszi.jpg", 
    story: "Nyuszi szereti a répát és a simogatást."
  },
  {
    name: "Luna",
    age: 3,
    species: "kutya",
    breed: "labrador",
    description: "Barátságos és energikus labrador.",
    health: "oltva, féregtelenítve",
    likedBy: [],
    imageUrl: "/uploads/luna.jpg",
    story: "Luna imád a parkban futni és labdázni."
  },
  {
    name: "Mici",
    age: 4,
    species: "macska",
    breed: "perzsa",
    description: "Elegáns perzsa macska.",
    health: "oltva",
    likedBy: [],
    imageUrl: "/uploads/mici.jpg",
    story: "Mici a menhely királynője, nagyon öntörvényű."
  },
  {
    name: "Füles",
    age: 2,
    species: "nyúl",
    breed: "óriásnyúl",
    description: "Nagy termetű, nyugodt nyúl.",
    health: "oltva",
    likedBy: [],
    imageUrl: "/uploads/fules.jpg",
    story: "Füles imádja, ha a kertben ugrálhat."
  },
  {
    name: "Rex",
    age: 5,
    species: "kutya",
    breed: "németjuhász",
    description: "Hűséges és okos németjuhász.",
    health: "oltva, féregtelenítve",
    likedBy: [],
    imageUrl: "/uploads/rex.jpg",
    story: "Rex a menhely őrzője, mindig résen van."
  },
  {
    name: "Sziámi",
    age: 3,
    species: "macska",
    breed: "sziámi",
    description: "Kedves és beszédes macska.",
    health: "oltva",
    likedBy: [],
    imageUrl: "/uploads/sziami.jpg",
    story: "Sziámi nagyon szelíd és igényli az emberi társaságot."
  },
  {
    name: "Panni",
    age: 2,
    species: "kutya",
    breed: "uszkár",
    description: "Kicsi, bolyhos uszkár.",
    health: "oltva, féregtelenítve",
    likedBy: [],
    imageUrl: "/uploads/panni.jpg",
    story: "Panni imád ugrálni és trükköket tanulni."
  },
  {
    name: "Szöszke",
    age: 1,
    species: "macska",
    breed: "hosszúszőrű házi",
    description: "Fiatal, játékos cica.",
    health: "oltva",
    likedBy: [],
    imageUrl: "/uploads/szoszke.jpg",
    story: "Szöszke mindig a legnagyobb kalandokra kész."
  }
]);
