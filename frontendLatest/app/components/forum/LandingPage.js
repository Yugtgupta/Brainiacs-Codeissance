import React from "react";
import { Link } from "react-router-dom";

const forumQuestions = [
  {
    id: 1,
    title: "How to optimize React performance?",
    description: "Looking for tips to improve my React app's speed.",
    author: "ReactNewbie",
  },
  {
    id: 2,
    title: "Best practices for state management",
    description: "Comparing Redux, MobX, and React Context.",
    author: "StateManager",
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox",
    description: "When should I use Grid over Flexbox?",
    author: "LayoutLearner",
  },
  {
    id: 4,
    title: "Async/Await vs Promises",
    description: "Pros and cons of different async patterns in JS.",
    author: "AsyncFan",
  },
  {
    id: 5,
    title: "Docker for beginners",
    description: "How to start containerizing applications?",
    author: "DockerNewbie",
  },
  {
    id: 6,
    title: "TypeScript must-know features",
    description: "Essential TypeScript features for JS developers.",
    author: "TypeScriptPro",
  },
];

const LandingPage = () => {
  return (
    <div className="forum-container">
      <header className="forum-header">
        <h1>Community Forum</h1>
        <Link to="/community-forum/add">Add Question</Link>
      </header>
      <main className="forum-content">
        <div className="question-grid">
          {forumQuestions.map((question) => (
            <Link
              to={`/community-forum/${question.id}`}
              key={question.id}
              className="question-item"
            >
              <h2 className="question-title">{question.title}</h2>
              <p className="question-description">{question.description}</p>
              <p className="question-author">Asked by: {question.author}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
