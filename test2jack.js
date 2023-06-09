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
  //die Funktion berechnet einen zufälligen Wert aus dem Arry "Deck"
  function getRandomIndex() {
    return Math.floor(Math.random() * deck.length);
  }
  




function game() {
    const hand1 = drawCards(2);
    const hand2 = drawCards(2);
  
    const hand1Sum = sumHandValues(hand1);
    const hand2Sum = sumHandValues(hand2);
  
    const ergebnisEl2 = document.getElementById("ergebnis2");
    ergebnisEl2.innerHTML = "Die Karten für Dich sind: " + hand2 + "<br><br>" +
      "Die Karten des Computers sind: " + hand1 + "<br><br>" +
      "Deine Punktzahl: " + hand2Sum + "<br><br>" +
      "Punktzahl des Computers: " + hand1Sum + "<br><br>";
  
    if (hand2Sum > hand1Sum || hand1Sum > 21) {
      ergebnisEl2.innerHTML += "Du hast gewonnen!";
    } else if (hand1Sum > hand2Sum || hand2Sum > 21) {
      ergebnisEl2.innerHTML += "Der Computer hat gewonnen";
    } else {
      ergebnisEl2.innerHTML += "Unentschieden!";
    }
  }
  
  function drawCards(num) {
    const hand = [];
    for (let i = 0; i < num; i++) {
      const randomIndex = getRandomIndex();
      hand.push(deck[randomIndex]);
      deck.splice(randomIndex, 1);
    }
    return hand;
  }
  
  function sumHandValues(hand) {
    let sum = 0;
    for (let i = 0; i < hand.length; i++) {
      const card = hand[i];
      const cardValue = card.split(' ')[1];
      const mappedValue = werteMapping[cardValue] || parseInt(cardValue);
      sum += mappedValue;
    }
    return sum;
  }
      // Beim Laden der Seite das Array aus dem localStorage laden
      let ergebnisse = JSON.parse(localStorage.getItem('ergebnisse')) || [];
      // Set variable in local storage
      // localStorage.setItem('ergebnisse', 'variableValue');
  
      // // Get variable from local storage
      // var variableValue = localStorage.getItem('ergebnisse');
      // ...
  
      // Am Ende des Spiels das Ergebnis ins Array eintragen und im localStorage speichern
    //   ergebnisse = ergebnisse.reverse(12).splice(0, 12);
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
  