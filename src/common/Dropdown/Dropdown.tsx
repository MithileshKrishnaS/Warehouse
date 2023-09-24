import { useState } from "react";
import './Dropdown.css'

export function Dropdown({option, selected, sendOutput, type, size }:{option: any, selected: any, sendOutput: any, type: any, size?:any}) {
    
    const [select, setSelected] = useState(selected);

    return(
        <div className="dropdown">
            <select value={select} className="select" 
                style={{fontSize: size+'px'}}
                onChange={(event)=> {
                    sendOutput(
                        {
                            value: event.target.value,
                            type: type
                        });
                    setSelected(event.target.value);
                }
            }
            >
                {option.map((each: any) => (<option key={each}>{each}</option>))}
            </select>
        </div>
    )
}