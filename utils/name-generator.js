const animalNames = [
    'Lion',
    'Lapin',
    'Ours',
    'Requin',
    'Renard',
    'Cheval',
    'Crocodile',
    'Panda',
    'Hiboux'
]

const adjective = [
    'calme',
    'rapide',
    'paresseux',
    'comique',
    'fidèle',
    'bavard',
    'robuste'
]

const getName = () => {
  const chosenAnimal = animalNames[Math.floor(Math.random()*animalNames.length)];
  const chosenAdjective = adjective[Math.floor(Math.random()*adjective.length)];
  return chosenAnimal + " " + chosenAdjective;
}

exports.getName = getName