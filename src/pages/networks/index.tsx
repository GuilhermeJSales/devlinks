import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";

export function Networks() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef)
        .then((snapshot) => {
          if (snapshot.data() !== undefined) {
            setFacebook(snapshot.data()?.facebook);
            setInstagram(snapshot.data()?.instagram);
            setYoutube(snapshot.data()?.youtube);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    loadLinks();
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
      facebook,
      instagram,
      youtube,
    })
      .then(() => {})
      .catch((error) => {
        console.log("Erro ao salvar" + error);
      });
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-2 pb-7">
      <Header />
      <h1 className="mt-8 mb-4 text-2xl font-medium text-white">
        Minhas redes sociais
      </h1>

      <form className="flex w-full max-w-xl flex-col" onSubmit={handleRegister}>
        <label className="mt-2 mb-2 font-medium text-white" htmlFor="">
          Link do facebook
        </label>
        <Input
          placeholder="Digite a URL do Facebook..."
          type="url"
          value={facebook}
          onChange={({ target }) => setFacebook(target.value)}
        />

        <label className="mt-2 mb-2 font-medium text-white" htmlFor="">
          Link do instagram
        </label>
        <Input
          placeholder="Digite a URL do instagram..."
          type="url"
          value={instagram}
          onChange={({ target }) => setInstagram(target.value)}
        />

        <label className="mt-2 mb-2 font-medium text-white" htmlFor="">
          Link do youtube
        </label>
        <Input
          placeholder="Digite a URL do youtube..."
          type="url"
          value={youtube}
          onChange={({ target }) => setYoutube(target.value)}
        />

        <button
          type="submit"
          className="mb-7 flex h-9 items-center justify-center rounded-md bg-blue-600 font-medium text-white"
        >
          Salvar links
        </button>
      </form>
    </div>
  );
}
