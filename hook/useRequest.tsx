import { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

export default function useRequest(endpoint: string, query: { [x: string]: any }) {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | any>(null)

  const option: AxiosRequestConfig = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'x-rapidapi-key': '5acf8c951emsh291c60337927cfep174cf8jsn8c0730632012',
      'x-rapidapi-host': 'jsearch.p.rapidapi.com',
    },
    params: { ...query },
  }

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const { data: res } = await axios.request(option)
      setData(res.data)
    } catch (error) {
      setError(error)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => fetchData()

  return { data, isLoading, error, refetch }
}
