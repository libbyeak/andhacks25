import React, { useState, useEffect } from 'react';
import { db, auth } from "src/scripts/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

function PortalMain() {
    const [user, setUser] = useState(null);
    const [info, setInfo] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (auth.currentUser) {
            const q = query(collection(db, 'registrants-tmp'), where('email', '==', auth.currentUser.email));
            getDocs(q)
            .then(querySnapshot => {
                console.log('successfully retrieved firestore data');
                querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                setInfo(doc.data());
                });
            })
            .catch(e => {
            alert(e);
            })
        }
        else {
            console.log('no user exists');
        }
        });
        
        return () => unsubscribe();
    }, []);

    return (
        <>
        {user ?
        (
            info ?
            (
                <p>we have your form</p>
            )
            :
            (
                <p>Please submit the form</p>
            )
        )  
        :
        (
            <p>Please log in</p>
        )
        }
        </>
    )
}

export default PortalMain;