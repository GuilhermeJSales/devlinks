import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Social } from "../../components/Social";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinksProps {
  facebook: string;
  youtube: string;
  instagram: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
        let lista = [] as LinkProps[];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.data().id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          });
        });

        setLinks(lista);
      });
    }

    loadLinks();
  }, []);

  useEffect(() => {
    function socialLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
          });
        }
      });
    }

    socialLinks();
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center py-4">
      <h1 className="mt-20 text-3xl font-bold text-white md:text-4xl">
        Guilherme Jesus Sales - @dev.guijsales
      </h1>
      <span className="mt-3 mb-5 text-gray-50">Veja meus links 👇</span>

      <main className="flex w-11/12 max-w-xl flex-col text-center">
        {links.map((link) => (
          <section
            className="mb-4 w-full cursor-pointer rounded-lg bg-white py-2 shadow-sm shadow-zinc-900 transition-transform select-none hover:scale-105"
            style={{ backgroundColor: link.bg }}
            key={link.id}
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <p className="text-base md:text-lg" style={{ color: link.color }}>
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="my-4 flex justify-center gap-3">
            <Social url={socialLinks?.facebook}>
              <FaFacebook size={35} color="#FFF" />
            </Social>
            <Social url={socialLinks?.youtube}>
              <FaYoutube size={35} color="#FFF" />
            </Social>
            <Social url={socialLinks?.instagram}>
              <FaInstagram size={35} color="#FFF" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
