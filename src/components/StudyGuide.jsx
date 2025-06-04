import { useState } from "react";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from "../../firebaseConfig";

export function StudyGuide( {user} ) {
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
        }
        catch (error) {
            console.error('Error adding document:', error);
        }
    }   

    async function handleSearch(e) {
        e.preventDefault();

        try {
            const docRef = doc(db, 'users', user.uid, 'productCode', searchKey);
            const docSnap = await getDoc(docRef);

            setSearchResult(docSnap.exists() ? docSnap.data().value : null);
        }
        catch (error) {
            console.error('Error fetching document:', error);
        }
    };

    return (
    <div className="content">
        <section className="search-content">
            <h1>Supermarket Study</h1>
            <form className='search-bar' onSubmit={e => handleSearch(e)}>
                <input type='text' placeholder='Search product code...' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} required></input>
                <button type='submit'>Search</button>
                <p>{searchResult ? `"${searchResult}"`: "Code not found."}</p>
            </form>
        </section>

        <section className='add-content'>
            <form className="add-product" onSubmit={e => handleAdd(e)}>
                <input type='text' placeholder='4020' value={addKey} onChange={(e) => setAddKey(e.target.value)} required></input>
                <input type='text' placeholder='Golden Apple' value={addValue} onChange={(e) => setAddValue(e.target.value)} required></input>
                <button type="submit">+</button>
                <p>{recentlyAdded ? `"${recentlyAdded}" has been added to the database.` : ""}</p>
            </form>
        </section>
    </div>
  )
}