let deckId
let computerScore = 0
let playerScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remaining = document.getElementById('remaining-cards')
const computerScoreEl = document.getElementById('computer-score')
const playerScoreEl = document.getElementById('player-score')



function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            remaining.textContent = `Remaining Cards: ${data.remaining}`

            console.log(deckId)
        })
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data.remaining)
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
            const winnerText = determineCardWinner(data.cards[0], data.cards[1])
            header.textContent = winnerText
            remaining.textContent = `Remaining Cards: ${data.remaining}`
            if (data.remaining ===0) {
                drawCardBtn.disabled = true
                if (computerScore > playerScore) {
                    header.textContent = `Computer won by ${computerScore} to ${playerScore}!🏆`
                    } else if (playerScore > computerScore) {
                    header.textContent = `Player won by ${playerScore} to ${computerScore}!🏆`    
                    } else {
                        header.textContent = `🚀 It's a TIE 🚀 `
                    }
            }
        })
})

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        playerScore++
        playerScoreEl.textContent = `Player score: ${playerScore}`
        return "You wins!"
    } else {
        return "War!"
    }
}
