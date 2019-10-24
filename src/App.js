import React from 'react';
import './App.css';
import { useState, useEffect, createRef } from 'react';
import Login from './components/login.js';
import Blog from './components/Blog.js';
import BlogEntryForm from  './components/blog_entry_form';
import Notification from './components/notification';
import Togglable from './components/togglable';
import LoginService from './services/login.js';
import BlogsService from './services/blogs.js';


const NOTIFICATION_DISPLAY_TIME_MS = 300;

function App() {
  const [username, setUsername] = useState('seppo');
  const [password, setPassword] = useState('figaro');
  const [user, setUser] = useState();
  const [blogs, setBlogs] = useState(undefined);
  const [notificationText, setNotificationText] = useState(undefined);
  const [notificationIsError, setNotificationIsError] = useState(undefined);
  const [notificationTimeoutId, setNotificationTimeoutId] = useState(undefined);

  // ref for managing togglable blog form visibility
  const blogFormRef = createRef();

  // local storage of login session
  const doSaveSessionToLocalStorage = (sessionData) => {
    const userJSON = JSON.stringify(sessionData);
    window.localStorage.setItem("user", userJSON);
  }
  const doRestoreSessionFromLocalStorage = () => {
    const userJSON = window.localStorage.getItem("user");
    if (userJSON) {
      setUser(JSON.parse(userJSON));
    }
  }
  const doClearSessionFromLocalStorage = () => {
    window.localStorage.removeItem("user");
  }

  // notification management
  const doShowNotification = (text, isError) => {
    setNotificationText(text);
    setNotificationIsError(isError);
    if (notificationTimeoutId) {
      window.clearTimeout(notificationTimeoutId)
    }
    const timeoutId = window.setTimeout(() => {
      setNotificationText(undefined);
    }, NOTIFICATION_DISPLAY_TIME_MS)
    setNotificationTimeoutId(timeoutId)
  }
  const doShowInfo = (text) => doShowNotification(text, false);
  const doShowError = (text) => doShowNotification(text, true);

  // actions triggered by components
  const doFetchBlogs = () => {
    BlogsService.getAll()
      .then(blogs => setBlogs(blogs))
      .catch(e => doShowError(e))
  }
  const onDoLogin = () => {
    LoginService.doLogin(username, password)
      .then(sessionData => {
        setUser(sessionData);
        doSaveSessionToLocalStorage(sessionData);
        doShowInfo(`User ${sessionData.username} logged in!`)
      })
      .catch(e => {
        doShowError("Login failed:" + e.message);
      })
  }
  const onDoLogout = () => {
    setUser(undefined);
    setBlogs(undefined);
    doClearSessionFromLocalStorage();
    doShowInfo("Good Bye!")
  }

  const onBlogSubmit = blogValues => {
    BlogsService.save(blogValues, user.token)
    .then(() => doFetchBlogs())
    .then(() => doShowInfo(`Blog "${blogValues.title}" saved!`))
    .then(() => blogFormRef.current.doHide())
    .catch(e => {
      doShowError(e)
    })
  }

  // initiate fetching blogs if logged in
  // and blogs undefined
  useEffect(() => {
    if (blogs === undefined && user !== undefined) {
      doFetchBlogs()
    }
  });

  useEffect(() => {
    doRestoreSessionFromLocalStorage()
    doShowInfo("Welcome to BLOGS!")
  }, [])


  const blogList = !!blogs
    ? <div>{blogs.map(b => <Blog blog={b} key={b.id}/>)}</div>
    : (<div></div>);

  return (
    <div className="App">
      <Notification text={ notificationText } isError={notificationIsError}/>
      <Togglable buttonTextWhenClosed='Show Login' buttonTextWhenOpen='Hide Login'>
        <Login
          isLoggedIn={!!user}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          doLogin={onDoLogin}
          doLogout={onDoLogout}
        />
      </Togglable>
      <br/>
      { user !== undefined
        ? <Togglable
          ref={blogFormRef}
          buttonTextWhenOpen="Cancel"
          buttonTextWhenClosed="Submit New Blog">
            <BlogEntryForm onBlogSubmit={onBlogSubmit} />
        </Togglable>
        : <></>}
      <br/>
      <div>{ blogList }</div>
    </div>
  );
}

export default App;
