import React from "react";
import chuck from './images/chuck.jpg';
import './styles.css';

const App = () => {
  console.log(chuck);

  return (
    <div>
      <img src={chuck} />
        Helllllo !!!! My Friend
    </div>

  )
};
export default App;