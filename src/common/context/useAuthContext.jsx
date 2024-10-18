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
  const [user, setUser] = useState(
    localStorage.getItem(authSessionKey)
      ? JSON.stringify(localStorage.getItem(authSessionKey) || '{}')
      : undefined
  );

  const saveSession = useCallback(
    (userData) => {
      const { email, name, role } = userData; // 필요한 정보 추출
      const subRole = role.slice(1, -1);
      const userSession = { email, name, subRole }; // 이메일, 이름, 권한만 저장할 객체

      //console.log("유저 정보0 : " + JSON.stringify(user));
      //console.log("유저 정보1 : " + email);
      //console.log("유저 정보2 : " + name);
      //console.log("유저 정보3 : " + subRole);
      setUser(userSession); // setUser로 상태 업데이트
    },
    [setUser]
  );

  const removeSession = useCallback(() => {
    localStorage.removeItem(authSessionKey);
    setUser(undefined);
  }, [setUser]);

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
