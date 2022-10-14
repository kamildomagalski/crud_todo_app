import useAuth from "../auth/useAuth";
import { APIRefreshToken } from "../api/apiQueries";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const data = await APIRefreshToken();
    setAuth((prev) => {
      return { ...prev, token: data.newAccessToken, user: data.login };
    });
    return data.newAccessToken;
  };
  return refresh;
};

export default useRefreshToken;
