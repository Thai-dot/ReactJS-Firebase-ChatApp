import React from "react";
import { imgSets } from "../img/imgIndex";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth, storage, db } from "../firebase";
import { useState } from "react";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
          }
        });
      });
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Thai Chat</span>
        <span className="title">Register</span>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="your name" />
          <input type="email" placeholder="mail" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={imgSets.addAvatar} alt="add Avatar" />
            Add an avatar
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong, please try again</span>}
        </form>
        <p>
          You do have an account ?<Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
