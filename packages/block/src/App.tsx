import React from 'react';
import './App.css';
import {Line} from "./components/index";
import { Doom } from "./components/index";
function App() {
    return (
        <div className="App">
            <div>
              <Doom />
              <Line />
            </div>
        </div>
    );
}

export default App;