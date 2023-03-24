import './App.css';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const [user, setUser] = useState({})

  const googleProvider =new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, googleProvider)
    .then( result=>{
      const user = result.user;
      setUser(user);
      console.log(user)
    })
    .catch(error=>{
      console.error('error: ', error)
    })
  }
  const handleGithubSignIn = () => {
    signInWithPopup(auth , githubProvider)
    .then(result=>{
      const user = result.user;
      setUser(user);
    })
    .catch(error=>{
      console.error('error: ', error)
    })
  }

  const handleSignOut = () =>{
    signOut(auth)
    .then(()=>{
      setUser({});
    })
    .catch(()=>{
      setUser({});
    })
  }
  return (
    <div className="App">

      {
        user.uid ?
        <button onClick={()=>handleSignOut()}>SignOut</button> 
        :
        <>
         <button onClick={()=>handleGoogleSignIn()}>Google SignIn</button>
         <button onClick={()=>handleGithubSignIn()}>Github SignIn</button>
        </>
       
      }
     
      
      
        {
          user.uid &&
          <div>
          <h2>User name: {user.displayName}</h2>
          <h2>User Email: {user.email}</h2>
          <img src={user.photoURL} alt="" />
        </div>
        }
       

    </div>
  );
}

export default App;
