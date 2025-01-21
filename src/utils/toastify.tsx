import React from 'react'
import { toast, ToastOptions } from 'react-toastify'

type ToastCustomOptions = ToastOptions & {}

export const showToast = (content: React.ReactNode, options?: ToastCustomOptions) => {
  return toast(content, options)
}
