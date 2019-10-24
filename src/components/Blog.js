import React from 'react'
import { useState } from 'react'
import './blog.css'

const Blog = ({ blog, onLikeClicked }) => {
  const [isFullView, setIsFullView] = useState(false)

  const toggleFullView = () => setIsFullView(!isFullView)

  const tightView =
    <div className="blog-list-entry-tight">
      <div onClick={toggleFullView}>{blog.title}<em>-- {blog.author}</em></div>
    </div>

  const fullView =
    <div className={"blog-list-entry-full"}>
      <div className={"blog-title"} onClick={toggleFullView}>{blog.title}</div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={()=>onLikeClicked(blog)}>Like</button></div>
      <div>added by {blog.user.name}</div>
    </div>

  return isFullView ? fullView : tightView
}

export default Blog