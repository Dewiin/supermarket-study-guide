import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { AuthForm } from './components/AuthForm';
import { StudyGuide } from './components/StudyGuide';
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  return (
    <>
      {user ? (
        <>
          <StudyGuide />
        </>
      ) : (
        <>
          <AuthForm />
        </>
      )}
    </>
  )
}

export default App
