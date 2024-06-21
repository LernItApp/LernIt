import { React, useEffect, useState } from 'react'
//import ToggleSwitch from '../components/ToggleSwitch';
import styles from '../styles/Settings.module.css';
import { useAuth } from "../components/AuthContext .js";

function Settings() {
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

  const handleNameChangeSubmit = (event) => {

  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleUserNameChangeSubmit = (event) => {
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailChangeSubmit = (event) => {
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
    // Add your sign-out logic here
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

      <div className={`${styles.container}`}>
        <div className={`grid-container`}>
          <p className='grid-item'>Name</p>
          <input className='grid-item' name="Name" value={name} onChange={handleNameChange} />
          <button className="settings-button" onClick={handleNameChangeSubmit}>Change</button>
          <p className='grid-item'>Username</p>
          <input className='grid-item' name="Username" value={username} onChange={handleUsernameChange} />
          <button className="settings-button" onClick={handleUserNameChangeSubmit}>Change</button>
          <p className='grid-item'>Email</p>
          <input className='grid-item' name="Email" value={email} onChange={handleEmailChange} />
          <button className="settings-button" onClick={handleEmailChangeSubmit}>Change</button>
        </div>
        <hr />
        {/* <div className={`${styles.inputcontainer}`}>
          <label> Dark Mode <input name="DarkMode" type="checkbox" checked={darkmode} onChange={handleDarkModeToggle} /> </label>
          <label> Sound Effects <input name="SoundEffects" type="checkbox" checked={soundeffects} onChange={handleSoundEffectsToggle} /> </label>
          <label> Notifications <input name="Notifications" type="checkbox" checked={notifications} onChange={handleNotificationsToggle} /> </label>
        </div>
        <hr /> */}
        <button type="button" onClick={handleSignOut}> Sign Out </button>






        {/* make the below work with the usestate! */}
        {/* <ToggleSwitch label="Dark Mode" isChecked={darkmode} onChange={handleDarkModeToggle} />
        <ToggleSwitch label="Sound Effects" isChecked={soundeffects} onChange={handleSoundEffectsToggle} />
        <ToggleSwitch label="Notifications" isChecked={notifications} onChange={handleNotificationsToggle} />
  */}
      </div>

    </div>
  )
}

export default Settings