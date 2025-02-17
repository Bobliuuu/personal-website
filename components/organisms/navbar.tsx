import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { ROUTES, STYLES } from '@/constants/navbar';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-[#f5f5f5] z-50 shadow-md">
      <div className="flex items-center text-gray-900 font-bold">
        <Link href="/">
          <div className="mr-2 p-1 rounded-full flex items-center gap-5">
            <Image src="/jerry.png" alt="Logo" width={30} height={30} className="ml-8 mr-4 logo rounded-full" />
            <span className="text-xl">Jerry Zhu</span>
          </div>
        </Link>
      </div>
      <div className="flex gap-12 mr-8">
        {ROUTES.map((route, idx) => (
          route.text === 'Resume' ? (
            <a
              href={route.href}
              target="_blank"
              rel="noreferrer noopener"
              className={STYLES.textStyle}
              key={`route-${idx}`}
            >
              {route.text}
            </a>
          ) : (
            <Link href={route.href} key={`route-${idx}`} className={STYLES.textStyle}>
              {route.text}
            </Link>
          )
        ))}
        <BsFillSunFill
          className="cursor-pointer"
          size={20}
        />
      </div>
    </nav>
  );
}