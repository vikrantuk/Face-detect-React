import React from 'react';

const FaceRecognition = ({image}) =>{
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img alt="" src={image} width='500px' height='auto'/>
            </div>
        </div>
    );
}

export default FaceRecognition;