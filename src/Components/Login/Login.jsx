import { useState } from "react";
import app from "../../Firebase/firebase.config";
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setUser(loggedUser)
            })
            .catch(error => {
                console.log('error', error.message);
            })
    }
    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const loggedUser = result.user;
                setUser(loggedUser)
                console.log(loggedUser);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null)
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div>
            {
                user ? <button onClick={handleSignOut}>Sign Out</button> : <div>
                    <button onClick={handleGoogleSignIn}>Sign In</button>
                    <button onClick={handleGithubSignIn}>Github Sign In</button>
                </div>
            }
            {
                user && <div>
                    <h2>{user.displayName}</h2>
                    <p>{user.email}</p>
                    <img src={user.photoURL} alt="" />
                </div>

            }
        </div>
    );
};

export default Login;