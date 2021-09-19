import React, { ReactElement, useContext, useEffect, useMemo, useState } from 'react'
import { DateTime } from 'luxon'

import greeting from 'lib/greeting'

import Calendar from 'src/models/Calendar'
import Event from 'src/models/Event'
import AccountContext from 'src/context/accountContext'

import List from './List'
import EventCell from './EventCell'

import style from './style.scss'
import runEvery from 'lib/runEvery'
import LoadingErrorMessage from './LoadingErrorMessage'
import SelectFilter from './SelectCalendarFilter'

type AgendaItem = {
  calendar: Calendar
  event: Event
}

const compareByDateTime = (a: AgendaItem, b: AgendaItem) =>
  a.event.date.diff(b.event.date).valueOf()


const groupByDepartment = (a: AgendaItem, b: AgendaItem) => {
  if (a.event.department === b.event.department) {
    return compareByDateTime(a, b)
  }

  if (!a.event.department && b.event.department) { //Handle the case of an event without a department
    return 1
  }

  return (a.event.department > b.event.department) ? 1 : -1
}
/**
 * Agenda component
 * Displays greeting (depending on time of day)
 * and list of calendar events
 */

const GREETING_UPDATES_INTERVAL = 1000

const Agenda = (): ReactElement => {
  const { account, loadingError } = useContext(AccountContext)
  const [hour, setHour] = useState(DateTime.local().hour)
  const [selectedCalendarID, setSelectedCalendarID] = useState<string>('')
  const [departmentGroupingEnabled, setDepartmentGroupingEnabled] = useState<boolean>(false)

  const filterByCalendar = (item: AgendaItem) => {
    if (!selectedCalendarID) return true;
    return item.calendar.id === selectedCalendarID
  }

  const updateHour = (): void => {
    if (hour !== DateTime.local().hour) {
      setHour(DateTime.local().hour)
    }
  }

  useEffect(
    () => runEvery(GREETING_UPDATES_INTERVAL, updateHour),
    [updateHour],
  )

  const events: AgendaItem[] = useMemo(
    () =>{
      let base = account.calendars
        .flatMap((calendar) =>
          calendar.events.map((event) => ({ calendar, event })),
        ).filter(filterByCalendar)
        .sort(compareByDateTime)
        
        if(departmentGroupingEnabled){
          base = base.sort(groupByDepartment)
        }
        return base;

    }
    ,
    [account, selectedCalendarID, departmentGroupingEnabled],
  )

  const title = useMemo(() => greeting(hour), [hour])

  const toggleGrouping = () => {
    setDepartmentGroupingEnabled(!departmentGroupingEnabled);
  }

  return (
    <div className={style.outer}>
      <div className={style.container}>
        <div className={style.header}>
          <span className={style.title}>{title}</span>
        </div>
        {loadingError && <LoadingErrorMessage />}
        <div className={style.options}>
          <button onClick={toggleGrouping}>{departmentGroupingEnabled ? "Group by Department" : "Disable Grouping"}</button>
          <SelectFilter options={account.calendars} value={selectedCalendarID && selectedCalendarID} setValue={setSelectedCalendarID} />
        </div>
        <List>
          {events.map(({ calendar, event }, index) => {
            const showDepartment = departmentGroupingEnabled && (index === 0 || (events[index - 1] && events[index - 1].event.department != events[index].event.department))
            return <EventCell showDepartment={showDepartment} key={event.id} calendar={calendar} event={event} />
          }
          )}
        </List>
      </div>
    </div>
  )
}

export default Agenda
