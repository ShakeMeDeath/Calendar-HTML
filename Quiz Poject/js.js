let QuizZone = document.querySelector(".quiz-container")

QuestionList = {
    "question hehe 1": ["anwser 1", "anwser 2", "anwser 3"],
    "question hehe 2": ["anwser 1", "anwser 2", "anwser 3"],
    "question hehe 3": ["anwser 1", "anwser 2", "anwser 3"]

}

function CreateAnElement(ElementType, ClassName, ParentElement) {
    let NewElement = document.createElement(`${ElementType}`)
    NewElement.classList.add(`${ClassName}`)
    ParentElement.appendChild(NewElement)

    return NewElement
}



Object.keys(QuestionList).forEach(question => {
    
    console.log("hehehehe")

    let NewQuestion = CreateAnElement("div", "question", QuizZone)
    
    let QuestionName = CreateAnElement("div", "question-name", NewQuestion)
    QuestionName.textContent = `${question}`;

    QuestionList[question].forEach(anwser => {
        let QuestionAwnser = CreateAnElement("div", "question-awnser", NewQuestion)
        QuestionAwnser.textContent = `${anwser}`;

        let AwnserCheckboxLabel = CreateAnElement("label", "question-checkbox-label", QuestionAwnser)
        let AwnserCheckbox = CreateAnElement("input", "question-checkbox", AwnserCheckboxLabel)
        AwnserCheckbox.type = "checkbox";
    })
});