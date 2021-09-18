import { createContext } from 'react'

import AccountWithLoadingError from 'src/models/AccountWithLoadingError'

const AccountContext = createContext<AccountWithLoadingError | null>(null)

export default AccountContext
