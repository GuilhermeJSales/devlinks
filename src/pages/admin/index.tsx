import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");
  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinkProps[];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      setLinks(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (!nameInput || !urlInput) {
      alert("Preencha todos os campos");
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        console.log("cadastrado com sucesso");
        setNameInput("");
        setUrlInput("");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar no banco" + error);
      });
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-2 pb-7">
      <Header />

      <form
        onSubmit={handleRegister}
        className="mt-8 mb-3 flex w-full max-w-xl flex-col"
      >
        <label htmlFor="" className="mt-2 mb-2 font-medium text-white">
          Nome do Link
        </label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={({ target }) => setNameInput(target.value)}
        />

        <label htmlFor="" className="mt-2 mb-2 font-medium text-white">
          URL do link
        </label>
        <Input
          type="url"
          placeholder="Digite a URL do link..."
          value={urlInput}
          onChange={({ target }) => setUrlInput(target.value)}
        />

        <section className="my-4 flex gap-5">
          <div>
            <label htmlFor="" className="mt-2 mb-2 font-medium text-white">
              Cor do link
            </label>
            <input
              type="color"
              value={textColorInput}
              onChange={({ target }) => setTextColorInput(target.value)}
            />
          </div>

          <div>
            <label htmlFor="" className="mt-2 mb-2 font-medium text-white">
              Fundo do link
            </label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={({ target }) => setBackgroundColorInput(target.value)}
            />
          </div>
        </section>

        {nameInput && (
          <div className="mb-7 flex flex-col items-center justify-center rounded-md border border-gray-100/25 p-1">
            <label htmlFor="" className="mt-2 mb-3 font-medium text-white">
              Veja como está ficando:
            </label>
            <article
              className="flex w-11/12 max-w-lg flex-col items-center justify-between rounded bg-zinc-900 px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="mb-7 flex h-9 items-center justify-center gap-4 rounded-md bg-blue-600 font-medium text-white"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="mb-4 text-2xl font-bold text-white">Meus Links</h2>
      {links.map((link) => (
        <article
          key={link.id}
          className="mb-2 flex w-11/12 max-w-xl items-center justify-between rounded px-2 py-3 select-none"
          style={{ backgroundColor: link.bg, color: link.color }}
        >
          <p>{link.name}</p>
          <div>
            <button
              onClick={() => handleDeleteLink(link.id)}
              className="cursor-pointer rounded border border-dashed p-1"
            >
              <FiTrash size={18} color="#fff" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
