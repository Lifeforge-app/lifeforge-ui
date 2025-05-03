import { cookieParse } from 'pocketbase'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { type Loadable } from '@interfaces/common'

import { useLifeforgeUIContext } from '../providers/LifeforgeUIProvider'

function useFetch<T>(
  endpoint: string,
  criteriaMet: boolean = true,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body: Record<string, unknown> = {},
  changeStateWhenLoading: boolean = true,
  showError: boolean = true
): [
  data: Loadable<T>,
  refresh: () => void,
  setData: React.Dispatch<React.SetStateAction<Loadable<T>>>
] {
  const { apiHost } = useLifeforgeUIContext()
  const [data, setData] = useState<Loadable<T>>('loading')

  function fetchData(): void {
    if (changeStateWhenLoading) {
      setData('loading')
    }
    fetch(`${apiHost}/${endpoint}`, {
      method,
      body: method === 'POST' ? JSON.stringify(body) : undefined,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookieParse(document.cookie).session}`
      }
    })
      .then(async res => {
        try {
          const data = await res.json()
          if (!res.ok || data.state !== 'success') {
            throw new Error(JSON.stringify(data.message))
          }
          setData(data.data)
        } catch (err) {
          throw new Error(err as string)
        }
      })
      .catch(err => {
        setData('error')
        if (showError) {
          toast.error('fetch.fetchError' + ' ' + err)
        }
        console.error(err)
      })
  }

  useEffect(() => {
    if (criteriaMet) {
      fetchData()
    }
  }, [endpoint, criteriaMet])

  return [data, fetchData, setData]
}

export default useFetch
