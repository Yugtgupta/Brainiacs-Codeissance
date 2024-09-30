import React, { useState } from "react"
import { Link } from "react-router-dom"

const singleFormData = {
  fTitle: "Sample Forum Title",
  description: "This is a sample description for the forum post.",
  tags: ["react", "javascript", "forum"]
}

const SingleForum = () => {
  const [answer, setAnswer] = useState("")
  const [answersList, setAnswersList] = useState([
    {
      answer: "This is the answer for the above question. I need more help. Need more content in this answer or can you help me? Amet esse qui aliquip aliquip veniam deserunt amet tempor eu consequat anim.",
      username: "demoname",
      role: "student"
    }
  ])

  const handleSubmit = e => {
    e.preventDefault()
    if (answer) {
      setAnswersList([...answersList, { answer, username: "Kush Kapadia", role: "student" }])
      setAnswer("")
    }
  }

  return (
    <div className="container mt-4">
      <Link className="text-primary mb-4 d-block" to="/community-forum">
        &larr; Back to Forum
      </Link>

      {/* Forum Question Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h1 className="card-title">{singleFormData.fTitle}</h1>
          <p className="card-text">{singleFormData.description}</p>
          <div className="mt-3">
            {singleFormData.tags.map((tag, index) => (
              <span key={index} className="badge badge-secondary mr-2">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Answer Form */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h4 className="mb-3">Add Your Answer</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <textarea className="form-control" rows="4" value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Write your answer here..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={!answer.trim()}>
              Submit Answer
            </button>
          </form>
        </div>
      </div>

      {/* Answers Section */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="mb-4">Answers</h3>
          {answersList.length === 0 ? (
            <p>No answers yet. Be the first to answer!</p>
          ) : (
            answersList.map((ans, index) => (
              <div key={index} className="media mb-4 p-3 border rounded shadow-sm">
                <img src={`https://ui-avatars.com/api/?name=${ans.username}&background=random`} alt={ans.username} className="mr-3 rounded-circle" style={{ width: "60px", height: "60px" }} />
                <div className="media-body">
                  <p className="text-muted mb-1">
                    {ans.username} <small className="text-secondary">({ans.role})</small>
                  </p>
                  <p>{ans.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleForum
