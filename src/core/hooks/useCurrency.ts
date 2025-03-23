type CurrencyDisplay = 'symbol' | 'code' | 'name'

export const useCurrency = (
  currency: string = 'EUR',
  locale: string = 'es-ES',
  currencyDisplay: CurrencyDisplay = 'symbol'
) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay
  })

  return (value: number) => formatter.format(value)
}
