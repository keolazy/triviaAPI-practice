document.addEventListener('DOMContentLoaded', ev => {
	// let resultsArray = null
	let questionsArray = []
	let answersArray = [] // push all answers into this array.
	let userAnswers = [] // loop through this array of users answers and compare to answersArray. Use forEach() comparison function
	let correctPoints = 0

	const appContainer = document.getElementsByClassName('container')[0]
	const numberCorrect = document.getElementsByClassName('pointsCounter')[0]
	const collectionList = document.getElementsByClassName('collection')[0]
	const fetchButton = document.getElementById('fetchButton')
	const submitButton = document.getElementById('submitButton')

	// Fetch Trivia API Button
	fetchButton.addEventListener('click', ev => {
		console.log('fetch Button works')
		fetchQuestions()
	})

	// Adds EventListener to all buttons and inputs from the "EV" object.
	// appContainer.addEventListener('click', ev => {
	ev.target.addEventListener('click', ev => {
		let buttonIdentifier = ev.target.getAttribute('id') // "common identifier variable" returns ex) button0, button1, button2
		// extracting commonID value from this button to pass into function that deals with which input I'm looking at.
		let commonIDArray = buttonIdentifier.split('') // ['b', 'u', 't', 't', 'o', 'n', 1]
		let commonID = commonIDArray[commonIDArray.length - 1] // returns last element in array aka our desired ID
		console.log(commonID)
		console.log(`button${commonID} works`)
		submitUserResponse(commonID)
	})
	// })

	// Does the comparison logic. What do I need to pass into it?
	function submitUserResponse(commonId) {
		let identifier = commonId
		let answerField = document.getElementById(`input${identifier}`) // for test purposes, only testing first question.
		let userAnswer = answerField.value // works
		console.log(userAnswer)
		if (userAnswer == answersArray[identifier]) {
			console.log('Congratulations, that\'s the correct Answer!')
			correctPoints++
		}
		numberCorrect.innerHTML = correctPoints
	}

	// Fetch API + Converting JSON response into something useful and DOM Manipulation bulk
	function fetchQuestions() {
		fetch(
			'https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple'
		)
			.then(res => {
				return res.json()
			})
			.then(myJson => {
				console.log(myJson)
				console.log(myJson.results)
				const resultsArray = myJson.results
				let buttonIdCount = 0
				let inputIdCount = 0

				for (result of resultsArray) {
					let qa = `<b>Question:</b> ${
						result.question
					}  <b>and the Answer is: </b> ${
						result.correct_answer
					} <input class='answerInput' type='form' id="input${inputIdCount}"></input> <p> <button class="btn waves-effect waves-light" type="submit" id="button${buttonIdCount}">Submit Answer</button>
					`

					// Store result.correct_answer in a globally accessible variable. How do i pass this out of promise?
					answersArray.push(result.correct_answer)
					console.log(answersArray)

					// Where the DOM magic happens
					let qaHtmlElement = document.createElement('li')
					qaHtmlElement.setAttribute('class', 'collection-item') // <li class='collection-item'></li>
					qaHtmlElement.innerHTML = qa // <li class='collection-item'>${qa}</li>
					collectionList.appendChild(qaHtmlElement) // <ul> <li class='collection-item'> ${qa} </li> </ul>
					buttonIdCount++
					inputIdCount++
				}
				return resultsArray
			})
			.catch(error => {
				console.error(error)
			})
	}
})

// Just need to figure out how to make the correctAnswers from result be id_specific.
// Idea#1) push each result.correct_answer to an answersArray.
// Write function to check if(answersArray[i] === userAnswer)
