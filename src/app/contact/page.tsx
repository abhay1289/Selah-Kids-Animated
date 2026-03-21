"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Youtube, MapPin, Send } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "We'd love to hear from you!",
    value: "info.selahkids@gmail.com",
    href: "mailto:info.selahkids@gmail.com",
    color: "bg-coral/10 text-coral",
  },
  {
    icon: Youtube,
    title: "YouTube",
    description: "Watch and subscribe to our channel.",
    value: "@SelahKidsWorship",
    href: "https://www.youtube.com/@SelahKidsWorship",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MapPin,
    title: "Based In",
    description: "Creating from the heart.",
    value: "United States",
    href: null,
    color: "bg-mint/20 text-emerald-600",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-peach/10 to-sky/10 py-20 sm:py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 h-60 w-60 rounded-full bg-lavender/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-60 w-60 rounded-full bg-sunshine/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-6 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary hover:bg-primary/10">
            Get In Touch
          </Badge>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Have a question, partnership inquiry, or just want to say hi? We&apos;d
            love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <div className="space-y-6 lg:col-span-2">
              <h2 className="text-2xl font-extrabold">Let&apos;s Connect</h2>
              <p className="text-muted-foreground">
                Whether you have a question about our music, want to collaborate,
                or just want to share how Selah Kids! has blessed your family,
                we&apos;re all ears!
              </p>

              <div className="space-y-4 pt-4">
                {contactInfo.map((info) => (
                  <Card key={info.title} className="border-0 shadow-md shadow-primary/5">
                    <CardContent className="flex items-start gap-4 p-5">
                      <div className={`rounded-xl p-2.5 ${info.color}`}>
                        <info.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold">{info.title}</h3>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={info.href.startsWith("http") ? "_blank" : undefined}
                            rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="mt-1 inline-block text-sm font-semibold text-primary hover:underline"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-sm font-semibold">{info.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-xl shadow-primary/5">
                <CardContent className="p-6 sm:p-8">
                  {submitted ? (
                    <div className="flex flex-col items-center py-12 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-mint/20">
                        <Send className="h-7 w-7 text-emerald-600" />
                      </div>
                      <h3 className="text-2xl font-extrabold">Message Sent!</h3>
                      <p className="mt-2 text-muted-foreground">
                        Thank you for reaching out. We&apos;ll get back to you soon!
                      </p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        variant="outline"
                        className="mt-6 rounded-full"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                      }}
                      className="space-y-5"
                    >
                      <h3 className="text-xl font-extrabold">Send a Message</h3>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-semibold">
                            Name
                          </label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            required
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-semibold">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            className="rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-semibold">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          placeholder="What is this about?"
                          required
                          className="rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-semibold">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Tell us what's on your heart..."
                          rows={5}
                          required
                          className="rounded-xl"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full rounded-full bg-primary font-bold"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
