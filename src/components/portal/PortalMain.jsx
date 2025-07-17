import { useState, useEffect } from 'react';
import { db, auth } from "src/scripts/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import LoadingBanner from './LoadingBanner';
import { GOOGLE_MAPS_ISC_URL } from 'src/consts';

function PortalMain() {
    const [user, setUser] = useState(null);
    const [info, setInfo] = useState(null);
    const [authenticationDidLoad, setAuthenticationDidLoad] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setAuthenticationDidLoad (true);
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
    if (authenticationDidLoad) {
        return (
            <div class="flex flex-col">
                <div class="bg-pgreen rounded-xl border-2 border-black">
                    {user ?
                    /* User is logged in */
                    (
                        <>
                        <p class="text-3xl underline">&hacks XI Registration Portal</p>
                        {info ?
                        /* We have a record that the user submitted the form. Congratulate them on that. */
                        (
                            <p class="text-xl text-center">Thanks for signing up for &hacks XI! We got your form on {new Date(info.submissionTime).toDateString()}. 
                            Check for a confirmation, and please review the preflight checklist below. See you on September 26 in the 
                            <a class="underline text-blue-600" target="_blank" href={GOOGLE_MAPS_ISC_URL}>Integrated Science Center!</a></p>
                        )
                        :
                        /* There's no record that the user has submitted the registration form. Invite them to do that */
                        (
                            <>
                            <div class="flex flex-col justify-self-center items-center">
                            <p class="text-xl text-center mt-10">You haven't registered for &hacks XI. Click the button below to fill out the registration form</p>    
                            <a class="bg-amber-300 rounded-xl shadow-card hover:shadow-hover transition text-2xl text-center p-10 m-10" target="_self" href="/questionnaire">Click to Register</a>
                            </div>
                            </>
                        )
                        }
                        </>
                    )  
                    :
                    /* user is not logged in */
                    (
                        <div class="flex flex-col justify-center justify-self-center items-center content-center">
                        <div class="flex flex-col">
                            <p class="text-3xl lg:text-5xl text-center p-5 m-5">To view this page, you need an &hacks XI account.</p>
                            <p class="bg-amber-300 rounded-xl shadow-card hover:shadow-hover transition text-3lx lg:text-5xl text-center p-5 m-5"><a href="/authentication">Sign in to yours or create one here</a></p>
                        </div>
                        </div>
                    )
                    }
                </div>
            </div>
        )
    }
    else {
        return (
            <LoadingBanner />
        )
    }
}

export default PortalMain;