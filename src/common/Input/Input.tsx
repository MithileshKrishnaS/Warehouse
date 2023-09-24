import { useState } from "react";
import "./Input.css"
export function Input({value, data, type, size, width}:{value: any, data: any, type: any, size?: any, width?: any}) {

    const [valueData, setValue] = useState(value);

    return (
        <div>
            <input type="text" value={valueData} 
                style={{
                    fontSize : size+'px',
                    width : width+'px'
                }} 
                className={`${type === 'search' ? 'search' : ''}`}
                placeholder={type}
                onChange={(event)=>{
                    data({
                        type: type,
                        value: event.target.value
                    });
                    setValue(event.target.value);
                }}
            />
        </div>
    )
}