import { useState } from 'react'

import Account from 'src/models/Account'
import createAccount from 'lib/createAccount'

import getUpdatedAccount from './getUpdatedAccount'

const initialAccountValue = createAccount()

const useAccount = (): [Account, () => Promise<void>, boolean] => {

  const [account, setAccount] = useState<Account>(initialAccountValue)
  const [loadingError, setLoadingError] = useState<boolean>(false);

  const refreshAccount = async () => {
    try {
      setAccount(await getUpdatedAccount(account))
      setLoadingError(false);
    } catch (error) {
      setLoadingError(true)
    }

  }


  return [account, refreshAccount, loadingError];
}

export default useAccount
