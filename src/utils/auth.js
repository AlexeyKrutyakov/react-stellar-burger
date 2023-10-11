// import from modules
import { useSelector } from "react-redux";
// import services
import { login } from "../services/profileSlice";


export function useProvideAuth_111() {
  const user = useSelector(state => state.profile.user);

  const signIn = cb => {
    return login
  }
}