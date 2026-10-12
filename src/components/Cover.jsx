import { useEffect, useState } from 'react'

// <img> that walks through a list of mirror URLs until one loads.
export default function Cover({ srcs = [], alt = '', ...rest }) {
  const [i, setI] = useState(0)
  useEffect(() => setI(0), [srcs[0]]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!srcs.length) return null
  return (
    <img
      src={srcs[i]}
      alt={alt}
      onError={() => i < srcs.length - 1 && setI(i + 1)}
      {...rest}
    />
  )
}
