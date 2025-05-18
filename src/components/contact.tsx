"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <section id="contact" className="w-full min-h-[60vh] flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left: Heading and Description */}
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl md:text-6xl font-extrabold font-inter text-white leading-tight animate-glow">
            Contact me
          </h1>
          <p className="text-lg md:text-xl font-inter text-gray-300 max-w-xl">
            Have a question, new opportunity, or just want to have a quick chat? Feel free to send me a message.
          </p>
        </div>
        {/* Right: Form */}
        <form className="flex flex-col gap-6 w-full max-w-md mx-auto">
          <Input
            placeholder="Name"
            className="bg-black/60 border border-gray-500/40 rounded-lg px-5 py-3 text-white font-inter text-base focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 shadow-md transition-all duration-200"
          />
          <Input
            type="email"
            placeholder="Email"
            className="bg-black/60 border border-gray-500/40 rounded-lg px-5 py-3 text-white font-inter text-base focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 shadow-md transition-all duration-200"
          />
          <Textarea
            placeholder="Message"
            className="bg-black/60 border border-gray-500/40 rounded-lg px-5 py-3 text-white font-inter text-base min-h-[140px] focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 shadow-md transition-all duration-200"
          />
          <Button
            variant="ghost"
            className="self-start border border-white text-gray-300 hover:text-white hover:bg-gray-800/40 px-4 py-5 mt-2"
            type="submit"
          >
            <span className="text-lg bg-gradient-to-r from-gray-400 via-gray-100 via-50% to-gray-400 bg-clip-text text-transparent">
              Submit
            </span>
          </Button>
        </form>
      </div>
    </section>
  );
}
