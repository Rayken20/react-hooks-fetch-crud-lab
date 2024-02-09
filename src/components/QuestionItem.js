import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateCorrectAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    onDeleteQuestion(id);
  }

  function handleCorrectAnswerChange(event) {
    const correctIndex = parseInt(event.target.value);
    onUpdateCorrectAnswer(id, correctIndex);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectAnswerChange}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
