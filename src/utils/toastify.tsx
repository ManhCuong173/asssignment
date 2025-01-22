import React from 'react'
import { Bounce, toast, ToastContainerProps, ToastOptions } from 'react-toastify'

type ToastCustomOptions = ToastOptions & {}

export const showWarningToast = (content: React.ReactNode | string, options?: ToastCustomOptions) => {
  return toast.warn(content, {
    ...options,
    toastId: 'show-warning-toast',
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Bounce,
  })
}
export const showSuccessToast = (content: React.ReactNode | string, options?: ToastCustomOptions) => {
  return toast.success(content, {
    ...options,
    toastId: 'show-success-toast',
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Bounce,
  })
}

export const TOAST_CONFIG = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
} as ToastContainerProps
