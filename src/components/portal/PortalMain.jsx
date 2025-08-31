import { useState, useEffect } from 'react';
import { db, auth } from "src/scripts/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LoadingBanner from './LoadingBanner';
import { GOOGLE_MAPS_ISC_URL } from 'src/consts';

function PortalMain() {
    const [user, setUser] = useState(null);
    const [info, setInfo] = useState(null);
    const [authenticationDidLoad, setAuthenticationDidLoad] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            /* see note in SignOn.jsx */
            setUser(currentUser);
            if (auth.currentUser) {
                /* Look up whether we have a record of this user submitting the registration form */
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
                    /* Something bad happened and we couldn't confirm with Firestore. Note that this does not mean
                     * there's no form -- that case doesn't throw an error
                    */
                    alert(e);
                })
                .finally(() => {
                    setAuthenticationDidLoad(true); /* get on the horn that we're done */
                })
            }
            else {
                /* we confirmed that nobody's logged in */
                console.log('no user exists');
                setAuthenticationDidLoad(true);
            }
            });
            return () => unsubscribe();
        }, []);

    if (authenticationDidLoad) {
        return (
            <>
            <p class="text-3xl underline p-5 m-5 mb-10">&hacks XI Registration Portal</p>
            <div class="flex flex-col justify-center items-center content-center">

                <div class="flex flex-col bg-pgreen rounded-xl border-2 border-black mb-20">
                    {user ?
                    /* User is logged in */
                    (
                        <>
                        {info ?
                        /* We have a record that the user submitted the form. Congratulate them on that. */
                        (
                            <p class="text-xl text-center p-2 m-2 md:p-10 md:m-10">Thanks for signing up for &hacks XI! We received your registration on {new Date(info.submissionTime).toDateString()}. 
                            There is nothing else you need to do at this time. Check back later for more information about logistics. See you on September 27 on the <a class="underline text-blue-600" target="_blank" href={GOOGLE_MAPS_ISC_URL}>William & Mary campus.</a></p>
                        )
                        :
                        /* There's no record that the user has submitted the registration form. Invite them to do that */
                        (
                            <>
                            <div class="flex flex-col justify-self-center items-center">
                            <p class="text-xl text-center mt-10">You haven't registered for &hacks XI. Click the button below to fill out the registration form</p>    
                            <a class="bg-amber-300 rounded-xl shadow-card hover:shadow-hover transition text-2xl text-center p-2 m-2 md:p-10 md:m-10" target="_self" href="/questionnaire">Click to Register</a>
                            </div>
                            </>
                        )
                        }
                        <button class="rounded-xl shadow-card hover:shadow-hover transition bg-pblue p-5 m-5 text-center" onClick={() => {signOut(auth)}}>Sign Out</button>
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
            </>
        )
    }
    else {
        /* Authentication hasn't loaded yet, tell the user we're still waiting */
        return (
            <LoadingBanner />
        )
    }
}

export default PortalMain;