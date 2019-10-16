import React from 'react'
import { useState } from 'react'
import './blog_entry_form.css'

const DEFAULT_TITLE = ''
const DEFAULT_AUTHOR = ''
const DEFAULT_URL = 'http://'

const BlogEntryForm = ({ blogValues, onBlogSubmit }) => {
  const [title, setTitle] = useState(DEFAULT_TITLE)
  const [author, setAuthor] = useState(DEFAULT_AUTHOR)
  const [url, setUrl] = useState(DEFAULT_URL)

  const onTitleChange = e => { setTitle(e.target.value) };
  const onAuthorChange = e => { setAuthor(e.target.value) };
  const onUrlChange = e => { setUrl(e.target.value) };

  const doClearFields = e => {
    setTitle(DEFAULT_TITLE)
    setAuthor(DEFAULT_AUTHOR)
    setUrl(DEFAULT_URL)
  };

  const onSubmitClicked = e => {
    onBlogSubmit({ title, author, url });
    doClearFields();
  }
  const onClearClicked = e => {
    doClearFields();
  }
  return(
    <form className="blog-entry-form">
      <h3>New Blog</h3>
      <label htmlFor="title">Title:</label>
      <input id="title" type="text" value={ title } onChange={ onTitleChange } />
      <br/>
      <label htmlFor="author">Author:</label>
      <input id="author" type="text" value={ author } onChange={ onAuthorChange } />
      <br/>
      <label htmlFor="url">URL:</label>
      <input id="url" type="text" value={ url } onChange={ onUrlChange } />
      <br/>
      <div className="button-group">
      <input type="submit" value="Save!" onClick={ onSubmitClicked } />
      <input type="button" value="Clear" onClick={ onClearClicked } />
      </div>
    </form>
  );
}

export default BlogEntryForm;
