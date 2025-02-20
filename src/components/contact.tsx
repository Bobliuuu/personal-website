"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <section id="contact" className="text-white max-w-[1800px] mx-auto px-12 sm:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-400 via-gray-100 via-30% to-gray-400 bg-clip-text text-transparent">
                Let&apos;s get in touch!
              </span>
            </h1>
            <p className="text-gray-400 text-medium">
              Want to contact me? Feel free to send me a message.
            </p>
          </div>
          <div className="space-y-6">
            <Input
              placeholder="Name"
              className="bg-[#111] border border-gray-700 h-12 text-white placeholder:text-gray-500 rounded-md focus:border-gray-500 focus:ring-0"
            />
            <Input
              type="email"
              placeholder="Email"
              className="bg-[#111] border border-gray-700 h-12 text-white placeholder:text-gray-500 rounded-md focus:border-gray-500 focus:ring-0"
            />
            <Textarea
              placeholder="Message"
              className="bg-[#111] border border-gray-700 min-h-[200px] text-white placeholder:text-gray-500 rounded-md focus:border-gray-500 focus:ring-0"
            />
            <Button className="border border-white bg-[#111] hover:bg-[#222] text-white rounded-lg px-6 py-3 h-auto shadow-md transition-all duration-300 hover:shadow-lg">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
