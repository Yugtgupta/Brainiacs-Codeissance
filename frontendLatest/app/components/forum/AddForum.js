import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, redirect, useNavigate } from "react-router-dom";

const AddForum = () => {
  const [qTitle, setQTitle] = useState("");
  const [qDescription, setQDescription] = useState("");
  const [qCurrentTag, setQCurrentTag] = useState("");
  const [qTags, setQTags] = useState([]);

  const navigate = useNavigate();

  const addTagsHandler = (e) => {
    e.preventDefault();
    // add the tags which are in the qTags
    if (qCurrentTag === "") {
      console.log("No Tags");
      toast.error("Please add the tag");
      return;
    }

    setQTags([...qTags, qCurrentTag]);
    toast.success("Tag Added!");
  };

  const forumAddHandler = (e) => {
    e.preventDefault();
    toast.success("Forum Added Successfully");
    navigate("/community-forum");
  };

  return (
    <div className="forum-container">
      <Link style={{ color: "black", fontSize: "16px" }} to="/community-forum">
        Go Back
      </Link>
      <div className="add-forum-container">
        <form onSubmit={forumAddHandler}>
          <div>
            <label>Title</label>
            <input
              placeholder="Question Title Here..."
              value={qTitle}
              onChange={(e) => setQTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              placeholder="Question Description Here..."
              value={qDescription}
              onChange={(e) => setQDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Tags</label>
            <div className="add-forum-tags">
              <input
                placeholder="Question Tags Here..."
                value={qCurrentTag}
                onChange={(e) => setQCurrentTag(e.target.value)}
              />
              <button onClick={addTagsHandler}>Add</button>
            </div>
            <div className="display-forum-tags">
              {qTags?.map((tag) => (
                <span className="display-forum-tag">{tag}</span>
              ))}
            </div>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForum;
