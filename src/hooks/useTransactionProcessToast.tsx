import { useMemo } from 'react'
import { showToast } from 'utils/toastify'

export const useTransactionProcessToast = () => {
  const onUserRejectTxnToasted = (errorCode: string) => {
    if (errorCode === 'ACTION_REJECTED') return showToast('User reject transactions')
  }
  return useMemo(() => ({ onUserRejectTxnToasted }), [])
}
