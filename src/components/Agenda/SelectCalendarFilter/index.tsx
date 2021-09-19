import React, { ReactElement } from 'react'
import Calendar from 'src/models/Calendar';

interface Props {
    options?: Calendar[],
    value: string
    
  }

const SelectCalendarFilter = ({ options, value }: Props): ReactElement => {

    return (<select name="cars" id="cars" value={value}>
        {options.map( option => <option key={option.id} value={option.id}>{option.color}</option>)}
    </select>)

}

export default SelectCalendarFilter;