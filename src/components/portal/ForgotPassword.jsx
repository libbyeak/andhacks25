import { useState, useEffect } from 'react';
import { db, auth } from 'src/scripts/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import LoadingBanner from './LoadingBanner';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    async function handleSubmit(e) {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Successfully sent password confirmation email to you. Check your spam folder if in a moment you don\'t see it')
        })
        .catch((error) => {
            if (error.code.includes('missing-email')) {
                alert('Please enter an email');
            }
            else {
                alert(errorMessage + "\n\nPlease report this error to the &hacks team by sending it to computing@wm.edu");
            }
        });
    }

    return (
        <>
        <div><p class="text-4xl underline mb-20"><strong>Reset your &hacks XI Password</strong></p></div>
        <div class="flex flex-col justify-center items-center content-center bg-pgreen rounded-xl border-black border-2">
        <form onSubmit={handleSubmit}>
            <div class="flex flex-col justify-center items-center content-center">
                <input class="w-5/6 rounded-xl p-5 m-5" type="email" placeholder="Enter your account email..." onChange={(e) => { setEmail(e.target.value)}} />
                <input class="bg-pblue rounded-xl shadow-card hover:shadow-hover transition p-5 m-5 text-center" type="submit" value="Send Reset Link" />
                <a class="bg-pblue rounded-xl shadow-card hover:shadow-hover transition p-5 m-5 text-center" href="/authentication">Back to Sign-in</a>
            </div> 
        </form>
        </div>
        </>
    )
}

export default ForgotPassword;