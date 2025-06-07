import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Link } from 'react-router-dom';
import { FlashCard } from './FlashCard';
import '../styles/AllEntries.css';

export function AllEntries({ user }) {
	const [loading, setLoading] = useState(true);
	const [entries, setEntries] = useState([]);

	async function fetchData() {
		try {
			const colRef = collection(db, 'users', user.uid, 'productCode');
			const snapshot = await getDocs(colRef);
			const data = snapshot.docs.map((doc) => ({
				key: doc.id,
				value: doc.data().value,
			}));

			setEntries(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
	});

	return (
		<>
			{loading ? (
				<h1>Loading...</h1>
			) : entries.length > 0 ? (
				<section className="entries">
					<div className="entries-table-title">
						<h1>All Entries</h1>
						<Link to="/">Home</Link>
					</div>
					<div className="entries-table">
						{entries.map(({ key, value }) => (
							<FlashCard
								key={key}
								productCode={key}
								value={value}
								setEntries={setEntries}
								user={user}
							></FlashCard>
						))}
					</div>
				</section>
			) : (
				<div className="entries-table-title">
					<h1>No Entries</h1>
					<Link to="/">Home</Link>
				</div>
			)}
		</>
	);
}
