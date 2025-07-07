import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


export const Context = createContext();
const AppWrapper = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, settoken] = useState("");
  const [book, setBook]=useState("");
  const [user,setUser] = useState();
  const [Identity,setIdentity] = useState("");

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setLoggedIn,
        token, 
        settoken,
        book,
        setBook,
        user,
        setUser,
        setIdentity,
        Identity
      }}
    >
      <App />
    </Context.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
