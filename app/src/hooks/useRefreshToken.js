import useAuth from "../auth/useAuth";
import { APIRefreshToken } from "../api/apiQueries";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const newAccessToken = await APIRefreshToken();
    setAuth((prev) => {
      return { ...prev, token: newAccessToken };
    });
    return newAccessToken;
  };
  return refresh;
};

export default useRefreshToken;
