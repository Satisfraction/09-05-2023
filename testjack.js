const werteMapping = {
  'Bube': 10,
  'Dame': 10,
  'König': 10,
  'Ass': 11
};

var karte = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Bube', 'Dame', 'König', 'Ass'];
const farben = ['♥', '♦', '♣', '♠'];
let deck = [];

// Erstelle das Deck mit allen möglichen Kombinationen aus Werten und Farben
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
function game() {
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
  if (hand2Sum > hand1Sum) {
    ergebnisEl2.innerHTML += "Du hast gewonnen!";
  } else if (hand1Sum > hand2Sum) {
    ergebnisEl2.innerHTML += "Der Computer hat gewonnen";
  } else {
    ergebnisEl2.innerHTML += "Unentschieden!"
  }
}
