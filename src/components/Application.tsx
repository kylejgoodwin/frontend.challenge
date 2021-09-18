import React, { ReactElement, useEffect } from 'react'

import runEvery from 'lib/runEvery'
import useAccount from 'lib/useAccount'
import AccountContext from 'src/context/accountContext'

import Agenda from './Agenda'

const REAL_TIME_UPDATES_INTERVAL = 10000

const Application = (): ReactElement => {
  const [account, refreshAccount, refreshError] = useAccount()

  useEffect(
    () => runEvery(REAL_TIME_UPDATES_INTERVAL, refreshAccount),
    [refreshAccount],
  )

  return (
    <AccountContext.Provider value={{ account: account, loadingError: refreshError }}>
      <Agenda />
    </AccountContext.Provider>
  )
}

export default Application
