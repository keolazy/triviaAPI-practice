document.addEventListener('DOMContentLoaded', ev => {
	// let resultsArray = null
	let questionsArray = []
	let correctPoints = 0

	const points = document.getElementsByClassName('pointsCounter')
	const collectionList = document.getElementsByClassName('collection')[0]
	const fetchButton = document.getElementById('fetchButton')
	const submitButton = document.getElementById('submitButton')

	fetchButton.addEventListener('click', ev => {
		console.log('fetch Button works')
		fetchQuestions()
	})

	function fetchQuestions() {
		fetch(
			'https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple'
		)
			.then(res => {
				return res.json()
			})
			.then(myJson => {
				console.log(myJson.results)
				const resultsArray = myJson.results
				let buttonIdCount = 0
				let inputIdCount = 0
				for (result of resultsArray) {
					let qa = `<b>Question:</b> ${result.question}  ${
						result.correct_answer
					} <input class='answerInput' type='form' id="input${inputIdCount}"></input><p><button class="btn waves-effect waves-light" type="submit" id=button${buttonIdCount}>Submit Answer</button>
					` // let buttonIdCount++

					// DOM manipulation comes in here.
					let answerField = document.getElementsByClassName('answerInput')
					let answerValue = answerField.value
					// button document.getElementById
					// button.addEventListener

					let qaHtmlElement = document.createElement('li')
					qaHtmlElement.setAttribute('class', 'collection-item')
					qaHtmlElement.innerHTML = qa
					collectionList.appendChild(qaHtmlElement)

					userResponse(resultsArray)
				}
			})
			.catch(error => {
				console.error(error)
			})
	}
})

// define variable for input field.value & add this to an eventListener for button;
function userResponse() {
	if (this.answerValue == result.correct_answer) {
		console.log('correct answer! +1 Point for You!!!')
		correctPoints++
	} else {
		console.log('Sorry wrong answer')
	}
}
