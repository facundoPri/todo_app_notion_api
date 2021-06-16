import { useFetch } from './useFetch';

export function useTasks(id) {
  const url = id ? `/api/tasks/{id}` : `/api/tasks`;
  const { data, error, mutate } = useFetch(url);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
