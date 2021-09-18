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

type AgendaItem = {
  calendar: Calendar
  event: Event
}

const compareByDateTime = (a: AgendaItem, b: AgendaItem) =>
  a.event.date.diff(b.event.date).valueOf()

/**
 * Agenda component
 * Displays greeting (depending on time of day)
 * and list of calendar events
 */

const GREETING_UPDATES_INTERVAL = 1000

const Agenda = (): ReactElement => {
  const {account, loadingError} = useContext(AccountContext)
  const [hour, setHour] = useState(DateTime.local().hour)

  const updateHour = () : void => {
    if(hour !== DateTime.local().hour ){
      setHour(DateTime.local().hour)
    }
  }

  useEffect(
    () => runEvery(GREETING_UPDATES_INTERVAL, updateHour),
    [updateHour],
  )

  const events: AgendaItem[] = useMemo(
    () =>
      account.calendars
        .flatMap((calendar) =>
          calendar.events.map((event) => ({ calendar, event })),
        )
        .sort(compareByDateTime),
    [account],
  )

  const title = useMemo(() => greeting(hour), [hour])

  return (
    <div className={style.outer}>
      <div className={style.container}>
        <div className={style.header}>
          <span className={style.title}>{title}</span>
        </div>
        {loadingError && <div>
          <span>An error occured fetching your latest data from the server</span> 
          <button>Click Here to try again</button>
          </div>}
        <List>
          {events.map(({ calendar, event }) => (
            <EventCell key={event.id} calendar={calendar} event={event} />
          ))}
        </List>
      </div>
    </div>
  )
}

export default Agenda
