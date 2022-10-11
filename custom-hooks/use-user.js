import useSWR from "swr";

import { fetchUserProfile } from "../services/user-api";

export default function useUser() {
  const { data, mutate, error } = useSWR("api_user", fetchUserProfile, {revalidateOnFocus: false});

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data || null,
    mutate,
  };
}
