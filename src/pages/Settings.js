import { React, useEffect, useState } from 'react'
//import ToggleSwitch from '../components/ToggleSwitch';
import styles from '../styles/Settings.module.css';
import { useAuth } from "../components/AuthContext .js";
import { getAuth, updateProfile } from "firebase/auth";

function Settings() {
  const auth = getAuth();
  const { signUserOut } = useAuth();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [darkmode, setDarkMode] = useState(false);
  const [soundeffects, setSoundEffects] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNameChangeSubmit = async (event) => {
    event.preventDefault();
    const user = auth.currentUser;

    if (user) {
      try {
        await updateProfile(user, { displayName: name });
        console.log('Name Changed');
        user.providerData.forEach((profile) => {
          console.log("Changed Name: " + profile.displayName);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleUserNameChangeSubmit = (event) => {
    event.preventDefault();
    // Add logic to update the username
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailChangeSubmit = (event) => {
    event.preventDefault();
    // Add logic to update the email
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const handleSoundEffectsToggle = () => {
    setSoundEffects((prevSoundEffects) => !prevSoundEffects);
  };

  const handleNotificationsToggle = () => {
    setNotifications((prevNotifications) => !prevNotifications);
  };

  const handleSignOut = () => {
    signUserOut();
    console.log('Signed Out');
    window.location.reload();
  };

  return (
    <div>
      <div>
        <h1>Settings</h1>
        <p>Edit settings for your account and more!</p>
      </div>

      <div className={styles.container}>
        <div className="grid-container">
          <p className='grid-item'>Name</p>
          <input className='grid-item' name="Name" value={name} onChange={handleNameChange} />
          <button className="settings-button" onClick={handleNameChangeSubmit}>Change</button>
          {/* <p className='grid-item'>Username</p>
          <input className='grid-item' name="Username" value={username} onChange={handleUsernameChange} />
          <button className="settings-button" onClick={handleUserNameChangeSubmit}>Change</button>
          <p className='grid-item'>Email</p>
          <input className='grid-item' name="Email" value={email} onChange={handleEmailChange} />
          <button className="settings-button" onClick={handleEmailChangeSubmit}>Change</button> */}
        </div>
        <hr />
        <button type="button" onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default Settings;