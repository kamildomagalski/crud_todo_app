import useAuth from "../auth/useAuth";
import { APIRefreshToken } from "../api/apiQueries";

const useRefreshToken = (refreshToken) => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const newToken = await APIRefreshToken(refreshToken);
    setAuth((prev) => {
      console.log(prev);
      console.log(newToken);
      return { ...prev, token: newToken };
    });
    return newToken;
  };
  return refresh;
};

export default useRefreshToken;
