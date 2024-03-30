import React from "react";
import {Waypoint} from "react-waypoint";

export default function ProgressBar(props){
    
        const {progress, skill, timeFrame} = props;
        const el = React.useRef(null);

        return (
            <div class="progress">
            <span class="skill">{skill} <i class="val">{progress} {timeFrame}</i></span>
            <div class="progress-bar-wrap">
                <div class="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={50} aria-valuemax={100} ref={el}> 
                <Waypoint
                    onEnter={() => {
                        switch(timeFrame){
                            case "Months" || "Month":
                                el.current.style.width = String((progress / 48.0) * 100) + "%";
                                break;
                            default:
                                el.current.style.width = String((progress / 4.0) * 100) + "%";
                                break;
                            }
                        }
                    }
                    onLeave={() => el.current.style.width = "0%"}
                />       
                </div>
            </div>
          </div>
        );  
    
}