let deckId = ''

fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      deckId = data.deck_id
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

    

document.querySelector('button').addEventListener('click', drawTwo)
let player1Score = 0
let player2Score = 0

const audio = document.querySelector('#audio');
document.querySelector('button').addEventListener('click', playAudio)

function playAudio() {
  audio.play()
}

function drawTwo(){
  const url =`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
 
  fetch(url)
  .then(res => res.json())
  .then(data =>{
    console.log(data)
    document.querySelector('#player1').src = data.cards[0].image
    document.querySelector('#player2').src = data.cards[1].image
    let player1Val = convertToNum(data.cards[0].value)
    let player2Val = convertToNum(data.cards[1].value)
    if(player1Val > player2Val){
      document.querySelector('h3').innerText = 'Player 1 wins'
      player1Score += 1
      document.querySelector('#player1Score').innerText = player1Score
    }else if(player1Val < player2Val){
      document.querySelector('h3').innerText = 'Player 2 wins'
      player2Score += 1
      document.querySelector('#player2Score').innerText = player2Score
    }else{
      document.querySelector('h3').innerText = 'Prepare for WAR'
    }

  })
  .catch(err => {
    console.log(`error ${err}`)
  })
}

function convertToNum(val){
  if(val === 'ACE'){
    return 14
  }else if(val === 'KING'){
    return 13
  }else if(val === 'QUEEN'){
    return 12
  }else if(val === 'JACK'){
    return 11
  }else{
    return Number(val)
  }
}

