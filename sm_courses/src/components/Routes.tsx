import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

function checkAuth(): boolean {
  const token = localStorage.getItem("authToken");
  return Boolean(token);
}

// Definindo as props de PrivateRoute
interface PrivateRouteProps {
  children: ReactNode;
  route: string; // Agora a rota é obrigatória para garantir o redirecionamento dinâmico
}

function PrivateRoute({ children, route }: PrivateRouteProps) {
  const isAuthenticated = checkAuth(); // Função que verifica a autenticação

  return isAuthenticated ? <>{children}</> : <Navigate to={route} replace />;
}

export default PrivateRoute;
