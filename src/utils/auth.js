import { useSelector } from "react-redux";

import { login } from "../services/profileSlice";

export function useProvideAuth() {
  const user = useSelector(state => state.profile.user);

  const signIn = cb => {
    return login
  }
}