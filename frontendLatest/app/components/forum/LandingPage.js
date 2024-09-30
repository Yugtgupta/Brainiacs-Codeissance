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
    <div className="container mt-5">
      {/* Header Section */}
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4 text-primary">Community Forum</h1>
        <Link to="/community-forum/add" className="btn btn-primary btn-lg shadow">
          Add Question
        </Link>
      </header>

      {/* Main Content - Forum Questions */}
      <main>
        <div className="row">
          {forumQuestions.map((question) => (
            <div className="col-lg-4 col-md-6 mb-4" key={question.id}>
              <div className="card h-100 shadow-sm hover-card transition-card">
                <div className="card-body">
                  <h5 className="card-title text-primary">{question.title}</h5>
                  <p className="card-text">{question.description}</p>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <p className="text-muted small">Asked by: {question.author}</p>
                  <Link
                    to={`/community-forum/${question.id}`}
                    className="btn btn-outline-primary btn-sm transition-btn"
                  >
                    View Question
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
