import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { ArrowRight, CalendarDays, Glasses, MapPin, Menu, MessageCircle, ShieldCheck, Sparkles, Star } from "lucide-react";
import logoOtica from "./logo-otica.png";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const navigation = [
  { label: "Produtos", href: "#produtos" },
  { label: "Nossa tradição", href: "#sobre" },
  { label: "Localização", href: "#localizacao" },
];

const highlights = [
  {
    icon: Sparkles,
    title: "Seleção refinada",
    description: "Armações elegantes e confortáveis para uso diário e ocasiões especiais.",
  },
  {
    icon: ShieldCheck,
    title: "Ajuste preciso",
    description: "Montagem e adaptação pensadas para conforto, estabilidade e durabilidade.",
  },
  {
    icon: CalendarDays,
    title: "Atendimento ágil",
    description: "Agendamento prático para escolha de armação, orientação e exames.",
  },
];

const productCards = [
  {
    name: "Linha Aurora",
    note: "Acetato leve com acabamento acetinado",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop&sig=1",
  },
  {
    name: "Linha Essenza",
    note: "Estrutura fina para visual limpo e sofisticado",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1200&auto=format&fit=crop&sig=2",
  },
  {
    name: "Linha Contorno",
    note: "Design marcante com presença e leveza",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1200&auto=format&fit=crop&sig=3",
  },
  {
    name: "Linha Brisa",
    note: "Perfil minimalista para quem prefere discrição",
    image: "https://images.unsplash.com/photo-1520612476871-d0f2a5e5e7f5?q=80&w=1200&auto=format&fit=crop&sig=4",
  },
  {
    name: "Linha Térrea",
    note: "Acabamento clássico com leitura contemporânea",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1200&auto=format&fit=crop&sig=5",
  },
  {
    name: "Linha Sol",
    note: "Óculos de sol com proteção e personalidade",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=1200&auto=format&fit=crop&sig=6",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(122,65,21,0.14),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(122,65,21,0.08),_transparent_24%),linear-gradient(180deg,_#fbf4e9_0%,_#f7efe4_42%,_#fffaf4_100%)] text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(122,65,21,0.08),_transparent_26%),radial-gradient(circle_at_center,_rgba(255,255,255,0.35),_transparent_45%)]" />

      <header className="sticky top-0 z-50 border-b border-primary/10 bg-[#fbf4e9]">
        <nav className="container relative mx-auto flex items-center justify-center px-4 py-4">
          <a href="#top" className="flex items-center">
            <Image
              src={logoOtica}
              alt="Logo da Óticas Gracinha"
              priority
              className="h-16 w-auto object-contain md:h-20"
            />
          </a>

          <div className="absolute inset-y-0 right-0 hidden items-center justify-center gap-8 pr-4 md:flex md:static md:flex-1 md:pr-0">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="text-md font-medium text-foreground/75 transition-colors hover:text-primary">
                {item.label}
              </a>
            ))}
          </div>

          <Button asChild className="absolute right-20 hidden rounded-full bg-primary px-5 text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 hover:bg-primary/90 md:right-4 md:inline-flex md:absolute">
            <a href="#contato">Entre em contato</a>
          </Button>

          <details className="absolute right-4 md:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-primary/20 bg-white/80 text-primary shadow-sm transition-colors hover:bg-white [&::-webkit-details-marker]:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Abrir menu</span>
            </summary>
            <div className="absolute right-0 top-full z-40 mt-2 w-80 rounded-2xl border border-primary/10 bg-[#fffaf4]/98 p-4 shadow-[0_18px_40px_rgba(103,58,21,0.25)] backdrop-blur">
              <div className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <a
                    key={`mobile-${item.href}`}
                    href={item.href}
                    className="rounded-lg px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <Button asChild className="mt-4 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="#contato">Entre em contato</a>
              </Button>
            </div>
          </details>
        </nav>
      </header>

      <main id="top" className="relative">
        <section className="container mx-auto px-4 pb-16 pt-16 md:pb-24 md:pt-24 lg:pt-28">
          <div className="flex flex-col-reverse items-center gap-14 lg:grid lg:grid-cols-[1.04fr_0.96fr]">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary shadow-sm backdrop-blur">
                <Star className="size-3.5 fill-current" />
                Tradição e cuidado em Lagoa Nova
              </div>

              <div className="space-y-5">
                <h1 className={`${displayFont.className} text-5xl font-semibold leading-[0.92] tracking-tight text-foreground sm:text-6xl lg:text-7xl`}>
                  Muito além dos olhos.
                </h1>
                <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground lg:mx-0">
                  Uma marca com presença, atendimento humano e uma curadoria de armações que valoriza o conforto e a identidade de cada cliente.
                </p>
              </div>

              <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Button size="lg" className="h-12 gap-2 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 hover:bg-primary/90">
                  <MessageCircle className="size-4" />
                  Falar com consultor no WhatsApp
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 gap-2 rounded-full border-primary/20 bg-white/70 px-6 text-base font-semibold text-primary hover:bg-primary/5">
                  <a href="#produtos">
                    Ver coleção
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
                  <Card key={item.title} className="border-primary/10 bg-white/70 shadow-[0_10px_30px_rgba(103,58,21,0.08)] backdrop-blur">
                    <CardContent className="flex h-full flex-col gap-3 p-5 text-left">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <item.icon className="size-5" />
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-base font-semibold text-foreground">{item.title}</h2>
                        <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.25rem] bg-primary/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/65 shadow-[0_30px_80px_rgba(88,46,14,0.18)] backdrop-blur-xl">
                <div className="absolute left-4 top-4 z-10 rounded-full border border-white/60 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
                  Nova coleção
                </div>
                <div className="relative aspect-[4/5]">
                  <Image
                    src="https://images.unsplash.com/photo-1600076280106-22cb8bd62b22?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Modelo sorrindo usando óculos elegantes da Óticas Gracinha"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 text-white">

                </div>
                <div className="absolute bottom-4 left-4 hidden rounded-2xl border border-white/60 bg-white/88 p-3 shadow-lg shadow-primary/10 md:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Lagoa Nova/RN</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        

        <section id="produtos" className="order-1 border-y border-primary/10 bg-white/55 py-20 md:order-none md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                Coleção exclusiva
              </div>
              <h2 className={`${displayFont.className} text-4xl font-semibold tracking-tight text-foreground md:text-5xl`}>
                Peças que parecem feitas para o rosto certo.
              </h2>
              <p className="text-muted-foreground">
                Uma seleção pensada para manter a identidade da marca: tons quentes, acabamento sofisticado e um ritmo visual mais calmo, limpo e premium.
              </p>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="relative mx-auto w-full max-w-6xl"
            >
              <CarouselContent className="-ml-4">
                {productCards.map((product) => (
                  <CarouselItem key={product.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="group overflow-hidden rounded-[1.75rem] border-primary/10 bg-white/80 shadow-[0_16px_45px_rgba(103,58,21,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(103,58,21,0.14)]">
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/5] overflow-hidden bg-muted/20">
                          <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm backdrop-blur">
                            Destaque
                          </div>
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="space-y-4 p-6">
                          <div className="space-y-1">
                            <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
                            <p className="text-sm leading-6 text-muted-foreground">{product.note}</p>
                          </div>
                          <div className="flex items-center justify-between gap-3 border-t border-primary/10 pt-4">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">A partir de</p>
                              <p className="text-lg font-semibold text-primary">R$ 299,90</p>
                            </div>
                            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-primary/20 bg-white/80 px-6 text-primary hover:bg-primary/5">
                              <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">
                                <MessageCircle className="size-4" />
                                Saiba mais
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="hidden -left-6 border-primary/15 bg-white/90 text-primary shadow-lg shadow-primary/10 hover:bg-primary hover:text-white md:flex" />
              <CarouselNext className="hidden -right-6 border-primary/15 bg-white/90 text-primary shadow-lg shadow-primary/10 hover:bg-primary hover:text-white md:flex" />
            </Carousel>
          </div>
        </section>

        <section id="sobre" className="order-3 container mx-auto px-4 py-20 md:order-none md:py-28">
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary/15 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary shadow-sm">
                Nossa tradição
              </div>
              <h2 className={`${displayFont.className} text-4xl font-semibold tracking-tight text-foreground md:text-5xl`}>
                Sofisticação visual sem perder acolhimento.
              </h2>
              <p className="max-w-xl text-base leading-8 text-muted-foreground">
                Tradição e cuidado em Lagoa Nova. Encontre armações exclusivas e atendimento especializado.
              </p>
              <Button asChild className="rounded-full bg-primary px-6 text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90">
                <a href="#contato">Falar com a loja</a>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-primary/10 bg-white/75 shadow-[0_14px_35px_rgba(103,58,21,0.08)] backdrop-blur">
                <CardContent className="space-y-3 p-6">
                  <div className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Paleta alinhada</div>
                  <p className="text-sm leading-6 text-muted-foreground">Bege quente, marrons sofisticados e superfícies claras para manter a marca confortável e premium.</p>
                </CardContent>
              </Card>
              <Card className="border-primary/10 bg-white/75 shadow-[0_14px_35px_rgba(103,58,21,0.08)] backdrop-blur">
                <CardContent className="space-y-3 p-6">
                  <div className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Hierarquia clara</div>
                  <p className="text-sm leading-6 text-muted-foreground">Título forte, texto respirando e CTAs com distinção visual suficiente para guiar o olho.</p>
                </CardContent>
              </Card>
              <Card className="sm:col-span-2 border-primary/10 bg-white/75 shadow-[0_14px_35px_rgba(103,58,21,0.08)] backdrop-blur">
                <CardContent className="grid gap-4 p-6 md:grid-cols-3">
                  {[
                    ["01", "Tom da marca", "A mesma família visual da logo foi mantida em todos os pontos de destaque."],
                    ["02", "Contraste", "Botões e cards foram diferenciados sem sair da paleta principal."],
                    ["03", "Ritmo", "Espaçamento maior no topo e entre seções para parecer mais premium."],
                  ].map(([step, title, text]) => (
                    <div key={step} className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">{step}</p>
                      <h3 className="text-base font-semibold text-foreground">{title}</h3>
                      <p className="text-sm leading-6 text-muted-foreground">{text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="localizacao" className="order-4 container mx-auto px-4 pb-20 md:order-none md:pb-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white/70 p-6 shadow-[0_24px_60px_rgba(103,58,21,0.12)] backdrop-blur md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(122,65,21,0.12),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(122,65,21,0.07),_transparent_42%)]" />

            <div className="relative grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary shadow-sm">
                  <MapPin className="size-3.5" />
                  Localização
                </div>

                <div className="space-y-3">
                  <h2 className={`${displayFont.className} text-4xl font-semibold tracking-tight text-foreground md:text-5xl`}>
                    Venha nos visitar na loja.
                  </h2>
                  <p className="max-w-xl text-base leading-7 text-muted-foreground">
                    Estamos em Currais Novos/RN, com fácil acesso e atendimento acolhedor para você escolher sua armação com tranquilidade.
                  </p>
                </div>

                <Card className="border-primary/10 bg-white/80 shadow-[0_14px_35px_rgba(103,58,21,0.09)]">
                  <CardContent className="space-y-2 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Endereço</p>
                    <p className="text-base font-semibold text-foreground">Rua José Pinheiro Sobrinho, 167</p>
                    <p className="text-sm text-muted-foreground">Currais Novos - RN</p>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="h-12 rounded-full bg-primary px-6 text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90">
                    <a href="https://maps.google.com/?q=Rua.%20José%20Pinheiro%20Sobrinho%20167%20Currais%20Novos%20RN" target="_blank" rel="noreferrer">
                      <MapPin className="size-4" />
                      Abrir no mapa
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-primary/20 bg-white/80 px-6 text-primary hover:bg-primary/5">
                    <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">
                      <MessageCircle className="size-4" />
                      <p>Falar no WhatsApp</p>
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.5rem] border border-primary/10 bg-white shadow-[0_18px_45px_rgba(103,58,21,0.12)]">
                <iframe
                  title="Mapa da Óticas Gracinha"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/?q=Rua.%20José%20Pinheiro%20Sobrinho%20167%20Currais%20Novos%20RN&output=embed"
                  className="h-[320px] w-full md:h-[420px]"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="order-5 container mx-auto px-4 pb-24 md:order-none md:pb-32">
          <div className="overflow-hidden rounded-[2rem] border border-primary/10 bg-[linear-gradient(135deg,_rgba(120,67,26,0.98),_rgba(154,92,44,0.92))] px-6 py-10 text-white shadow-[0_30px_70px_rgba(103,58,21,0.22)] md:px-10 md:py-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/75">Pronto para atualizar sua visão</p>
                <h2 className={`${displayFont.className} text-4xl font-semibold tracking-tight md:text-5xl`}>
                  Fale com a Óticas Gracinha e encontre o modelo certo.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Button asChild size="lg" className="h-12 rounded-full bg-white px-6 text-primary hover:bg-white/90">
                  <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">
                    <MessageCircle className="size-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white">
                  <a href="#top">
                    Voltar ao topo
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>


      </main>
      <footer className="border-t border-primary/10 bg-background/70 px-4 py-6 text-center text-sm text-muted-foreground backdrop-blur">
        &copy; {new Date().getFullYear()} Óticas Gracinha. Todos os direitos reservados.
      </footer>
    </div>
  );
}