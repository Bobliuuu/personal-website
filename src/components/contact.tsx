"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  return (
    <section className="text-white max-w-[1800px] mx-auto px-12 sm:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-5xl font-medium mb-6">Let&apos;s get in touch.</h1>
            <p className="text-gray-400 text-xl">
              Have a question, new opportunity, or just want to have a quick chat? Feel free to send me a message.
            </p>
          </div>
          <div className="space-y-6">
            <Input placeholder="Name" className="bg-[#111] border-0 h-12 text-white placeholder:text-gray-500" />
            <Input
              type="email"
              placeholder="Email"
              className="bg-[#111] border-0 h-12 text-white placeholder:text-gray-500"
            />
            <Textarea
              placeholder="Message"
              className="bg-[#111] border-0 min-h-[200px] text-white placeholder:text-gray-500"
            />
            <Button className="bg-[#111] hover:bg-[#222] text-white rounded-lg px-8 py-6 h-auto">Submit</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

