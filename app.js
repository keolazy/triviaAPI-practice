document.addEventListener('DOMContentLoaded', ev => {
	let resultsArray = null
	let questionsArray = []

	// const questionList = document.getElementsByClasses('questionBox')[0]
	// const fetchButton = document.getElementByID('fetchButton')

	let collectionList = document.getElementById('collection')

	fetch(
		'https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple'
	)
		.then(res => {
			return res.json()
		})
		.then(myJson => {
			console.log(myJson)
			console.log(myJson.results)
			let resultsArray = myJson.results
			for (result of resultsArray) {
				let qa = [result.question, result.correct_answer] // qa stands for question&answer
				questionsArray.push(qa)
			}
			// make into html element here
			questionsArray.forEach(questionAnswer => {
				console.log(questionAnswer)
				let qaHtmlElement = document.createElement('li')
				qaHtmlElement.setAttribute('class', 'collection-item')
				collectionList.append(qaHtmlElement)
			})
		})
		.catch(error => {
			console.error(error)
		})
})
