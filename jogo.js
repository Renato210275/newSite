const emojis = ['🍕', '🍔', '🍣', '🥖', '🌮', '🍜'];
let cardsArray = [...emojis, ...emojis];
let shuffled = cardsArray.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let matchedPairs = 0;

const gameBoard = document.getElementById('game-board');
const resgate = document.getElementById('resgate');

function createBoard() {
  shuffled.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (this.classList.contains('flipped') || secondCard) return;

  this.textContent = this.dataset.emoji;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}

function checkMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    matchedPairs++;
    resetCards();
    if (matchedPairs === emojis.length) {
      showResgate();
    }
  } else {
    setTimeout(() => {
      firstCard.textContent = '';
      secondCard.textContent = '';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
}

function showResgate() {
  resgate.style.display = 'block';
  resgate.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = "";

  new QRCode(qrContainer, {
    text: "https://renato210275.github.io",
    width: 150,
    height: 150
  });
}

createBoard();
