import { React, useEffect, useState } from 'react'
import '../styles/ToggleButton.css'
import ToggleSwitch from '../components/ToggleSwitch';

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
        {/* make the below work with the usestate! */}
        <ToggleSwitch label="Dark Mode" />
        <ToggleSwitch label="Sound Effects" />
        <ToggleSwitch label="Notifications" />


      </div>

    </div>
  )
}

export default Settings