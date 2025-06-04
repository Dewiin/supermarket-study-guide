import { useState } from "react";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from "../../firebaseConfig";

export function StudyGuide() {
    const [searchKey, setSearchKey] = useState('');

    // async function handleSearch() {
    //   try {

    //   }
    //   catch {

    //   }
    // }

    return (
    <>
      <h1>Supermarket Study</h1>
      <form className='search-bar'>
        <input type='text' placeholder='Search product code...' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} required></input>
        <button onClick={handleSearch}>Search</button>
      </form>

      <div className='content'>
        <button>+</button>
      </div>
    </>
  )
}