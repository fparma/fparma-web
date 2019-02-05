type IClassArgs = undefined | string | { [key: string]: boolean | undefined }

export const classnames = (...args: IClassArgs[]) =>
  args
    .filter(Boolean)
    .map((val: string | { [key: string]: boolean }) => {
      if (typeof val === 'string') return val
      return Object.keys(val)
        .map(key => (val[key] ? key : ''))
        .join(' ')
    })
    .join(' ')
    .replace(/  +/g, ' ')
    .trim()
