import React from 'react';
import './Rank';


const Rank = ({onButtonSubmit}) => {
  return (
    <div>
      <div className='white f3'>
      {'Darius, Your current rank is ...'}
      <p id="wording"></p>

      </div>
      <div className='white f1'>
        {'#1'}
      </div>
    </div>
  );
}

export default Rank;
