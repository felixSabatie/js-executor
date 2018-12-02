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

const names = []

const getName = () => {
  if (names.length === 0) {
    for(let i=0 ; i < animalNames.length ; i++){
      for(let j=0 ; j < adjective.length ; j++){
        names.push(animalNames[i] + " " + adjective[j])
      }
    }
  }
  return names.splice(Math.floor(Math.random()* names.length), 1)[0];
}

exports.getName = getName