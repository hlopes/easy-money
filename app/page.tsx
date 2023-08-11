import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <p className={`${inter.className} text-sm`}>Easy Money</p>
    </main>
  );
}
