// =====================
// ➰➰➰ Varz ➰➰➰
// =====================

const ajouterWrapper = document.querySelector('.add-words'),
motOriginal = document.querySelector('.from'),
motTraduit = document.querySelector('.to'),
envoyerMot = document.querySelector('.send'),
errorWrapper = document.querySelector('.error'),
combien = document.querySelector('.howmuch'),
gogogo = document.querySelector('.lets-go'), 
play = document.querySelector('.play'),
stopPlaying = document.querySelector('.close'),
result = document.querySelector('.result'),
erase = document.querySelector('.erase'),
count = document.querySelector('.count');

let tableauDeMots = []
let motMagique
let nbrEssais = 0
let nbrSucces = 0

// ==========================
// 🧠🧠🧠 Functionz 🧠🧠🧠
// ==========================

// Affichage du nombre de mots enregistrés
function nombreMotsRecorded() {
  combien.innerHTML = `Il y a ${tableauDeMots.length} mot(s) enregistré(s)`
}

// Va chercher un mot random 
function randomNumber(table) {
  return Math.round(Math.random() * (table.length - 1));
}

// Aller chercher un nouveau Mot au hasard dans le tableau
function newWord(indexMot) {
  const bonneReponse = tableauDeMots[indexMot]["Mot traduit"].toLowerCase()
  console.log("Le mot magique est : " + bonneReponse)
  motMagique = bonneReponse
  return bonneReponse
}

// On génère un mot avec un nombre aléatoire
function newWordWithRandom() {
  const numeroMagique = randomNumber(tableauDeMots)
  newWord(numeroMagique)
  play.querySelector('strong').innerText = `${tableauDeMots[numeroMagique]["Mot original"]}`
}

// =======================
// 💥💥💥 Eventz 💥💥💥
// =======================

// Vérif si localStorage est déjà plein ou pas
if (JSON.parse(localStorage.getItem('mots'))) {
  tableauDeMots = JSON.parse(localStorage.getItem('mots'))
  nombreMotsRecorded()
  gogogo.style.display="inline-block"
  // console.log(tableauDeMots)
}
combien.innerHTML = `Il y a ${tableauDeMots.length} mot(s) enregistré(s)`



// Click pour ajouter un mot
envoyerMot.addEventListener('click', function() {
  // Si les champs ne sont pas vides ...
  if (motOriginal.value != "" && motTraduit.value != "") {
    errorWrapper.innerHTML = ""
    tableauDeMots.push(
      {
        "Mot original" : motOriginal.value,
        "Mot traduit" : motTraduit.value,
      }
    )
    motOriginal.value = ""
    motTraduit.value = ""
    localStorage.setItem('mots', JSON.stringify(tableauDeMots))
    nombreMotsRecorded()
    console.log(JSON.parse(localStorage.getItem('mots')))
    gogogo.style.display="inline-block"
  } else {
    errorWrapper.innerHTML = `Remplissez les deux champs svp :) !`
  }
})


// Click pour reset la liste des mots
erase.addEventListener('click', function() {
  localStorage.clear()
  tableauDeMots = []
  nombreMotsRecorded()
  gogogo.style.display="none"
})


// Click pour fermer la fenêtre de jeu
stopPlaying.addEventListener('click', function() {
  play.classList.remove('active')
})

// Jouons en cliquant surr le bouton "tester tes connaissances" !!
gogogo.addEventListener('click', function(){
  play.classList.add('active')
  newWordWithRandom()
})

// Au click sur le bouton de validation
play.querySelector('.send').addEventListener('click', function(){
  nbrEssais++
  console.log(nbrEssais)
  if(play.querySelector('.field input').value.toLowerCase() == motMagique) {
    result.innerHTML = "Bravo !"
    result.classList.add('success')
    nbrSucces++
    console.log(nbrSucces)
  } else {
    result.innerHTML = "Ratay !"
    result.classList.add('error')
  }
  count.innerHTML = `${nbrSucces}/${nbrEssais}`
  setTimeout(() => {
    result.innerHTML = ""
    result.setAttribute("class", "result")
  }, 1000)
  play.querySelector('.field input').value = ""
  newWordWithRandom()
})