import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Palette, Users, BookOpen } from "lucide-react";

const characters = [
  {
    name: "Andy",
    image:
      "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/0c40d911-8481-4c3a-803a-29b39e022b13/SK_Andy_Intro_Pose.png",
    description:
      "A natural-born leader, Andy is a sharp and friendly little boy. Andy enjoys playtime outside in the garden with his best friend (and pet sheep), Shiloh.",
    color: "from-sky/30 to-sky/10",
  },
  {
    name: "Libni",
    image:
      "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/08f0ca39-3408-457f-b4d5-4f6ce93fd8d4/SK_Libni_Intro_Pose.png",
    description:
      "Libni is Andy's imaginative, musical, and giggly next-door neighbor. Libni spends her days picking flowers, singing, and creating dances for her family.",
    color: "from-coral/20 to-peach/20",
  },
  {
    name: "Shiloh",
    image:
      "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/62dbb904-564d-450e-a925-6dde9223c205/SK_Shiloh_Intro_Pose.png",
    description:
      "Curious, helpful and funny, Shiloh is Andy's pet sheep and best friend. He enjoys basking in the sunlight, finding snacks to eat, and taking long naps in the garden.",
    color: "from-mint/30 to-mint/10",
  },
];

const values = [
  {
    icon: BookOpen,
    title: "Biblical Principles",
    description: "Every song is rooted in scripture, teaching kids the Word of God in a way they can understand.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Palette,
    title: "Stunning Animation",
    description: "Our videos are designed by top-tier animators from around the world with vibrant visuals.",
    color: "bg-sunshine/20 text-amber-600",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Created by parents who wanted more Christ-filled media options for their little ones.",
    color: "bg-coral/10 text-coral",
  },
  {
    icon: Users,
    title: "Family Worship",
    description: "Songs designed for the whole family to sing, dance, and worship together.",
    color: "bg-mint/20 text-emerald-600",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-lavender/20 to-mint/10 py-20 sm:py-28">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/3 h-60 w-60 rounded-full bg-sunshine/40 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-60 w-60 rounded-full bg-coral/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-6 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary hover:bg-primary/10">
            Our Story
          </Badge>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            About <span className="text-primary">Selah Kids!</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl">
            Launched in 2024 by parents who wanted more Christian media options
            for families with little ones, Selah Kids! aims to create a safe and
            Christ-filled space for children (and adults!) to get moving, sing
            and worship together.
          </p>
        </div>
      </section>

      {/* Mission Images */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Bible songs that kids can{" "}
                <span className="text-primary">understand</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Our songs teach biblical principles in a way that kids can connect
                with. Each song is carefully crafted to be catchy, fun, and
                grounded in scripture so that children learn God&apos;s word through
                music and movement.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe that worship should be joyful, and our mission is to
                bring families closer to God through the power of music.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/ee53d250-5a7d-4c65-9e45-69d732337873/TGN_SingleFrames+%287%29.png"
                  alt="Selah Kids Animation"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/9e08b001-db62-4ef2-871c-6b4bf4219b82/TGN_SingleFrames+%2813%29.png"
                  alt="Selah Kids Characters"
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-to-b from-transparent to-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">What We Believe</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our core values guide everything we create.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card
                key={value.title}
                className="border-0 bg-white shadow-lg shadow-primary/5 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto mb-4 inline-flex rounded-2xl p-3 ${value.color}`}>
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Characters */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Meet the <span className="text-primary">Characters</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get to know the stars of Selah Kids!
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((character) => (
              <Card
                key={character.name}
                className="group overflow-hidden border-0 shadow-lg shadow-primary/5 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`bg-gradient-to-b ${character.color} flex items-center justify-center p-8`}>
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={280}
                    height={320}
                    className="h-64 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-extrabold text-primary">{character.name}</h3>
                  <p className="mt-2 text-muted-foreground">{character.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
