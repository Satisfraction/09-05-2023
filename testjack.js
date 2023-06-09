const werteMapping = {
  'Bube': 10,
  'Dame': 10,
  'König': 10,
  'Ass': 11
};

const karte = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Bube', 'Dame', 'König', 'Ass'];
const farben = ['♥', '♦', '♣', '♠'];
let deck = [];

//Erstelle das Deck mit allen möglichen Kombinationen aus Werten und Farben
for (let i = 0; i < farben.length; i++) {
  for (let j = 0; j < karte.length; j++) {
    const wert = karte[j];
    const mappedWert = werteMapping[wert] || wert;
    deck.push(farben[i] + ' ' + mappedWert);
  }
}

function getRandomIndex() {
  return Math.floor(Math.random() * deck.length);
}

// Ziehe zufällig 4 Karten aus dem Deck
function game(){

  // for (let i = 0; i < farben.length; i++) { //Alternative für endloses Spielen mit immer neuem Deck
  //   for (let j = 0; j < karte.length; j++) {
  //     const wert = karte[j];
  //     const mappedWert = werteMapping[wert] || wert;
  //     deck.push(farben[i] + ' ' + mappedWert);
  //   }
  // }

  const hand1 = [];
  for (let i = 0; i < 2; i++) {
    const randomIndex = getRandomIndex();
    hand1.push(deck[randomIndex]);
    deck.splice(randomIndex, 1);
  }
  const hand2 = [];
  for (let i = 0; i < 2; i++) {
    const randomIndex = getRandomIndex();
    hand2.push(deck[randomIndex]);
    deck.splice(randomIndex, 1);
  }

  function sumHandValues1(hand1) {
    let sum = 0;
    for (let i = 0; i < hand1.length; i++) {
      const card = hand1[i];
      const cardValue = card.split(' ')[1];
      const mappedValue = werteMapping[cardValue] || parseInt(cardValue);
      sum += mappedValue;
    }
    return sum;
  }
  function sumHandValues2(hand2) {
    let sum = 0;
    for (let i = 0; i < hand2.length; i++) {
      const card = hand2[i];
      const cardValue = card.split(' ')[1];
      const mappedValue = werteMapping[cardValue] || parseInt(cardValue);
      sum += mappedValue;
    }
    return sum;
  }

  const hand1Sum = sumHandValues1(hand1);
  const hand2Sum = sumHandValues2(hand2);

  const ergebnisEl2 = document.getElementById("ergebnis2");
  ergebnisEl2.innerHTML = "Die Karten für Dich sind: " + hand2 + "<br><br>" +
    "Die Karten des Computers sind: " + hand1 + "<br><br>" +
    "Deine Punktzahl: " + hand2Sum + "<br><br>" +
    "Punktzahl des Computers: " + hand1Sum + "<br><br>";
  // if (deck = []) {
  //   ergebnisEl2.innerHTML += "Das Deck ist leer";
  // }
  if (hand2Sum > hand1Sum) {
    ergebnisEl2.innerHTML += "Du hast gewonnen!";
  } else if (hand1Sum > hand2Sum) {
    ergebnisEl2.innerHTML += "Der Computer hat gewonnen";
  } else if (hand1Sum === hand2Sum) {
    ergebnisEl2.innerHTML += "Unentschieden!"
  } 
    // Beim Laden der Seite das Array aus dem localStorage laden
    let ergebnisse = JSON.parse(localStorage.getItem('ergebnisse')) || [];
    // Set variable in local storage
    // localStorage.setItem('ergebnisse', 'variableValue');

    // // Get variable from local storage
    // var variableValue = localStorage.getItem('ergebnisse');
    // ...

    // Am Ende des Spiels das Ergebnis ins Array eintragen und im localStorage speichern
    ergebnisse = ergebnisse.reverse(12).splice(0, 12);
    ergebnisse.unshift({
      hand1: hand1,
      hand2: hand2,
      hand1Sum: hand1Sum,
      hand2Sum: hand2Sum,
      gewinner: (hand2Sum > hand1Sum) ? 'Du' : (hand1Sum > hand2Sum) ? 'Computer' : 'Unentschieden'
    });


    localStorage.setItem('ergebnisse', JSON.stringify(ergebnisse));

    // ...

    // Beim Laden der Seite die Ergebnisse aus dem Array laden und anzeigen
    const ergebnisseEl = document.getElementById("ergebnisse");
    if (ergebnisse.length > 0) {
      ergebnisseEl.innerHTML = "<h2>Letzte Spiele:</h2>";
      for (let i = 0; i < ergebnisse.length; i++) {
        const spiel = ergebnisse[i];
        ergebnisseEl.innerHTML += "Spiel " + (i + 1) + ": " + spiel.hand2 + " gegen " + spiel.hand1 + ". Ergebnis: " + spiel.hand2Sum + " - " + spiel.hand1Sum + ". Gewinner: " + spiel.gewinner + "<br>";
      }
    }
  }
  
  function reset() {
    // Reset the deck array
    deck = [];
    for (let i = 0; i < farben.length; i++) {
      for (let j = 0; j < karte.length; j++) {
        const wert = karte[j];
        const mappedWert = werteMapping[wert] || wert;
        deck.push(farben[i] + ' ' + mappedWert);
      }
    }

    // Reset the hands

    hand1 = [];
    hand2 = [];

    // Remove the highScores data from local storage
    localStorage.removeItem('ergebnisse');

    // Clear the high score list
    const ergebnisse = document.getElementById('ergebnisse');
    ergebnisse.innerHTML = '';
  }

// const resetBtn = document.createElement('button');
// resetBtn.textContent = 'Zurücksetzen';
// resetBtn.addEventListener('click', reset);
// document.body.appendChild(resetBtn);