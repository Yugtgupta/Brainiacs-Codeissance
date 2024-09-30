import React, { useState } from "react";
import { Link } from "react-router-dom";

const singleFormData = {
  fTitle: "Sample Forum Title",
  description: "This is a sample description for the forum post.",
  tags: ["react", "javascript", "forum"],
};

const SingleForum = () => {
  const [answer, setAnswer] = useState("");
  const [answersList, setAnswersList] = useState([
    {
      answer:
        "This is the answer for the above question. I need more help. Need more content in this answer or can you help me?Amet esse qui aliquip aliquip veniam deserunt amet tempor eu consequat anim.",
      username: "demoname",
      role: "student",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer) {
      setAnswersList([...answersList, answer]);
      setAnswer("");
    }
  };

  return (
    <div className="forum-container">
      <Link style={{ color: "black", fontSize: "16px" }} to="/community-forum">
        Go Back
      </Link>
      <h1 style={{ marginTop: "30px" }}>{singleFormData.fTitle}</h1>
      <p>{singleFormData.description}</p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "60px",
          alignItems: "end",
        }}
      >
        <textarea
          type="text"
          value={answer}
          rows={4}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Add your answer"
          style={{
            border: "2px solid #000",
            padding: "10px 18px",
            width: "100%",
            resize: "none",
            borderRadius: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            width: "fit-content",
            borderRadius: "10px",
            background: "#000",
            color: "#fff",
          }}
        >
          Submit
        </button>
      </form>
      <div>
        <h3>Answers:</h3>
        {answersList.length === 0 && <>No Answers Yet</>}
        {/* <ul style={{ marginLeft: "30px" }}>
          {answersList.map((ans, index) => (
            <li key={index}>{ans.answer}</li>
          ))}
        </ul> */}

        <div style={{ display: "flex", flexDirection: "column" }}>
          {answersList.length === 0 && <p>No Answers Yet</p>}
          {answersList?.map((ans, index) => (
            <div
              key={index}
              style={{
                margin: "10px 20px",
                border: "2px solid #000",
                borderRadius: "8px",
                padding: "16px 20px",
              }}
            >
              <p style={{ margin: "4px 0 10px 0" }}>{ans.answer}</p>
              <p style={{ margin: "4px 0", textAlign: "right" }}>
                By {ans.username}
              </p>
              <p style={{ margin: "4px 0", textAlign: "right" }}>{ans.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleForum;
