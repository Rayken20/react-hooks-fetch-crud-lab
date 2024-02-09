import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("List");

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:4000/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchQuestions();
  }, []);

  async function handleUpdateCorrectAnswer(id, correctIndex) {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex }),
      });
      if (!response.ok) {
        throw new Error("Failed to update correct answer");
      }
      
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === id ? { ...question, correctIndex } : question
        )
      );
    } catch (error) {
      console.error("Error updating correct answer:", error);
    }
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm
          onAddQuestion={(newQuestion) =>
            setQuestions([...questions, newQuestion])
          }
        />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={(id) =>
            setQuestions(questions.filter((question) => question.id !== id))
          }
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;
