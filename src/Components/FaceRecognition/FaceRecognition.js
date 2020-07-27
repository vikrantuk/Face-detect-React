import React from 'react';
import './FaceRecognition.css';
import data from './calculate';
const FaceRecognition = ({box,image}) =>{
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" alt="" src={image} style={{maxWidth:'70vw', width:'100%', height:'auto'}}/>
                
                <div>{ box.length ?
                    box.map((element,i) => {
                        let res = data(element.region_info);
                        return <div className="bounding-box" key={i} style={{top: res.topRow, right: res.rightCol, bottom: res.bottomRow, left: res.leftCol}}></div>
                    })
                    : " "
                }
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;