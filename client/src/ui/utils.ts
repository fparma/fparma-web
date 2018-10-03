type IClassArgs = undefined | string | { [key: string]: boolean | undefined }

export const printClass = (...args: IClassArgs[]) => {
  return (
    args
      .map(v => {
        if (!v) return ''
        const key = Object.getOwnPropertyNames(v)[0]
        return typeof v === 'string' ? v.trim() : v[key] ? key.trim() : ''
      })
      .join(' ') || ''
  )
}
