import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";

export default function TabIndex() {
  const { authState } = useAuth();
  console.log("Index loaded token", authState?.token);

  if (!authState?.authenticated) {
    return <Redirect href="/auth/login" />;
  }

  console.log(authState.role);

  const getRedirectPath = () => {
    switch (authState?.role) {
      case "USER":
        return "/rooms";
      case "ADMIN":
        return "/admin";
      default:
        return "/auth/login";
    }
  };

  return <Redirect href={getRedirectPath()} />;
}
