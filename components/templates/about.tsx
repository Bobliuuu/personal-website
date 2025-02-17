import Image from 'next/image';
import { about } from '../../constants/constants';

export default function About() {
    return (
      <section className="m-horizontal relative mb-16 text-center 3xs:mb-20 2xs:mb-24 xs:mb-32 sm:mb-38 md:mb-44 2xl:mb-48 3xl:mb-64">
        <h1 className="text-5xl text-center pt-10 pb-8 font-bold"> About </h1>
        <div className="mx-auto mb-7 w-30 3xs:mb-9 2xs:mb-10 2xs:w-40 xs:mb-12 sm:w-44 lg:mb-16">
          <Image src="/jerry.png" alt="Jerry Zhu Image" width={300} height={300}/>
        </div>
        <div className="mx-auto mb-12 flex max-w-[680px] flex-col gap-5 text-left 2xs:mb-20 md:mb-24 xl:mb-32 xl:gap-8">
          {about.map((item) => (
            <p className="text-base text-black dark:text-lightPurple md:text-xl">
              {item}
            </p>
          ))}
        </div>
      </section>
    );
  }