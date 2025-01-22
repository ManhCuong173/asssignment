import { useMemo } from 'react'
import { showWarningToast } from 'utils/toastify'

export const useTransactionProcessToast = () => {
  const onUserRejectTxnToasted = (errorCode: string) => {
    if (errorCode === 'ACTION_REJECTED') return showWarningToast('User reject transactions')
  }
  return useMemo(() => ({ onUserRejectTxnToasted }), [onUserRejectTxnToasted, showWarningToast])
}
