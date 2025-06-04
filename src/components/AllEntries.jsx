import { useState, useEffect } from "react"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import { Link } from "react-router-dom"
import "../styles/AllEntries.css"

export function AllEntries( {user} ) {
    const [loading, setLoading] = useState(true);
    const [entries, setEntries] = useState([]);

    async function handleDelete(key) {
        try {
            const docRef = doc(db, 'users', user.uid, 'productCode', key);
            await deleteDoc(docRef);
            setEntries((prev) => prev.filter(entry => entry.key !== key));
        }
        catch (error) {
            console.error("Error deleting document:", error);
        }
    }

    async function fetchData() {
        try {
            const colRef = collection(db, 'users', user.uid, 'productCode');
            const snapshot = await getDocs(colRef);
            const data = snapshot.docs.map(doc => ({
                key: doc.id,
                value: doc.data().value,
            }));

            setEntries(data);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    })
    
    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (entries.length > 0 ? (
                <>
                <div className="entries-table">
                    <div className="entries-table-title">
                        <h1>All Entries</h1>
                        <Link to='/'>Home</Link>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>Product Code</th>
                            <th>Product Item</th>
                        </tr>
                        </thead>
                        <tbody>
                        {entries.map(({ key, value }) => (
                            <>
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                    <td>
                                        <button onClick={() => handleDelete(key)} className="remove-button">✖</button>
                                    </td>
                                </tr>
                            </>
                        ))}
                        </tbody>
                    </table>
                </div>
                </>
            ) : (
                <div className="entries-table-title">
                    <h1>No Entries</h1>
                    <Link to='/'>Home</Link>
                </div>
            ))}
        </>
    )
}