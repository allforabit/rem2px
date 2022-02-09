// /(?<val>\d+\.\d+)rem/gi
export const convert = (str: string, basePx: number = 16) => {
  return str.replace(/(d*\.?\d+)rem/gi, (str, p1, offset, s) => {
    return `${str} (${p1 * basePx}px)`
  })
}
