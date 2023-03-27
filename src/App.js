import './App.css';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, signInWithPopup, signOut } from 'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const [user, setUser] = useState({})
  const [success, setSuccess] = useState(false)

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user)
      })
      .catch(error => {
        console.error('error: ', error)
      })
  }
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
      })
      .catch(error => {
        console.error('error: ', error)
      })
  }

  const handleEmailRegister = (event) => {
     event.preventDefault();
     setSuccess(false)
     const form = event.target;
     const email = form.email.value;
     const password = form.password.value;
     createUserWithEmailAndPassword(auth,email , password)
     .then((userCredential) => {
      const user = userCredential.user;
      setSuccess(true)
      form.reset();
      verifyEmail()
      
    })
    .catch(error => {
      console.error('error: ', error)
    })
  }

const verifyEmail =() =>{
  sendEmailVerification(auth.currentUser)
  .then(()=>{
    alert('check ur email')
  })
}



  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {
        setUser({});
      })
  }
  return (
    <div className="App">

      {
        user.uid ?
          <button onClick={() => handleSignOut()}>SignOut</button>
          :
          <>
            <button onClick={() => handleGoogleSignIn()}>Google SignIn</button>
            <button onClick={() => handleGithubSignIn()}>Github SignIn</button> 

            <form onSubmit={handleEmailRegister}>
              <input type="email" name="email" placeholder='Enter email ' />
              <br />
              <input type="password" name="password" placeholder='enter password' />
              <br />
              <button type="submit">Submit</button>

            </form>
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
