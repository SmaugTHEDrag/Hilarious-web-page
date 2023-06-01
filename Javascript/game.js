const card = document.querySelectorAll('.cell')
const front = document.querySelectorAll('.front')
const container = document.querySelector('.container')
const score = document.querySelector('.score span')
const restartButton = document.querySelector('.restart')
const restartButton2 = document.querySelector('.restart2')
const congratsScreen = document.querySelector('.congrats');
const finalScore = document.querySelector('.final-score');
const losingScreen = document.querySelector('.losing-screen');
const losingScore = document.querySelector('.losing-score');
suffleImage()
clicking()

// restart the game 
restartButton.addEventListener('click', () => {
    location.reload()
})
restartButton2.addEventListener('click', () => {
    location.reload()
})

//radom the position of all cards' image 
function suffleImage(){
    card.forEach(c=>{
        const num = [...Array(card.length).keys()]
        const random = Math.floor(Math.random()*card.length)
        c.style.order = num[random]
    })
}

function clicking(){
    for(let i =0; i<card.length; i++){
        card[i].addEventListener('click' ,()=>{
            front[i].classList.add('flip')
            const flippedCard = document.querySelectorAll('.flip')
            if(flippedCard.length == 2){
                container.style.pointerEvents ='none'
                setInterval(() => {                    
                    container.style.pointerEvents ='all'
                }, 1000);
                match(flippedCard[0] , flippedCard[1])
            }
        })
    }
}

// make the match of 2 cards
function match(cardOne , cardTwo){
    if(cardOne.dataset.index == cardTwo.dataset.index){
        //if the same score+10
        score.innerHTML = parseInt(score.innerHTML) + 10
        cardOne.classList.remove('flip') 
        cardTwo.classList.remove('flip') 
        cardOne.classList.add('match')
        cardTwo.classList.add('match')
        const matchedCards = document.querySelectorAll('.match');
        if (matchedCards.length === card.length) {
            showCongratsScreen();
        }
    } else {
        // score-1 if not same 
        score.innerHTML = parseInt(score.innerHTML) - 1;
        if (score.innerHTML == 0) {
            showLosingScreen();
            return;
        }
        setTimeout(() => {
            cardOne.classList.remove('flip') 
            cardTwo.classList.remove('flip') 
        }, 500);
    }
}
function showCongratsScreen() {
    // Hide the game board
    document.querySelector('.container').style.display = 'none';
  
    // Show the congrats screen
    congratsScreen.style.display = 'block';
  
    // Set the final score
    finalScore.textContent = score.innerHTML;
}

function showLosingScreen() {
    // Hide the game board
    document.querySelector('.container').style.display = 'none';
  
    // Show the losing screen
    losingScreen.style.display = 'block';
  
    // Set the losing score
    losingScore.textContent = score.innerHTML;
}

window.addEventListener("DOMContentLoaded", () => {
	const starRating = new StarRating("form");
});

class StarRating {
	constructor(qs) {
		this.ratings = [
			{ id: 1, name: "Terrible" },
			{ id: 2, name: "Bad" },
			{ id: 3, name: "OK" },
			{ id: 4, name: "Good" },
			{ id: 5, name: "Excellent" }
		];
		this.rating = null;
		this.el = document.querySelector(qs);

		this.init();
	}
	init() {
		this.el?.addEventListener("change", this.updateRating.bind(this));

		// stop Firefox from preserving form data between refreshes
		try {
			this.el?.reset();
		} catch (err) {
			console.error("Element isn’t a form.");
		}
	}
	updateRating(e) {
		// clear animation delays
		Array.from(this.el.querySelectorAll(`[for*="rating"]`)).forEach((el) => {
			el.className = "rating__label";
		});

		const ratingObject = this.ratings.find((r) => r.id === +e.target.value);
		const prevRatingID = this.rating?.id || 0;

		let delay = 0;
		this.rating = ratingObject;
		this.ratings.forEach((rating) => {
			const { id } = rating;

			// add the delays
			const ratingLabel = this.el.querySelector(`[for="rating-${id}"]`);

			if (id > prevRatingID + 1 && id <= this.rating.id) {
				++delay;
				ratingLabel.classList.add(`rating__label--delay${delay}`);
			}

			// hide ratings to not read, show the one to read
			const ratingTextEl = this.el.querySelector(`[data-rating="${id}"]`);

			if (this.rating.id !== id) ratingTextEl.setAttribute("hidden", true);
			else ratingTextEl.removeAttribute("hidden");
		});
	}
}
