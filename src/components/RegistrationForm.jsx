import React, { useState, useEffect } from 'react';
import { db, auth } from '../scripts/firebase'; // Import your Firestore instance from Firebase config
import { collection, addDoc } from 'firebase/firestore';
import { updateCurrentUser } from 'firebase/auth';

/* On the existence of separate "name" and "title" fields: "title" is the name I'm confident looks good to the user. "Name"
 * is the name I'm confident could be used as a variable name down the line without causing Unicode problems or whatever */
var userExists = false;

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
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      userExists = !userExists;
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
        age: inputData.age,
        role: inputData.role,
        school: inputData.school,
        submissionTime: Date.now()
      });

      console.log('Document written with ID: ', docRef.id);
      // Optionally, reset the form after submission
      setInputData({ name: '', email: '' });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
          

  return (
    /* TODO: There are two states: logged in, and not logged in. There should be three: those two, plus "loading" */
    auth.currentUser ? 
    (
    <div class="flex flex-col">
      <div class="bg-pgreen rounded-xl border-2 border-black">
        <form onSubmit={handleSubmit}>
          <div class="flex flex-col lg:w-2/3 justify-center items-end">
            <p>
              <label for="email">Account Email</label>
              <input class="p-2 m-5 rounded-xl border-1 border-black" type="text" name="email" value={auth.currentUser ? auth.currentUser.email : ""} readonly/>
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
                  required/> 
                  <br />
                  </div>
                )
                :
                ((i.type == "dropdown") ? (
                  <div key={i.name}>
                  <label for={i.name}>{i.title}</label>
                  <input class="p-2 m-5 rounded-xl border-1 border-black" list={i.name + "list"} name={i.name} id={i.name} onChange={handleChange} />
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
    (
      <div class="flex flex-col justify-center justify-self-center items-center content-center">
        <div class="flex flex-col bg-pgreen rounded-xl border-black border-2">
          <p class="text-3xl lg:text-5xl text-center p-5 m-5">To view this page, you need an &hacks XI account.</p>
          <p class="text-3lx lg:text-5xl text-center p-5 m-5"><a class="underline text-blue-500" href="/authentication">Sign in to yours or create one here</a></p>
        </div>
      </div>
    )
  )
};

export default RegistrationForm;