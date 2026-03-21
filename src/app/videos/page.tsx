import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

const videos = [
  {
    id: "the-good-news",
    title: "The Good News",
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/6ca859c4-a380-41e6-854e-57cf764fe6a9/TGN_SingleFrames+%282%29.png",
    date: "Jun 26, 2025",
    badge: "New",
    category: "English",
  },
  {
    id: "jesus-me-ama",
    title: "Jesús Me Ama (Good News Español)",
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/7ab0e946-8af6-421e-8273-2780d960ad77/TGN_SingleFrames+%283%29.png",
    date: "Jun 27, 2025",
    badge: "Español",
    category: "Español",
  },
  {
    id: "worship-together",
    title: "Worship Together",
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/ee53d250-5a7d-4c65-9e45-69d732337873/TGN_SingleFrames+%287%29.png",
    date: "Jun 27, 2025",
    badge: "Popular",
    category: "English",
  },
  {
    id: "gods-love",
    title: "God's Love",
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/9e08b001-db62-4ef2-871c-6b4bf4219b82/TGN_SingleFrames+%2813%29.png",
    date: "Jun 26, 2025",
    badge: "Featured",
    category: "English",
  },
  {
    id: "andy-and-shiloh",
    title: "Andy & Shiloh's Adventure",
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/0c40d911-8481-4c3a-803a-29b39e022b13/SK_Andy_Intro_Pose.png",
    date: "Jun 25, 2025",
    badge: "Fan Favorite",
    category: "English",
  },
  {
    id: "libnis-song",
    title: "Libni's Worship Song",
    thumbnail:
      "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/08f0ca39-3408-457f-b4d5-4f6ce93fd8d4/SK_Libni_Intro_Pose.png",
    date: "Jun 25, 2025",
    badge: "New",
    category: "English",
  },
];

const badgeColors: Record<string, string> = {
  New: "bg-coral text-white hover:bg-coral",
  Español: "bg-sunshine text-amber-800 hover:bg-sunshine",
  Popular: "bg-primary text-white hover:bg-primary",
  Featured: "bg-mint text-emerald-800 hover:bg-mint",
  "Fan Favorite": "bg-lavender text-purple-800 hover:bg-lavender",
};

export default function VideosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-sky/10 to-sunshine/10 py-20 sm:py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-20 right-1/3 h-60 w-60 rounded-full bg-coral/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-60 w-60 rounded-full bg-mint/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-6 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary hover:bg-primary/10">
            Watch & Worship
          </Badge>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Our <span className="text-primary">Videos</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Explore our collection of faith-based music videos designed to get
            kids singing, dancing, and learning about God&apos;s word.
          </p>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <Card
                key={video.id}
                className="group cursor-pointer overflow-hidden border-0 shadow-lg shadow-primary/5 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={640}
                    height={360}
                    className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                      <Play className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <Badge className={`absolute top-3 left-3 rounded-full ${badgeColors[video.badge] ?? "bg-primary text-white hover:bg-primary"}`}>
                    {video.badge}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold">{video.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{video.date}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {video.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-coral to-coral/80 px-6 py-14 text-center text-white sm:px-12">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Want More Videos?
            </h2>
            <p className="mt-3 text-lg text-white/80">
              Head over to our YouTube channel for the full collection!
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://www.youtube.com/@SelahKidsWorship?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-bold text-coral transition-colors hover:bg-white/90"
              >
                YouTube (English)
              </a>
              <a
                href="https://www.youtube.com/@SelahKidsEspa%C3%B1ol?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-transparent px-8 py-3 text-base font-bold text-white transition-colors hover:bg-white/10"
              >
                YouTube (Español)
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
