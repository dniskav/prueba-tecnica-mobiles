import { useEffect, useState } from 'react'
import { SearchBoxApi } from '../../components'
import { Grid } from '../../components/Grid/Grid'
import { useProductContext } from '../../stores/productContext'

export function List() {
  const [filter, setFilter] = useState<string | undefined>()
  const { state, getProducts } = useProductContext()
  const { items } = state

  useEffect(() => {
    getProducts(filter)
  }, [filter])

  const setQuery = (query: string) => {
    setFilter(query)
  }
  return (
    <>
      <SearchBoxApi quantity={filter ? items.length : 0} result={(p: string) => setQuery(p)} />

      <Grid items={items} />
    </>
  )
}
