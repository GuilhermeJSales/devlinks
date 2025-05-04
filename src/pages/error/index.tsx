import { Link } from "react-router";

export function ErrorPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center text-white">
      <h1 className="mb-2 text-6xl font-bold">404</h1>
      <h1 className="mb-4 text-4xl font-bold">Página não encontrada</h1>
      <p className="text-1xl mb-4 italic">
        Você caiu em uma página que não existe!
      </p>
      <Link className="rounded-md bg-gray-50/20 px-4 py-1" to="/">
        Voltar para home
      </Link>
    </div>
  );
}
