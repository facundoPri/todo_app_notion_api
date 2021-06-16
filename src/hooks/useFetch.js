import useSWR from 'swr';
import axios from 'axios';

export function useFetch(url) {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error, mutate } = useSWR(url, fetcher);

  return { data, error, mutate };
}
