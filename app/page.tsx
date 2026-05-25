"use client";

import Image from "next/image";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { ArrowRight, CalendarDays, Glasses, Heart, MapPin, Menu, MessageCircle, ShieldCheck, Sparkles, Star, X } from "lucide-react";
import logoOtica from "../public/logo-otica.png";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const navigation = [
  { label: "Modelos", href: "#modelos" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Localização", href: "#localizacao" },
];

const highlights = [
  {
    icon: Glasses,
    title: "Seleção Refinada",
    description: "Armações elegantes e confortáveis para o dia a dia e ocasiões especiais.",
  },
  {
    icon: ShieldCheck,
    title: "Ajuste Preciso",
    description: "Montagem e adaptação pensadas para seu conforto, estabilidade e durabilidade.",
  },
  {
    icon: CalendarDays,
    title: "Atendimento Ágil",
    description: "Agende uma visita para escolher sua armação, receber orientação e realizar exames.",
  },
];

const productCards = [
  {
    name: "Vogue",
    note: "Tendências da moda com um toque de glamour.",
    image: "https://source.unsplash.com/featured/?vogue%20sunglasses&sig=1",
  },
  {
    name: "Just Cavalli",
    note: "Estilo marcante e atitude.",
    image: "https://source.unsplash.com/featured/?justcavalli%20sunglasses&sig=2",
  },
  {
    name: "Lança Perfume",
    note: "Visual contemporâneo e feminino.",
    image: "https://source.unsplash.com/featured/?women%20sunglasses&sig=3",
  },
  {
    name: "Swarovski",
    note: "Detalhes brilhantes e acabamento sofisticado.",
    image: "https://source.unsplash.com/featured/?swarovski%20sunglasses&sig=4",
  },
  {
    name: "Versace",
    note: "Luxo e personalidade italiana.",
    image: "https://source.unsplash.com/featured/?versace%20sunglasses&sig=5",
  },
  {
    name: "Ray-Ban",
    note: "Clássicos atemporais com proteção UV.",
    image: "https://source.unsplash.com/featured/?rayban%20sunglasses&sig=6",
  },
];

const testimonials = [
  {
    quote: "Atendimento impecável e uma variedade incrível de armações. Encontrei os óculos perfeitos!",
    name: "Maria S.",
    location: "Lagoa Nova, RN",
  },
  {
    quote: "A equipe é muito atenciosa e me ajudou a escolher a melhor lente para o meu grau. Recomendo!",
    name: "João P.",
    location: "Lagoa Nova, RN",
  },
  {
    quote: "Qualidade e bom gosto definem a Ótica Gracinha. Meu óculos novo é um sucesso!",
    name: "Ana C.",
    location: "Lagoa Nova, RN",
  },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <a href="#" className="flex items-center gap-2">
          <Image src={logoOtica} alt="Ótica Gracinha Logo" width={40} height={40} className="rounded-full" />
          <span className={`${displayFont.className} text-2xl font-bold text-foreground`}>Ótica Gracinha</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <a key={item.label} href={item.href} className="text-foreground/80 hover:text-foreground transition-colors">
              {item.label}
            </a>
          ))}
        </nav>
        <Button className="hidden md:flex">Agende sua visita</Button>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background p-4">
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => (
              <a key={item.label} href={item.href} className="text-foreground/80 hover:text-foreground transition-colors">
                {item.label}
              </a>
            ))}
            <Button>Agende sua visita</Button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default function Home() {
  return (
    <div className={`${bodyFont.className} bg-background text-foreground`}>
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section 
          className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white"
          style={{ backgroundImage: "url('https://source.unsplash.com/featured/?optical%20store,eyewear&sig=10')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center">
            <h1 className={`${displayFont.className} text-3xl sm:text-4xl md:text-6xl font-bold`}>
              Ótica Gracinha
            </h1>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl">Muito além dos olhos.</p>
            <Button size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 px-6">
              Descubra seu novo olhar <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Highlights Section */}
        <section id="destaques" className="py-16 sm:py-24">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {highlights.map((highlight) => (
                <div key={highlight.title} className="flex flex-col items-center">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <highlight.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className={`${displayFont.className} mt-4 text-2xl font-semibold`}>{highlight.title}</h3>
                  <p className="mt-2 text-foreground/80">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="modelos" className="py-16 sm:py-24 bg-primary/5">
          <div className="container mx-auto">
            <h2 className={`${displayFont.className} text-4xl font-bold text-center`}>Nossos Modelos</h2>
            <p className="text-center mt-2 text-foreground/80">Uma seleção de marcas que combinam com você.</p>
            <Carousel className="mt-12 w-full">
              <CarouselContent>
                {productCards.map((product, index) => (
                  <CarouselItem key={index} className="w-full md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={800}
                          height={600}
                          className="w-full h-56 sm:h-64 object-cover"
                        />
                        <div className="p-6">
                          <h4 className={`${displayFont.className} text-2xl font-semibold`}>{product.name}</h4>
                          <p className="text-foreground/70 mt-1">{product.note}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-12" />
              <CarouselNext className="mr-12" />
            </Carousel>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="depoimentos" className="py-16 sm:py-24">
            <div className="container mx-auto text-center">
                <h2 className={`${displayFont.className} text-4xl font-bold`}>O que nossos clientes dizem</h2>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <div className="flex justify-center">
                                    <Star className="text-secondary" />
                                    <Star className="text-secondary" />
                                    <Star className="text-secondary" />
                                    <Star className="text-secondary" />
                                    <Star className="text-secondary" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="italic">"{testimonial.quote}"</p>
                                <p className="font-semibold mt-4">{testimonial.name}</p>
                                <p className="text-sm text-foreground/60">{testimonial.location}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-16 sm:py-24 bg-primary/5">
            <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className={`${displayFont.className} text-4xl font-bold`}>Tradição e cuidado em cada detalhe</h2>
                    <p className="mt-4 text-foreground/80">
                        Desde 1988, a Ótica Gracinha é referência em Lagoa Nova, combinando a tradição de um atendimento familiar com a busca constante por inovação. Nossa missão é oferecer mais do que óculos, é proporcionar uma nova perspectiva de vida.
                    </p>
                    <p className="mt-4 text-foreground/80">
                        Acreditamos que cada cliente é único. Por isso, nossa equipe de especialistas se dedica a encontrar a solução perfeita para sua visão e estilo, com um acervo de armações selecionadas das melhores marcas.
                    </p>
                    <Button size="lg" className="mt-8">Conheça nossa história</Button>
                </div>
                <div>
                  <Image src="https://source.unsplash.com/featured/?optical%20interior&sig=7" alt="Interior da Ótica Gracinha" width={600} height={600} className="rounded-lg shadow-lg" />
                </div>
            </div>
        </section>

        {/* Location Section */}
        <section id="localizacao" className="py-16 sm:py-24">
            <div className="container mx-auto text-center">
                <h2 className={`${displayFont.className} text-4xl font-bold`}>Visite nossa loja</h2>
                <p className="mt-2 text-foreground/80">Estamos esperando por você no coração de Lagoa Nova.</p>
                <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={"https://www.google.com/maps?q=Lagoa%20Nova%20RN&output=embed"}
                    width="100%"
                    height="350"
                    style={{ border:0 }}
                    allowFullScreen={true}
                    loading="lazy"
                  ></iframe>
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
                <h3 className={`${displayFont.className} text-2xl font-semibold`}>Ótica Gracinha</h3>
                <p className="text-background/70 mt-2">Muito além dos olhos desde 1988.</p>
            </div>
            <div>
                <h4 className="font-semibold text-lg">Endereço</h4>
                <p className="text-background/70 mt-2">Rua Principal, 123</p>
                <p className="text-background/70">Centro, Lagoa Nova - RN</p>
            </div>
            <div>
                <h4 className="font-semibold text-lg">Contato</h4>
                <p className="text-background/70 mt-2"> (84) 99999-9999</p>
                <p className="text-background/70">contato@oticagracinha.com.br</p>
            </div>
        </div>
        <div className="container mx-auto mt-8 border-t border-background/20 pt-6 text-center text-background/60">
            <p>&copy; {new Date().getFullYear()} Ótica Gracinha. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}