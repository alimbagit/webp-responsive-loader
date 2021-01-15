import React from "react";
import chuckImg from './images/chuck.jpg';
import './styles.css';

const App = () => {
  console.log(chuckImg);
  
  return (
    <div>
      {/* <img srcSet={chuckImg.srcset} sizes={chuckImg.sizes}/> */}
      <img srcSet={chuckImg.srcset} placeholder={chuckImg.placeholder}/>

        Helllllo !!!! My Friend
    </div>

  )
};
export default App;