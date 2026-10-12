const Svg = ({ children, size = 24, ...rest }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...rest}>
    {children}
  </svg>
)

export const PlayIcon = (p) => <Svg {...p}><path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14z" /></Svg>
export const PauseIcon = (p) => <Svg {...p}><rect x="6" y="5" width="4" height="14" rx="1.2" /><rect x="14" y="5" width="4" height="14" rx="1.2" /></Svg>
export const PrevIcon = (p) => <Svg {...p}><path d="M6 6h2v12H6zM9.5 12l8.5 6V6z" /></Svg>
export const NextIcon = (p) => <Svg {...p}><path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z" /></Svg>
export const MusicIcon = (p) => <Svg {...p}><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" /></Svg>
export const CloseIcon = (p) => <Svg {...p}><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></Svg>
export const ShuffleIcon = (p) => <Svg {...p}><path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" /></Svg>
export const RepeatIcon = (p) => <Svg {...p}><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" /></Svg>
export const VolumeIcon = (p) => <Svg {...p}><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06A9 9 0 0 0 14 3.23z" /></Svg>
export const MuteIcon = (p) => <Svg {...p}><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A7 7 0 0 1 14 18.7v2.06a9 9 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" /></Svg>
