import Head from "next/head";
import SignaturePad from "../components/SignaturePad";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Signature App</title>
        <meta
          name="description"
          content="A simple signature app using Next.js and TypeScript"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center h-screen">
        <SignaturePad />
      </main>
    </div>
  );
};

export default Home;
