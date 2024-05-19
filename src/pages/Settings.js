import { React, useEffect, useState } from 'react'
//import ToggleSwitch from '../components/ToggleSwitch';

function Settings() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [darkmode, setDarkMode] = useState(false);
  const [soundeffects, setSoundEffects] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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
  
  return (
    <div>
      <div>
        <h1>Settings</h1>
        <p>Edit settings for your account and more!</p>
      </div>

      <div>
        <label> Name <input name="Name" value={name} onChange={handleNameChange} /> </label>
        <label> Username <input name="Username" value={username} onChange={handleUsernameChange} /> </label>
        <label> Email <input name="Email" value={email} onChange={handleEmailChange} /> </label>
        <hr />
        <label> Dark Mode <input name="DarkMode" type="checkbox" checked={darkmode} onChange={handleDarkModeToggle} /> </label>
        <label> Sound Effects <input name="SoundEffects" type="checkbox" checked={soundeffects} onChange={handleSoundEffectsToggle} /> </label>
        <label> Notifications <input name="Notifications" type="checkbox" checked={notifications} onChange={handleNotificationsToggle} /> </label>






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