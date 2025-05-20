import Link from "next/link";
import { footerInfo } from "@/constants/footer";

export default function Socials() {
  return (
    <div
      className="bg-gray-300 shadow-lg rounded-2xl p-1 sm:p-2 flex justify-center space-x-2 sm:space-x-4 border border-gray-200 fixed bottom-3 left-1/2 -translate-x-1/2 z-50"
      style={{
        width: 'auto',
        maxWidth: '90vw',
        // Responsive scaling using clamp for smooth scaling
        transform: 'translateX(-50%) scale(' +
          'calc(' +
            'clamp(0.7, ' +
              'min(1, (100vw - 1rem) / 400), ' +
            '1' +
          ')' +
        ')',
      }}
    >
      {footerInfo.socials.map((social) => {
        const Icon = social.icon;
        return (
          <Link
            key={social.name}
            href={social.href}
            className="text-black hover:text-gray-800 transition-colors p-1 sm:p-2 rounded-lg hover:bg-gray-100 duration-200"
            target="_blank"
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="sr-only">{social.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
