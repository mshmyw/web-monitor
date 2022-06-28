import React from 'react';
import './App.css';
import {Line} from "./components/index";
import { Render } from "./components/index";
function App() {
    return (
        <div className="App">
            <div>
              <Render />
              {/* <Line /> */}
            </div>
        </div>
    );
}

export default App;