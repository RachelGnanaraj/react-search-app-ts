import React from 'react';
import Home from './pages/Home';
import '@govtechsg/sgds-masthead/dist/sgds-masthead/sgds-masthead.css';
import { SgdsMasthead } from '@govtechsg/sgds-masthead-react';


const App = () => {
  return (
    <div>
      <SgdsMasthead placeholder={''} onPointerEnterCapture={''} onPointerLeaveCapture={''}></SgdsMasthead>
      <Home />
    </div>
  );
};

export default App;
