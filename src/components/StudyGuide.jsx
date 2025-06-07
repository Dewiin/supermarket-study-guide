import { useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Link } from 'react-router-dom';

export function StudyGuide({ user }) {
	const [addKey, setAddKey] = useState('');
	const [addValue, setAddValue] = useState('');
	const [searchKey, setSearchKey] = useState('');
	const [searchResult, setSearchResult] = useState(null);
	const [recentlyAdded, setRecentlyAdded] = useState('');

	async function handleAdd(e) {
		e.preventDefault();

		try {
			const docRef = doc(db, 'users', user.uid, 'productCode', addKey);
			await setDoc(docRef, { value: addValue });
			setRecentlyAdded(`${addKey} : ${addValue}`);

			setAddKey('');
			setAddValue('');
		} catch (error) {
			console.error('Error adding document:', error);
		}
	}

	async function handleSearch(e) {
		e.preventDefault();

		try {
			const docRef = doc(db, 'users', user.uid, 'productCode', searchKey);
			const docSnap = await getDoc(docRef);

			setSearchResult(docSnap.exists() ? docSnap.data().value : null);
		} catch (error) {
			console.error('Error fetching document:', error);
		}
	}

	return (
		<div className="content">
			<section className="search-content">
				<h1>Supermarket Study</h1>
				<form className="search-bar" onSubmit={(e) => handleSearch(e)}>
					<input
						type="text"
						placeholder="Search product code..."
						value={searchKey}
						onChange={(e) => setSearchKey(e.target.value)}
						maxLength={10}
						required
					></input>
					<button type="submit">Search</button>
					<p>{searchResult ? `"${searchResult}"` : 'Code not found.'}</p>
				</form>
			</section>

			<section className="add-content">
				<form className="add-product" onSubmit={(e) => handleAdd(e)}>
					<input
						type="text"
						placeholder="4020"
						value={addKey}
						onChange={(e) => setAddKey(e.target.value)}
						maxLength={100}
						required
					></input>
					<textarea
						placeholder="Golden Apple"
						value={addValue}
						onChange={(e) => setAddValue(e.target.value)}
						maxLength={5000}
						required
					></textarea>
					<button type="submit">+</button>
					<p>
						{recentlyAdded
							? recentlyAdded.length > 50
								? `"${recentlyAdded.substring(0, 50)}..." has been added to the database.`
								: `${recentlyAdded} has been added to the database.`
							: ''}
					</p>
				</form>
			</section>

			<footer>
				<Link to="/all">See all entries</Link>
			</footer>
		</div>
	);
}
