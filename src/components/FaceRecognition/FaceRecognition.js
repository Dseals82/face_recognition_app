import React from 'react';
import './FaceRecognition'

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className='center ma'>
    <div className='absolute mt2'>
      <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto' />
    </div>
    </div>
  );
}






export default FaceRecognition;
