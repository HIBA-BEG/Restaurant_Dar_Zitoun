export const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const phoneRe = /^\+?[0-9 ().-]{8,18}$/

export const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export const formatDate = (iso: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
