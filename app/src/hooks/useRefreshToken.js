import useAuth from "../auth/useAuth";
import { APIRefreshToken } from "../api/apiQueries";

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();

  const refresh = async () => {
    const newToken = await APIRefreshToken(auth.refreshToken);
    setAuth((prev) => {
      return { ...prev, token: newToken };
    });
    return newToken;
  };
  return refresh;
};

export default useRefreshToken;
