import Link from "next/link";
import type { NextPage } from "next";
import Contact from "../../components/page/Contact/Contact";

const Kontakt: NextPage = () => {
  return (
    <div>
      <Contact />
      <Link href="/">Home</Link>
    </div>
  );
};

export default Kontakt;
