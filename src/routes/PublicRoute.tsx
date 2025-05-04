import { ReactNode, useState, useEffect } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router";

interface PublicProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicProps): any {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSigned(true);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (signed) {
    return <Navigate to="/" />;
  }

  return children;
}
