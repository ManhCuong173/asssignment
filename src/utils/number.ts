
export function delineate(bnStr: string, decimalDigitTake?: number) {
    const parts = bnStr.split('.')
    if (decimalDigitTake && parts[1]) {
      parts[1] = parts[1].substr(0, decimalDigitTake)
    }
  
    const formatDecimal = parts[1] && Number(parts[1]) >= 0 && decimalDigitTake !== 0 ? `.${parts[1]}` : ''
  
    return parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + formatDecimal.replace(/(?:\.0*|(\.\d+?)0+)$/, '$1')
}

