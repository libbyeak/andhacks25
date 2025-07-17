import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "src/scripts/firebase";
import LoadingBanner from './LoadingBanner';
import { REGISTRANTS_COLLECTION_NAME } from 'src/consts';

function SignOn() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); /* toggle between login/register */
  const [authenticationDidLoad, setAuthenticationDidLoad] = useState(false); /* use this to control a loading screen */
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      /* Notes on onAuthStateChanged, paraphrased from the docs
       * Code in this block runs whenever a user is signed in or signed out.
       * Crucially, it also always runs once the authentication state loads. This allows us,
       * by setting authenticationDidLoad here, we know onAuthStateChanged has fired at least once, 
       * which in turn means that the authentication state is final: if no user exists, certainly no one
       * is logged in.
       */
      setUser(currentUser);
      if (auth.currentUser) {
        const q = query(collection(db, REGISTRANTS_COLLECTION_NAME), where('email', '==', auth.currentUser.email));
        getDocs(q)
        .then(querySnapshot => {
          console.log('successfully retrieved firestore data');
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setUserInfo(doc.data());
          });
        })
        .catch(e => {
          alert(e);
        })
        .finally(() => {
          setAuthenticationDidLoad(true);
        })
      }
      else {
        console.log('no user exists');
      }
    });
    
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } 
      else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    }
    catch (error) {
      if (error.code.includes('already-in-use')) {
        alert('That email already exists in our system');
      }
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  if (authenticationDidLoad) {
  return (
    <div>
      <div><p class="text-4xl underline mb-20"><strong>Sign in or Create Account</strong></p></div>
      {user ? 
      /* greet the authenticated user */
      (
        <>
          <div class="flex flex-col justify-center justify-self-center items-center">
            <div class="flex flex-col bg-pgreen rounded-xl border-black border-2">
              <p class="text-4xl p-5 m-5 mb-16">Welcome, {user.email}</p>
              <p class="text-2xl p-5 m-5 text-center">Thanks for signing up for an account with &hacks XI! Soon, our registration form will be live here for you to fill out. We'll send you an email when it's time to do that. Until then, enjoy!</p>
              <a class="bg-amber-300 rounded-xl shadow-card hover:shadow-hover transition p-10 m-10" href="/portal"><p class="text-2xl text-center">Go to Portal</p></a>
              <button class="bg-amber-300 rounded-xl shadow-card hover:shadow-hover transition p-10 m-10 mb-20" onClick={handleLogout}><p class="text-2xl">Log out</p></button>
            </div>
          </div>
        </>
      ) : 
      /* as no user is logged in, present the sign-in page */
      (
        <div class="flex flex-col justify-center items-center content-center">
          <form onSubmit={handleSubmit}>
            <div class="flex flex-col justify-center items-center content-center bg-pgreen rounded-xl border-black border-2">
            <input
              class="w-5/6 rounded-xl p-5 m-5"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              class="w-5/6 rounded-xl p-5 m-5"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <button class="m-5 p-5 bg-pblue rounded-xl shadow-card hover:shadow-hover transition" type="submit">{isLogin ? 'Login' : 'Register'}</button>
            <br />
            <button class="m-5 p-5 bg-pblue rounded-xl shadow-card hover:shadow-hover transition" type="button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ?  'Don\'t have an account? Click to create one!' : 'Already have an account with us? Click here to sign in instead.' }
            </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
  }
  else {
    /* onAuthStateChanged hasn't fired yet -- we don't know whether anyone is logged in */
    return ( //TODO: build this out
      <LoadingBanner />
    );
  }
}

export default SignOn;