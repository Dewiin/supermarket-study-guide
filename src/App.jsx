import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { AuthForm } from './components/AuthForm';
import { StudyGuide } from './components/StudyGuide';
import { AllEntries } from './components/AllEntries';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

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
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<StudyGuide user={user} />}></Route>
							<Route path="/all" element={<AllEntries user={user} />}></Route>
						</Routes>
					</BrowserRouter>
				</>
			) : (
				<>
					<AuthForm />
				</>
			)}
		</>
	);
}

export default App;
