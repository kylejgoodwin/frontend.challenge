import React, { ReactElement } from 'react'
import Calendar from 'src/models/Calendar'

import style from './style.scss'

interface Props {
    options?: Calendar[],
    value: string,
    setValue: (val: string) => void
}

const SelectCalendarFilter = ({ options, value, setValue }: Props): ReactElement => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setValue(event.target.value);
    }

    return (
    <select className={style.select} name="calendar" id="calendar" value={value} onChange={handleChange} >
        <option key='default-option' value=''>{value ? "Clear Selection" : "Select a Calendar"}</option>
        {options.map(option => <option style={{color: option.color }} key={option.id} value={option.id}>{option.color}</option>)}
    </select>)

}

export default SelectCalendarFilter;