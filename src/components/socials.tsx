import Link from "next/link";
import { footerInfo } from "@/constants/footer";

export default function Socials() {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-2xl p-3 flex space-x-4 border border-gray-200">
      {footerInfo.socials.map((social) => {
        const Icon = social.icon;
        return (
          <Link
            key={social.name}
            href={social.href}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-100 duration-200"
            target="_blank"
          >
            <Icon className="h-6 w-6" />
            <span className="sr-only">{social.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
