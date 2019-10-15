import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import Login from './components/login.js';
import Blog from './components/Blog.js';
import LoginService from './services/login.js';
import BlogsService from './services/blogs.js';

function App() {
  const [username, setUsername] = useState('seppo');
  const [password, setPassword] = useState('figaro');
  const [user, setUser] = useState(undefined);
  const [blogs, setBlogs] = useState(undefined);
  const [firstRender, setFirstRender] = useState(true); 

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
  
  // actions triggered by components
  const doFetchBlogs = () => {
    BlogsService.getAll()
      .then(blogs => setBlogs(blogs))
      .catch(e => alert(e))
  }
  const onDoLogin = () => {
    LoginService.doLogin(username, password)
      .then(sessionData => {
        setUser(sessionData);
        doSaveSessionToLocalStorage(sessionData);
        doFetchBlogs();
      })
      .catch(e => {
        alert("Kirjautuminen ei onnistunut:" + e);
      })
  }
  const onDoLogout = () => {
    setUser(undefined);
    setBlogs(undefined);
    doClearSessionFromLocalStorage();
  }

  // on first render restore session if stored
  useEffect(() => {
    if (firstRender) {
      doRestoreSessionFromLocalStorage();
      doFetchBlogs();
    }
  });

  useEffect(() => setFirstRender(false))

  const blogList = !!blogs
    ? <div>{blogs.map(b => <Blog blog={b} key={b.id}/>)}</div>
    : (<div></div>);

  return (
    <div className="App">
      <Login
        isLoggedIn={!!user}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        doLogin={onDoLogin}
        doLogout={onDoLogout}
      />
      <div>{ blogList }</div>
    </div>
  );
}

export default App;
