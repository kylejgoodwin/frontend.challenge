import React, { ReactElement, useMemo, useEffect, useState } from 'react'

import style from './style.scss'

import { DateTime } from 'luxon'

import greeting from 'lib/greeting'

import runEvery from 'lib/runEvery'

/**
 * Greeting that automatically changes throughout the day
 */
const GREETING_UPDATES_INTERVAL = 1000

const Greeting = (): ReactElement => {
    
    const [hour, setHour] = useState(DateTime.local().hour)
    const title = useMemo(() => greeting(hour), [hour])
    const updateHour = (): void => {
        if (hour !== DateTime.local().hour) {
            setHour(DateTime.local().hour)
        }
    }

    useEffect(
        () => runEvery(GREETING_UPDATES_INTERVAL, updateHour),
        [updateHour],
    )

    return (<div className={style.header}>
        <span className={style.title}>{title}</span>
    </div>)
}

export default Greeting