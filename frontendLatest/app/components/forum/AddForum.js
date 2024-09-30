import React, { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

const AddForum = () => {
  const [qTitle, setQTitle] = useState("")
  const [qDescription, setQDescription] = useState("")
  const [qCurrentTag, setQCurrentTag] = useState("")
  const [qTags, setQTags] = useState([])

  const navigate = useNavigate()

  const addTagsHandler = e => {
    e.preventDefault()
    // Add tags if input is not empty
    if (qCurrentTag === "") {
      toast.error("Please add a tag")
      return
    }

    setQTags([...qTags, qCurrentTag])
    setQCurrentTag("") // Clear input after adding tag
    toast.success("Tag Added!")
  }

  const forumAddHandler = e => {
    e.preventDefault()
    // Add form submission logic here
    toast.success("Forum Added Successfully")
    navigate("/community-forum")
  }

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <Link to="/community-forum" className="btn btn-link">
          Go Back
        </Link>
      </div>

      <div className="card shadow-sm p-4">
        <h2 className="mb-4">Add New Forum Question</h2>
        <form onSubmit={forumAddHandler}>
          {/* Title Input */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input id="title" type="text" className="form-control" placeholder="Question Title Here..." value={qTitle} onChange={e => setQTitle(e.target.value)} required />
          </div>

          {/* Description Input */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea id="description" className="form-control" placeholder="Question Description Here..." rows="3" value={qDescription} onChange={e => setQDescription(e.target.value)} required />
          </div>

          {/* Tags Input */}
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">
              Tags
            </label>
            <div className="input-group">
              <input id="tags" type="text" className="form-control" placeholder="Question Tags Here..." value={qCurrentTag} onChange={e => setQCurrentTag(e.target.value)} />
              <button className="btn btn-outline-primary" onClick={addTagsHandler}>
                Add
              </button>
            </div>

            {/* Displaying Added Tags */}
            <div className="mt-2">
              {qTags.length > 0 ? (
                qTags.map((tag, index) => (
                  <span key={index} className="badge bg-secondary me-2 mb-2">
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-muted">No tags added yet.</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddForum
