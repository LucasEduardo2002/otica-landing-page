"use client";

import Image from "next/image";
import { Cormorant_Garamond, Inter } from "next/font/google";
import {
  ArrowRight,
  CalendarDays,
  Glasses,
  Menu,
  MessageCircle,
  ShieldCheck,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import logoOtica from "../public/logo-otica.png";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SchedulingModal } from "@/components/scheduling-modal";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const navigation = [
  { label: "Marcas", href: "#marcas" },
  { label: "Coleções", href: "#colecoes" },
  { label: "Relógios", href: "#relogios" },
  { label: "Sobre", href: "#sobre" },
  { label: "Localização", href: "#localizacao" },
];

const highlights = [
  {
    icon: Glasses,
    title: "Curadoria refinada",
    description: "Marcas selecionadas para unir conforto, acabamento e presença visual.",
  },
  {
    icon: ShieldCheck,
    title: "Ajuste e precisão",
    description: "Atendimento pensado para adaptação, estabilidade e durabilidade no uso diário.",
  },
  {
    icon: CalendarDays,
    title: "Agendamento ágil",
    description: "Chame no WhatsApp e organize sua visita com rapidez e atendimento próximo.",
  },
];

const brandShowcase = [
  { name: "Ray-Ban", logo: "/images/ray-ban.png", note: "Clássico absoluto." },
  { name: "Michael Kors", logo: "/images/michael-kors.png", note: "Luxo urbano." },
  { name: "Vogue", logo: "/images/vogue.png", note: "Fashion editorial." },
  { name: "Versace", logo: "/images/versace.png", note: "Luxo marcante." },
  { name: "Reserva", logo: "/images/reserva.png", note: "Casual sofisticado." },
  { name: "Mormaii", logo: "/images/mormaii.png", note: "Esportivo e leve." },
  { name: "Aramis", logo: "/images/aramis.png", note: "Minimalismo premium." },
  { name: "Lança Perfume", logo: "/images/lanca-perfume.png", note: "Moda com atitude." },
  { name: "Swarovski", logo: "/images/swarovski.png", note: "Brilho sofisticado." },
  { name: "Guess", logo: "/images/guess.png", note: "Presença contemporânea." },
  { name: "Guess by Marciano", logo: "/images/guess-by-marciano.png", note: "Alta moda." },
  { name: "Lacoste", logo: "/images/lacoste.png", note: "Esportividade elegante." },
] as const;

const eyewearCollections = [
  {
    key: "lanca-perfume",
    label: "Lança Perfume",
    logo: "/images/lanca-perfume.png",
    descriptor: "Modelos autorais com recortes mais ousados e acabamento marcante.",
    whatsappNote: "Gostaria de consultar a coleção Lança Perfume.",
    images: [
      "/images/lanca-perfume/43-IMG_3891.jpg",
      "/images/lanca-perfume/44-IMG_3892.jpg",
      "/images/lanca-perfume/45-IMG_3895.jpg",
      "/images/lanca-perfume/46-IMG_3896.jpg",
      "/images/lanca-perfume/47-IMG_3897.jpg",
      "/images/lanca-perfume/48-IMG_3898.jpg",
    ],
  },
  {
    key: "michael-kors",
    label: "Michael Kors",
    logo: "/images/michael-kors.png",
    descriptor: "Luxo casual com silhuetas elegantes e apelo contemporâneo.",
    whatsappNote: "Gostaria de consultar a coleção Michael Kors.",
    images: [
      "/images/michael-kors/1-IMG_3830.jpg",
      "/images/michael-kors/2-IMG_3834.jpg",
      "/images/michael-kors/3-IMG_3835.jpg",
      "/images/michael-kors/4-IMG_3836.jpg",
      "/images/michael-kors/5-IMG_3837.jpg",
      "/images/michael-kors/6-IMG_3839.jpg",
    ],
  },
  {
    key: "versace",
    label: "Versace",
    logo: "/images/versace.png",
    descriptor: "Armações com assinatura forte, presença de moda e acabamento de impacto.",
    whatsappNote: "Gostaria de consultar a coleção Versace.",
    images: [
      "/images/versace/23-IMG_3865.jpg",
      "/images/versace/24-IMG_3866.jpg",
      "/images/versace/25-IMG_3867.jpg",
      "/images/versace/26-IMG_3868.jpg",
      "/images/versace/27-IMG_3871.jpg",
      "/images/versace/28-IMG_3872.jpg",
    ],
  },
  {
    key: "vogue",
    label: "Vogue",
    logo: "/images/vogue.png",
    descriptor: "Design contemporâneo, leve e com leitura fashion para o dia a dia.",
    whatsappNote: "Gostaria de consultar a coleção Vogue.",
    images: [
      "/images/vogue/54-IMG_3908.jpg",
      "/images/vogue/55-IMG_3909.jpg",
      "/images/vogue/56-IMG_3910.jpg",
      "/images/vogue/57-IMG_3912.jpg",
      "/images/vogue/58-IMG_3913.jpg",
      "/images/vogue/59-IMG_3914.jpg",
    ],
  },
] as const;

type CollectionKey = (typeof eyewearCollections)[number]["key"];
type LightboxItem = { src: string; alt: string } | null;

const watchCollections = [
  {
    key: "technos",
    label: "Technos",
    description: "Peças clássicas e contemporâneas com presença forte e leitura elegante.",
    images: [
      "/images/relogios/technos-04.jpg",
      "/images/relogios/technos-05.jpg",
      "/images/relogios/technos-06.jpg",
    ],
    whatsappNote: "Gostaria de consultar os relógios Technos disponíveis.",
  },
  {
    key: "condor",
    label: "Condor",
    description: "Modelos de personalidade esportiva e visual limpo para várias ocasiões.",
    images: [
      "/images/relogios/condor-01.jpg",
      "/images/relogios/condor-02.jpg",
      "/images/relogios/condor-03.jpg",
    ],
    whatsappNote: "Gostaria de consultar os relógios Condor disponíveis.",
  },
] as const;

function Header({ onOpenModal }: { onOpenModal: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        <a href="#" className="flex items-center gap-3">
          <Image src={logoOtica} alt="Óticas Gracinha" width={54} height={54} className="h-12 w-12 rounded-full object-contain shadow-sm" />
          <div className="leading-tight">
            <div className={`${displayFont.className} text-2xl font-bold text-foreground`}>Óticas Gracinha</div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-foreground/60">Nova identidade</div>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <a key={item.label} href={item.href} className="text-sm text-foreground/72 transition-colors hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="outline" className="cursor-pointer border-border/80 bg-background/70 hover:bg-accent/30">
            <a href="https://wa.me/5584999191542" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
          <Button onClick={onOpenModal} className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
            Agendar visita
          </Button>
        </div>

        <button onClick={() => setIsMenuOpen((value) => !value)} className="md:hidden" aria-label="Abrir menu">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border/60 bg-background/95 px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-sm text-foreground/76">
                {item.label}
              </a>
            ))}
            <Button onClick={() => { onOpenModal(); setIsMenuOpen(false); }} className="cursor-pointer bg-primary text-primary-foreground">
              Agendar visita
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">{children}</span>;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState<CollectionKey>("lanca-perfume");
  const [activeLightbox, setActiveLightbox] = useState<LightboxItem>(null);

  const currentCollection = useMemo(
    () => eyewearCollections.find((item) => item.key === activeCollection) ?? eyewearCollections[0],
    [activeCollection],
  );

  return (
    <div className={`${bodyFont.className} bg-background text-foreground`}>
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="pt-24">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(144,154,104,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(187,149,72,0.12),transparent_28%)]" />
          <div className="container relative mx-auto grid items-center gap-12 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:py-16">
            <div className="lg:col-span-6">
              <SectionLabel>Nova identidade visual</SectionLabel>
              <h1 className={`${displayFont.className} mt-4 max-w-[10ch] text-5xl font-bold leading-[0.95] text-foreground sm:text-6xl lg:text-7xl`}>
                Óticas Gracinha
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/78 sm:text-xl">
                Uma nova leitura para a loja: tons oliva e nude, composição editorial e uma curadoria que reúne óculos e relógios com presença de marca.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="#colecoes" className="flex items-center gap-2">
                    Ver coleções <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button onClick={() => setIsModalOpen(true)} size="lg" variant="outline" className="cursor-pointer border-border/80 bg-background/70 hover:bg-accent/30">
                  Agendar visita
                </Button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {highlights.map((item) => (
                  <Card key={item.title} className="border-border/70 bg-card/90 shadow-sm backdrop-blur-sm">
                    <CardContent className="p-5 text-left">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className={`${displayFont.className} mt-4 text-2xl font-semibold`}>{item.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/72">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-2xl">
                <div className="grid gap-0 lg:grid-cols-5">
                  <div className="relative min-h-[380px] lg:col-span-3 lg:min-h-[680px]">
                    <Image src="/images/hero.png" alt="Nova identidade da Óticas Gracinha" fill priority className="object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-col justify-between gap-5 p-5 lg:col-span-2 lg:p-6">
                    <div>
                      <SectionLabel>Curadoria de marcas</SectionLabel>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/72">
                        Logos, coleções e relógios organizados para reforçar a nova leitura da loja com consistência visual.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {brandShowcase.slice(0, 4).map((brand) => (
                        <div key={brand.name} className="rounded-2xl border border-border/60 bg-background/85 p-3 text-center shadow-sm">
                          <div className="relative mb-2 aspect-[4/3] w-full">
                            <Image src={brand.logo} alt={brand.name} fill className="object-contain p-2" />
                          </div>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/75">{brand.name}</div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-3xl border border-border/70 bg-primary/10 p-4">
                      <p className="text-xs uppercase tracking-[0.28em] text-primary">Destaque visual</p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                        A nova identidade usa o verde oliva da marca como base e mantém o dourado quente como acento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="marcas" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <SectionLabel>Marcas integradas</SectionLabel>
              <h2 className={`${displayFont.className} mt-3 text-4xl font-bold sm:text-5xl`}>
                Logos e marcas do site
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/75">
                A vitrine foi reestruturada com as logomarcas que vieram no pacote do site, para refletir a seleção atual da loja sem manter o conjunto antigo.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {brandShowcase.map((brand) => (
                <Card key={brand.name} className="group border-border/70 bg-card/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex h-full flex-col items-center justify-between p-4 text-center">
                    <div className="relative mb-3 aspect-[4/3] w-full">
                      <Image src={brand.logo} alt={brand.name} fill className="object-contain p-2 transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{brand.name}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-foreground/65">{brand.note}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="colecoes" className="border-y border-border/70 bg-primary/5 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <SectionLabel>Coleções de óculos</SectionLabel>
                <h2 className={`${displayFont.className} mt-3 text-4xl font-bold sm:text-5xl`}>
                  Coleção editorial por marca
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/75">
                  Selecionamos quatro coleções principais para a vitrine do site, cada uma com linguagem própria e galeria real do acervo novo.
                </p>
              </div>
              <div className="lg:col-span-5 lg:justify-self-end">
                <Button asChild className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
                  <a
                    href={`https://wa.me/5584999191542?text=${encodeURIComponent(currentCollection.whatsappNote)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Consultar coleção no WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {eyewearCollections.map((collection) => (
                <button
                  key={collection.key}
                  onClick={() => setActiveCollection(collection.key)}
                  className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm transition-all duration-300 ${activeCollection === collection.key
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border/80 bg-background/70 text-foreground/75 hover:bg-accent/30"
                    }`}
                >
                  <span className="relative h-7 w-7 overflow-hidden rounded-full bg-background/85">
                    <Image src={collection.logo} alt={collection.label} fill className="object-contain p-1.5" />
                  </span>
                  {collection.label}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              <Card className="overflow-hidden border-border/70 bg-card/95 shadow-lg lg:col-span-4">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/5] w-full">
                    <Image src={currentCollection.images[0]} alt={currentCollection.label} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className={`${displayFont.className} text-3xl font-semibold`}>{currentCollection.label}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/75">{currentCollection.descriptor}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button asChild variant="outline" className="cursor-pointer border-border/80 bg-background/70 hover:bg-accent/30">
                        <a
                          href={`https://wa.me/5584999191542?text=${encodeURIComponent(currentCollection.whatsappNote)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Falar no WhatsApp
                        </a>
                      </Button>
                      <Button variant="ghost" className="cursor-default text-foreground/70 hover:bg-transparent hover:text-foreground">
                        Galeria real do acervo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {currentCollection.images.map((src, index) => (
                    <button
                      key={src}
                      onClick={() => setActiveLightbox({ src, alt: `${currentCollection.label} - foto ${index + 1}` })}
                      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative aspect-[3/4] w-full">
                        <Image src={src} alt={`${currentCollection.label} ${index + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-left text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="text-xs font-semibold uppercase tracking-[0.24em]">Ver detalhe</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="relogios" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <SectionLabel>Relógios</SectionLabel>
                <h2 className={`${displayFont.className} mt-3 text-4xl font-bold sm:text-5xl`}>
                  Coleção de relógios
                </h2>
                <p className="mt-4 text-base leading-relaxed text-foreground/75">
                  A vitrine também recebeu a coleção de relógios da loja, com duas linhas separadas para facilitar a consulta e reforçar a nova composição do site.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <a
                      href={`https://wa.me/5584999191542?text=${encodeURIComponent("Gostaria de consultar a coleção de relógios da Óticas Gracinha.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Consultar relógios
                    </a>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-5 md:grid-cols-2">
                  {watchCollections.map((watchCollection) => (
                    <Card key={watchCollection.key} className="overflow-hidden border-border/70 bg-card/95 shadow-lg">
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/3] w-full">
                          <Image src="/images/relogios-showcase.png" alt={watchCollection.label} fill className="object-cover object-center" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                          <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground shadow-sm">
                            {watchCollection.label}
                          </div>
                        </div>
                        <div className="p-5">
                          <p className="text-sm leading-relaxed text-foreground/75">{watchCollection.description}</p>
                          <div className="mt-4 grid grid-cols-3 gap-3">
                            {watchCollection.images.map((src, index) => (
                              <button key={src} onClick={() => setActiveLightbox({ src, alt: `${watchCollection.label} - imagem ${index + 1}` })} className="relative aspect-square overflow-hidden rounded-xl border border-border/60">
                                <Image src={src} alt={`${watchCollection.label} ${index + 1}`} fill className="object-cover transition-transform duration-300 hover:scale-105" />
                              </button>
                            ))}
                          </div>
                          <div className="mt-4 flex items-center justify-between gap-3">
                            <span className="text-xs uppercase tracking-[0.24em] text-foreground/55">{watchCollection.images.length} fotos</span>
                            <a
                              href={`https://wa.me/5584999191542?text=${encodeURIComponent(watchCollection.whatsappNote)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                            >
                              WhatsApp <MessageCircle className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="border-y border-border/70 bg-primary/5 py-16 sm:py-24">
          <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionLabel>Sobre a loja</SectionLabel>
              <h2 className={`${displayFont.className} mt-3 text-4xl font-bold sm:text-5xl`}>
                Nova leitura para a Óticas Gracinha
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/75">
                A identidade visual foi ajustada para refletir o tom da marca, sem perder o cuidado com atendimento, curadoria e proximidade com o cliente.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/75">
                O site agora destaca a linguagem da nova identidade, os logos das marcas e as coleções principais de óculos e relógios em um sistema mais limpo e editorial.
              </p>
              <Button size="lg" className="mt-8 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
                Conhecer a loja
              </Button>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border border-border/70 shadow-xl">
              <Image src="/images/about_interior.png" alt="Interior da Óticas Gracinha" width={900} height={1100} className="h-auto w-full object-cover" />
            </div>
          </div>
        </section>

        <section id="localizacao" className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <SectionLabel>Localização</SectionLabel>
              <h2 className={`${displayFont.className} mt-3 text-4xl font-bold sm:text-5xl`}>
                Visite nossa loja
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/75">
                Estamos esperando por você no coração de Lagoa Nova para apresentar a nova identidade e a curadoria atualizada da loja.
              </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-[2rem] border border-border/70 shadow-xl">
              <iframe
                src="https://www.google.com/maps?q=Av.+Dr.+Silvio+Bezerra+de+Melo,+15+-+Centro,+Lagoa+Nova+-+RN,+59390-000&output=embed"
                width="100%"
                height="360"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Localização da Óticas Gracinha"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 bg-foreground py-12 text-background">
        <div className="container mx-auto grid gap-8 px-4 text-center sm:px-6 md:grid-cols-3 md:text-left">
          <div>
            <h3 className={`${displayFont.className} text-3xl font-semibold`}>Óticas Gracinha</h3>
            <p className="mt-2 text-sm text-background/70">Nova identidade, mesma proximidade com o cliente.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Endereço</h4>
            <p className="mt-2 text-sm text-background/70">Av. Dr. Silvio Bezerra de Melo, 15</p>
            <p className="text-sm text-background/70">Centro, Lagoa Nova - RN - 59390-000</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Contato</h4>
            <p className="mt-2 text-sm text-background/70">(84) 99919-1542</p>
            <a href="https://wa.me/5584999191542" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm text-background/80 transition-colors hover:text-background">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
        <div className="container mx-auto mt-8 border-t border-background/15 px-4 pt-6 text-center text-xs text-background/55 sm:px-6">
          <p>&copy; {new Date().getFullYear()} Óticas Gracinha. Todos os direitos reservados.</p>
        </div>
      </footer>

      <SchedulingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => setActiveLightbox(null)}
        >
          <div className="relative flex w-full max-w-5xl flex-col items-center justify-center gap-6" onClick={(event) => event.stopPropagation()}>
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute -top-12 right-0 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Fechar visualização"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative max-h-[72vh] w-full">
              <Image src={activeLightbox.src} alt={activeLightbox.alt} width={1400} height={1600} unoptimized className="max-h-[72vh] w-full rounded-2xl object-contain shadow-2xl" />
            </div>

            <div className="text-center text-white">
              <p className="text-sm text-white/80">
                Gostou desta imagem? Fale conosco no WhatsApp para consultar disponibilidade e detalhes.
              </p>
              <Button asChild size="lg" className="mt-4 cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <a
                  href={`https://wa.me/5584999191542?text=${encodeURIComponent(`Olá! Quero saber mais sobre a imagem ${activeLightbox.alt} que vi no site da Óticas Gracinha.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Consultar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
