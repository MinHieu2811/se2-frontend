export const checkExpiryDate = (date: string) => {
  const currentDate = (new Date()).getTime()
  const expiryDate = (new Date(date)).getTime()

  return expiryDate < currentDate
}