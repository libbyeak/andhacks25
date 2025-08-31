/* This is the actual form that users fill out in order to register for &hacks, including the firebase portions */
import { useState, useEffect } from 'react';
import { db, auth } from 'src/scripts/firebase'; // Import your Firestore instance from Firebase config
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import LoadingBanner from './LoadingBanner';
/* On the existence of separate "name" and "title" fields: "title" is the name I'm confident looks good to the user. "Name"
 * is the name I'm confident could be used as a variable name down the line without causing Unicode problems or whatever */

const formLayout = {
    "items": [
        {
            "title": "Name",
            "name": "name",
            "type": "text",
            "required": true
        },
        {
            "title": "Age",
            "name": "age",
            "type": "number",
            "required": true,
        },
        {
            "title": "College or University",
            "name": "school",
            "type": "dropdown",
            "required": true,
            "keys": [
              "The College of William and Mary",
              "George Mason University",
              "James Madison University",
              "Old Dominion University",
              "University of Virginia",
              "University of Richmond",
              "Virginia Commonwealth University",
              "Virginia Polytechnic University",
              "Virginia State University",
            ]
        },
        {
            "title": "Role at &hacks XI",
            "name": "role",
            "type": "dropdown",
            "keys": [
                "Hacker",
                "Judge",
                "Mentor",
                "Volunteer",
            ]
        }
    ]
}

function RegistrationForm() {
  const [user, setUser] = useState(null);
  const [authenticationDidLoad, setAuthenticationDidLoad] = useState(false);
  const [info, setInfo] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      /* see note in SignOn.jsx */
      setUser(user);
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
        .finally(() => {
            setAuthenticationDidLoad(true);
        })
    }
    else {
        console.log('no user exists');
        setAuthenticationDidLoad(true);
    }
    })
  });

  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    age: 0,
    role: "",
    school: "",
    submissionTime: Date.now(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add form data to Firestore
      const docRef = await addDoc(collection(db, 'registrants-tmp'), {
        name: inputData.name,
        email: auth.currentUser.email,
        age: inputData.age,
        role: inputData.role,
        school: inputData.school,
        submissionTime: Date.now()
      });

      console.log('Document written with ID: ', docRef.id);
      // Optionally, reset the form after submission
      setInputData({ name: '', age: '', role: '', school: '' }); //FIXME: this doesn't work for some reason.
    } catch (e) {
      console.error('Error adding document: ', e);
      alert("Couldn't submit your form, for reason " + e + 
        "Please report this error to computing@wm.edu"
      );
    }
    window.location.href = '/portal'; /* send the user along */
  };
          

  if (authenticationDidLoad) {
    if (!info) {
      return (
        /* TODO: There are two states: logged in, and not logged in. There should be three: those two, plus "loading" -- fixed 7/17/25 */
        <>
        {auth.currentUser ? 
        /* authenticated */
        (
        <div class="flex flex-col">
          <div class="bg-pgreen rounded-xl border-2 border-black mb-20">
            <p>
              &hacks XI Registration Form (Fall 2025)
              Thank you for showing interest in &hacks XI, William & Mary's 11th annual hackathon! Please fill out this form to receive all future correspondence about the event and reserve your spot!

              FAQ:
              When? 
              From the morning of September 27th to the evening of September 28th (Sept. 27-28). The schedule will roughly look like this:
              Saturday: hacker check-in, opening ceremony, team building, hacking begins, provided lunch, workshops/events throughout the day, provided dinner.
              Sunday: provided breakfast, hacking ends, in-person judging, closing ceremony, provided dinner.
              Where? 
              William & Mary (Williamsburg, VA, USA)
              Integrated Science Center (ISC), 540 Landrum Dr, Williamsburg, VA 23185
              Who?
              Undergraduate students from all universities and high school students
              This is an in-person only event!
              Why is it called &hacks?
              The school has celebrated the ampersand as a symbol of multifaceted students before, and we would like to exemplify these aspects especially within the tech community!
            </p>
            <form onSubmit={handleSubmit}>
              <div class="flex flex-col lg:w-2/3 justify-center items-end">
                <p>
                  <label for="email">Account Email</label>
                  <input class="p-2 m-5 rounded-xl border-1 border-black" type="text" name="email" id="email" value={auth.currentUser ? auth.currentUser.email : ""} readonly />
                </p>
                {formLayout.items.map((i) => (
                    ((i.type == "text" || i.type == "number") ? (
                      <div key={i.name}>
                      <label for={i.name}>{i.title}</label>
                      <input
                      class="p-2 m-5 rounded-xl border-1 border-black"
                      type={i.type} 
                      id={i.name} 
                      name={i.name} 
                      onChange={handleChange}
                      required
                      /> 
                      <br />
                      </div>
                    )
                    :
                    ((i.type == "dropdown") ? (
                      <div key={i.name}>
                      <label for={i.name}>{i.title}</label>
                      <input class="p-2 m-5 rounded-xl border-1 border-black"
                      list={i.name + "list"} 
                      name={i.name}
                      id={i.name}
                      onChange={handleChange}
                      />
                      <datalist name={i.name + "list"} id={i.name + "list"}>
                          {i.keys.map((j) => (
                            <option value={j}>{j}</option>
                          ))
                          }
                      </datalist>
                      <br />
                      </div>
                    )
                    :
                    (
                      <></>
                    )
                  )))
                )
                }
              </div>
              <div class="flex flex-col justify-center items-center">
                <button class="bg-amber-300 rounded-xl p-5 m-5 shadow-card hover:shadow-hover transition" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
        )
        :
        /* Not authenticated */
        (
          <div class="flex flex-col justify-center justify-self-center items-center content-center">
            <div class="flex flex-col bg-pgreen rounded-xl border-black border-2">
              <p class="text-3xl lg:text-5xl text-center p-5 m-5">To view this page, you need an &hacks XI account.</p>
              <p class="text-3xl lg:text-5xl text-center p-5 m-5"><a class="underline text-blue-500" href="/authentication">Sign in to yours or create one here</a></p>
            </div>
          </div>
        )
      }
      </>
      )
    }
    else {
      /* User has already submitted their registration; don't let them give us a duplicate entry */
      return (
       <>
          <div class="flex flex-col justify-center justify-self-center items-center content-center">
            <div class="flex flex-col bg-pgreen rounded-xl border-black border-2">
              <p class="text-4xl p-5 m-5 mb-16 text-center">You've already registered for &hacks XI. See you there!</p>
              <a class="text-4xl p-5 m-5 rounded-xl shadow-card hover:shadow-hover transition bg-pblue text-center" href="/portal">Back to Portal</a>
            </div>
          </div>
        </>
      )
    }
  }
  else {
    /* waiting on the authentication state */
    return (
      <LoadingBanner />
    )
  }
};

export default RegistrationForm;