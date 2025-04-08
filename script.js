
let words = document.querySelectorAll(".word");

words.forEach((word) => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.appendChild(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;

// Laat het eerste woord zien
words[currentWordIndex].style.opacity = "1";

function changeText() {
  let currentWord = words[currentWordIndex];
  let nextWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
  let nextWord = words[nextWordIndex];

  let currentLetters = currentWord.children;
  let nextLetters = nextWord.children;

  // Fade out huidige letters
  Array.from(currentLetters).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });

  // Laat nieuw woord zien na vertraging
  nextWord.style.opacity = "1";
  Array.from(nextLetters).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });

  // Verberg huidig woord uiteindelijk
  setTimeout(() => {
    currentWord.style.opacity = "0";
    currentWordIndex = nextWordIndex;
  }, 2000);
}

// Laat het elke 3 seconden veranderen
setInterval(changeText, 3000);





/*document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.fillter-button .btn');
  const portfolioItems = document.querySelectorAll('.port-box');

  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Add active class to clicked button
          button.classList.add('active');
          
          const filterValue = button.getAttribute('data-filter');
          
          portfolioItems.forEach(item => {
              if (filterValue === 'all' || item.getAttribute('data-item') === filterValue) {
                  item.style.display = 'block';
              } else {
                  item.style.display = 'none';
              }
          });
      });
  });

  // Initialize with 'All' filter active
  document.querySelector('.fillter-button .btn[data-filter="all"]').classList.add('active');
});*/




/*circle skill*///
document.addEventListener('DOMContentLoaded', function() {
  const circles = document.querySelectorAll('.circle');
  
  circles.forEach(elem => {
      const percent = parseInt(elem.getAttribute("data-percent"));
      const dots = 120; // Aantal punten in de cirkel
      const markedDots = Math.floor(dots * percent / 100);
      const rotate = 360 / dots;
      let pointsHTML = "";
      
      // Percentage tekst updaten
      const percentageElement = elem.querySelector('.percentage');
      if (percentageElement) {
          percentageElement.textContent = percent + '%';
      }

      



      // Punten genereren
      for(let i = 0; i < dots; i++) {
          pointsHTML += `<div class="point" style="--i:${i}; transform: rotate(calc(${i}*${rotate}deg)) translateY(-45px);"></div>`;
      }
      
      // Punten toevoegen aan de cirkel
      elem.insertAdjacentHTML('afterbegin', pointsHTML);
      
      // Markeer de juiste punten
      const points = elem.querySelectorAll('.point');
      for(let i = 0; i < markedDots; i++) {
          points[i].classList.add('marked');
      }
  });
});





document.addEventListener('DOMContentLoaded', function() {
  // Haal alle elementen op die we nodig hebben
  const filterButtons = document.querySelectorAll('.filter-buttons .btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  // Voeg click event listeners toe aan alle filterknoppen
  filterButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Verwijder 'active' class van alle knoppen
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Voeg 'active' class toe aan de geklikte knop
          this.classList.add('active');
          
          const filterValue = this.getAttribute('data-filter');
          
          // Filter de portfolio items
          portfolioItems.forEach(item => {
              if (filterValue === 'all') {
                  // Toon alle items als 'Alles' is geselecteerd
                  item.style.display = 'block';
              } else {
                  // Toon alleen items die matchen met het filter
                  if (item.getAttribute('data-item') === filterValue) {
                      item.style.display = 'block';
                  } else {
                      item.style.display = 'none';
                  }
              }
          });
          
          // Animeer de items voor een soepele overgang
          setTimeout(() => {
              portfolioItems.forEach(item => {
                  if (item.style.display === 'block') {
                      item.style.opacity = '0';
                      item.style.transform = 'translateY(20px)';
                      item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                      
                      setTimeout(() => {
                          item.style.opacity = '1';
                          item.style.transform = 'translateY(0)';
                      }, 100);
                  }
              });
          }, 50);
      });
  });
  
  // Activeer standaard de 'Alles' knop
  document.querySelector('.filter-buttons .btn[data-filter="all"]').click();
});














document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const button = this.querySelector('button[type="submit"]');
  
  try {
      button.disabled = true;
      button.textContent = 'Verzenden...';
      
      // Verstuur naar Web3Forms
      const response = await fetch(this.action, {
          method: 'POST',
          body: new FormData(this)
      });
      
      if (response.ok) {
          // MANUELE REDIRECT - betrouwbaarder
          window.location.href = this.querySelector('[name="redirect"]').value;
      } else {
          throw new Error(await response.text());
      }
  } catch (error) {
      console.error("Fout:", error);
      button.disabled = false;
      button.textContent = 'Verstuur Bericht';
      // Toon alleen melding als er echt geen e-mail kwam
      if (!confirm('Bericht ontvangen! Klik OK om naar de bedankpagina te gaan.')) {
          window.location.href = this.querySelector('[name="redirect"]').value;
      }
  }
});

