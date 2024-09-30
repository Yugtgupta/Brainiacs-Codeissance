import React, { useState } from "react"

// Quiz questions and options array
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "J.K. Rowling", "William Shakespeare", "Mark Twain"],
    correctAnswer: "William Shakespeare"
  },
  {
    question: "What is the boiling point of water?",
    options: ["100°C", "50°C", "90°C", "80°C"],
    correctAnswer: "100°C"
  }
]

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState("")
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  // Handle option selection
  const handleOptionChange = e => {
    setSelectedOption(e.target.value)
  }

  // Handle next question or finish quiz
  const handleNext = () => {
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    setSelectedOption("") // Reset option selection
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  // Save result (add custom functionality as needed)
  const saveResult = () => {
    alert(`Your score of ${score}/${quizData.length} has been saved!`)
    // Placeholder for saving result logic, e.g. API call
  }

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div className="quiz-card">
          <h2 className="quiz-question">{quizData[currentQuestion].question}</h2>
          <div className="quiz-options">
            {quizData[currentQuestion].options.map((option, index) => (
              <div key={index} className="quiz-option">
                <label className="option-label">
                  <input type="radio" name="quiz" value={option} checked={selectedOption === option} onChange={handleOptionChange} />
                  {option}
                </label>
              </div>
            ))}
          </div>
          <button className={`quiz-button ${!selectedOption ? "disabled" : ""}`} onClick={handleNext} disabled={!selectedOption}>
            {currentQuestion + 1 === quizData.length ? "Finish" : "Next"}
          </button>
        </div>
      ) : (
        <div className="quiz-card">
          <h2>Quiz Complete!</h2>
          <p className="quiz-score">
            Your Score: {score}/{quizData.length}
          </p>
          <button className="quiz-button" onClick={saveResult}>
            Save Result
          </button>
        </div>
      )}
    </div>
  )
}

export default Quiz
