import { Time } from "config/types/time"

export function timeSince(time: number): [number, Time] {
    const seconds = Math.floor((new Date().getTime() - time) / 1000)
    let interval = seconds / 31536000
  
    if (interval > 1) {
      return [Math.floor(interval), Time.YEAR]
    }
    interval = seconds / 2592000
    if (interval > 1) {
      return [Math.floor(interval), Time.MONTH]
    }
    interval = seconds / 86400
    if (interval > 1) {
      return [Math.floor(interval), Time.DAY]
    }
    interval = seconds / 3600
    if (interval > 1) {
      return [Math.floor(interval), Time.HOUR]
    }
    interval = seconds / 60
    if (interval > 1) {
      return [Math.floor(interval), Time.MIN]
    }
    return [Math.floor(interval * 60), Time.SEC]
  }