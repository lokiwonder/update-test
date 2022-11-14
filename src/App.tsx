import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

function App() {
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);

  const updateCheck = async () => {
    try {
      const { shouldUpdate, manifest } = await checkUpdate();
      setMessage('Access');
      setStatus(shouldUpdate);
      console.log(shouldUpdate);
      if (shouldUpdate) {
        // display dialog
        await installUpdate()
        // install complete, restart app
        await relaunch()
      }
    } catch (error: any) {
      setMessage(error);
      console.log(error)
    }
  }

  useEffect(() => {
    updateCheck();
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 style={{ color: 'red' }}>Version 0.1.1</h1>
        <h1>{status ? 'true' : 'false'}</h1>
        <h3>{message}</h3>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
