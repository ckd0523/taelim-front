import { useEffect } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext({});

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

const authSessionKey = 'accessToken';

export function AuthProvider({ children }) {


  // 초기 상태를 localStorage에서 바로 가져오도록 수정
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem(authSessionKey);
      if (storedUser && storedToken) {
        return { ...JSON.parse(storedUser), accessToken: storedToken };
      }
      return undefined;
    } catch (error) {
      console.error('Error loading initial auth state:', error);
      return undefined;
    }
  });

  const saveSession = useCallback(
    (userData) => {

      console.log("컨텍스트 1 : " + JSON.stringify(userData));
      const { email, name, role, accessToken } = userData;  // 사용자 데이터에서 필요한 정보 추출
      const userSession = { email, name, role };

      console.log("컨텍스트 2 : " + email);

      localStorage.setItem('user', JSON.stringify(userSession));  // 사용자 정보를 로컬 스토리지에 저장
      localStorage.setItem(authSessionKey, accessToken);  // 액세스 토큰을 로컬 스토리지에 저장

      setUser({ ...userSession, accessToken });  // 상태 업데이트 시 accessToken도 포함
    },
    []
  );

  const removeSession = useCallback(() => {
    localStorage.removeItem('user');  // 'user' 정보를 로컬 스토리지에서 제거
    localStorage.removeItem(authSessionKey);  // 'accessToken'을 로컬 스토리지에서 제거
    setUser(undefined);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        saveSession,
        removeSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
