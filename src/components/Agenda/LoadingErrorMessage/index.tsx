import React, { ReactElement } from 'react'
import style from './style.scss'


const LoadingErrorMessage = (): ReactElement => {

    return (
        <div className={style.card}>
            <span>An unexpected error prevented your events from being refreshed</span>
        </div>
  )
}

export default LoadingErrorMessage



