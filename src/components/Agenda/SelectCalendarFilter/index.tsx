import React, { ReactElement } from 'react'
import Calendar from 'src/models/Calendar';

interface Props {
    options?: Calendar[],
    value: string,
    setValue: (val: string) => void;
        
    }
    

const SelectCalendarFilter = ({ options, value, setValue }: Props): ReactElement => {

    const handleChange = (event : React.ChangeEvent<HTMLSelectElement>) : void => {
        setValue(event.target.value);
    }

    return (<select name="cars" id="cars" value={value} onChange={handleChange} >
        <option key='default-option' value=''>{value ? "Clear Selection" : "Select a Calendar"}</option>
        {options.map( option => <option key={option.id} value={option.id}>{option.color}</option>)}
    </select>)

}

export default SelectCalendarFilter;