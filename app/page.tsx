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
  { label: "Modelos", href: "#modelos" },
  { label: "Relógios", href: "#relogios" },
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
    name: "Guess",
    note: "Atitude jovem, glamour contemporâneo e sofisticação em designs marcantes. Destaca-se pelas armações estilo gatinho e oversized que realçam o olhar com personalidade.",
    image: "/images/guess.png",
    category: "feminino",
    features: ["Estilo Cat-Eye", "Modelos Oversized", "Logotipo G em Destaque"]
  },
  {
    name: "Guess by Marciano",
    note: "Linha de luxo com detalhes refinados, perfeita para mulheres que buscam elegância exclusiva e alta moda. Acabamento premium em acetato de alta qualidade e detalhes em metal polido.",
    image: "/images/guess-by-marciano.png",
    category: "feminino",
    features: ["Linha Premium", "Acetato de Alta Qualidade", "Alta Moda"]
  },
  {
    name: "Lança Perfume",
    note: "Design ousado e único. Óculos com formatos geométricos marcantes, feitos para mulheres autênticas, modernas e cheias de atitude que valorizam a moda nacional.",
    image: "/images/lanca-perfume.png",
    category: "feminino",
    features: ["Formatos Geométricos", "Design Ousado", "Identidade LP"]
  },
  {
    name: "Michael Kors",
    note: "Luxo casual e glamour atemporal americano, unindo elegância clássica com o dinamismo urbano. Traz as icônicas ferragens douradas e o consagrado logotipo MK.",
    image: "/images/michael-kors.png",
    category: "feminino",
    features: ["Estilo Jet-Set", "Detalhes Dourados", "Logotipo MK Clássico"]
  },
  {
    name: "Swarovski",
    note: "Brilho e sofisticação incomparáveis. Modelos adornados com autênticos cristais lapidados e cravejados nas hastes, transformando seus óculos em verdadeiras joias.",
    image: "/images/swarovski.png",
    category: "feminino",
    features: ["Cristais Cravejados", "Efeito Joia", "Brilho Exclusivo"]
  },
  {
    name: "Versace",
    note: "Estilo barroco, luxo dramático e personalidade italiana marcante para quem não tem medo de se destacar. Traz os inconfundíveis ícones da Medusa e da estampa Greca.",
    image: "/images/versace.png",
    category: "feminino",
    features: ["Ícone da Medusa", "Grife Italiana", "Detalhes em Relevo"]
  },
  {
    name: "Vogue",
    note: "Inovação, cores vibrantes e as últimas tendências das passarelas da moda mundial em seu olhar cotidiano. Formatos modernos e coleções dinâmicas e fashionistas.",
    image: "/images/vogue.png",
    category: "feminino",
    features: ["Tendência Fashion", "Paleta de Cores Vibrantes", "Design Moderno"]
  },
  {
    name: "Lacoste",
    note: "Estilo clássico francês de herança esportiva, combinando conforto, elegância casual e dinamismo. Detalhes marcantes como a textura petit piqué nas hastes e o tradicional crocodilo.",
    image: "/images/lacoste.png",
    category: "masculino",
    features: ["Herança Esportiva", "Textura Petit Piqué", "Logo Crocodilo"]
  },
  {
    name: "Aramis",
    note: "Elegância contemporânea e design minimalista focado no homem moderno que valoriza sofisticação, leveza e discrição em armações confortáveis para o dia a dia.",
    image: "/images/aramis.png",
    category: "masculino",
    features: ["Design Minimalista", "Estrutura Leve", "Sofisticação Discreta"]
  },
  {
    name: "Ray-Ban",
    note: "O maior clássico do mundo. Estilo icônico e atemporal com lentes de alta proteção que nunca saem de moda. Casa dos formatos históricos Aviator, Wayfarer e Clubmaster.",
    image: "/images/ray-ban.png",
    category: "unissex",
    features: ["Modelos Ícones", "Lentes de Alta Proteção", "Opções Polarizadas"]
  }
];

const categories = [
  { id: "todos", label: "Todas as Marcas" },
  { id: "feminino", label: "Feminino" },
  { id: "masculino", label: "Masculino" },
  { id: "unissex", label: "Unissex & Solar" },
] as const;

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

const brandKeys: Record<string, string> = {
  "Lança Perfume": "lanca-perfume",
  "Michael Kors": "michael-kors",
  "Versace": "versace",
  "Vogue": "vogue"
};

const brandLookbooks: Record<string, string[]> = {
  "lanca-perfume": [
    "43-IMG_3891.jpg", "44-IMG_3892.jpg", "45-IMG_3895.jpg", "46-IMG_3896.jpg",
    "47-IMG_3897.jpg", "48-IMG_3898.jpg", "49-IMG_3899.jpg", "50-IMG_3900.jpg",
    "51-IMG_3902.jpg", "52-IMG_3903.jpg", "53-IMG_3907.jpg"
  ],
  "michael-kors": [
    "1-IMG_3830.jpg", "2-IMG_3834.jpg", "3-IMG_3835.jpg", "4-IMG_3836.jpg",
    "5-IMG_3837.jpg", "6-IMG_3839.jpg", "7-IMG_3841.jpg", "8-IMG_3842.jpg",
    "9-IMG_3844.jpg", "10-IMG_3848.jpg", "11-IMG_3850.jpg", "12-IMG_3851.jpg",
    "13-IMG_3852.jpg", "14-IMG_3854.jpg", "15-IMG_3855.jpg", "16-IMG_3856.jpg",
    "17-IMG_3857.jpg", "18-IMG_3859.jpg", "19-IMG_3860.jpg", "20-IMG_3861.jpg",
    "21-IMG_3862.jpg", "22-IMG_3863.jpg"
  ],
  "versace": [
    "23-IMG_3865.jpg", "24-IMG_3866.jpg", "25-IMG_3867.jpg", "26-IMG_3868.jpg",
    "27-IMG_3871.jpg", "28-IMG_3872.jpg", "29-IMG_3873.jpg", "30-IMG_3874.jpg",
    "31-IMG_3876.jpg", "32-IMG_3878.jpg", "33-IMG_3880.jpg", "34-IMG_3881.jpg",
    "35-IMG_3882.jpg", "36-IMG_3883.jpg", "37-IMG_3884.jpg", "38-IMG_3885.jpg",
    "39-IMG_3886.jpg", "40-IMG_3887.jpg", "41-IMG_3889.jpg", "42-IMG_3890.jpg"
  ],
  "vogue": [
    "54-IMG_3908.jpg", "55-IMG_3909.jpg", "56-IMG_3910.jpg", "57-IMG_3912.jpg",
    "58-IMG_3913.jpg", "59-IMG_3914.jpg", "60-IMG_3915.jpg", "61-IMG_3916.jpg",
    "62-IMG_3917.jpg", "63-IMG_3918.jpg", "64-IMG_3920.jpg", "65-IMG_3921.jpg",
    "66-IMG_3922.jpg", "67-IMG_3923.jpg", "68-IMG_3924.jpg", "69-IMG_3925.jpg",
    "70-IMG_3926.jpg", "71-IMG_3927.jpg", "72-IMG_3928.jpg", "73-IMG_3929.jpg",
    "74-IMG_3930.jpg", "75-IMG_3931.jpg", "76-IMG_3932.jpg", "77-IMG_3933.jpg",
    "78-IMG_3934.jpg", "79-IMG_3935.jpg", "80-IMG_3937.jpg", "81-IMG_3938.jpg",
    "82-IMG_3939.jpg", "83-IMG_3940.jpg", "84-IMG_3941.jpg", "85-IMG_3942.jpg",
    "86-IMG_3943.jpg", "87-IMG_3944.jpg", "88-IMG_3945.jpg", "89-IMG_3946.jpg"
  ]
};

function Header({ onOpenModal }: { onOpenModal: () => void }) {
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
        <Button onClick={onOpenModal} className="hidden md:flex cursor-pointer">Agende sua visita</Button>
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
            <Button onClick={() => { onOpenModal(); setIsMenuOpen(false); }} className="cursor-pointer">Agende sua visita</Button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<"todos" | "feminino" | "masculino" | "unissex">("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLookbookBrand, setActiveLookbookBrand] = useState<"lanca-perfume" | "michael-kors" | "versace" | "vogue">("lanca-perfume");
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

  const filteredProducts = selectedCategory === "todos"
    ? productCards
    : productCards.filter((product) => product.category === selectedCategory);

  return (
    <div className={`${bodyFont.className} bg-background text-foreground`}>
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="pt-16">
        {/* Desktop Hero Section */}
        <section className="hidden md:grid md:grid-cols-12 min-h-[70vh] bg-background overflow-hidden">
          <div className="md:col-span-6 flex flex-col justify-center px-12 lg:px-20 py-16 text-left">
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm mb-3">
              Tradição e Estilo desde 1988
            </span>
            <h1 className={`${displayFont.className} text-4xl lg:text-6xl font-bold text-foreground leading-tight`}>
              Ótica Gracinha
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-foreground/80 leading-relaxed max-w-[45ch]">
              Muito além dos olhos. Encontre a armação perfeita que une sofisticação, conforto e a precisão que sua visão merece.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 cursor-pointer shadow-sm">
                <a href="#modelos" className="flex items-center gap-2">
                  Descubra seu novo olhar <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button onClick={() => setIsModalOpen(true)} variant="outline" size="lg" className="border-border text-foreground hover:bg-accent/20 px-8 cursor-pointer">
                Agende sua visita
              </Button>
            </div>
          </div>
          <div className="md:col-span-6 relative h-full min-h-[70vh]">
            <Image
              src="/images/hero.jpg"
              alt="Modelo elegante usando óculos de grau da Ótica Gracinha"
              fill
              priority
              className="object-cover object-[center_20%]"
            />
            {/* Soft gradient overlay on desktop image for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent pointer-events-none w-24" />
          </div>
        </section>

        {/* Mobile Hero Section */}
        <section
          className="relative h-[55vh] sm:h-[65vh] flex items-center justify-center text-center text-white md:hidden"
          style={{ backgroundImage: "url('/images/hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center 20%' }}
        >
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 flex flex-col items-center px-4">
            <h1 className={`${displayFont.className} text-3xl sm:text-4xl font-bold`}>
              Ótica Gracinha
            </h1>
            <p className="mt-4 text-base sm:text-lg">Muito além dos olhos.</p>
            <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 px-6 cursor-pointer">
              <a href="#modelos" className="flex items-center gap-2">
                Descubra seu novo olhar <ArrowRight className="ml-2 h-5 w-5" />
              </a>
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
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className={`${displayFont.className} text-4xl font-bold text-center`}>Nossos Modelos</h2>
            <p className="text-center mt-2 text-foreground/80">Uma seleção de marcas de luxo e alta qualidade que combinam com você.</p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-8 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${selectedCategory === category.id
                    ? "bg-secondary text-secondary-foreground shadow-md scale-105"
                    : "bg-background/80 border border-border text-foreground hover:bg-accent/40 hover:border-accent"
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <Carousel className="mt-12 w-full">
              <CarouselContent key={selectedCategory}>
                {filteredProducts.map((product, index) => (
                  <CarouselItem key={index} className="w-full md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden h-full flex flex-col group hover:shadow-lg transition-all duration-300 border-border/60">
                      <CardContent className="p-0 flex flex-col h-full">
                        <div className="overflow-hidden relative aspect-[4/3] w-full">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={800}
                            height={600}
                            quality={85}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <span className="absolute top-3 right-3 text-xs font-semibold tracking-wider uppercase bg-background/95 backdrop-blur px-3 py-1.5 rounded-full shadow-sm text-foreground/90">
                            {product.category === "feminino" ? "Feminino" : product.category === "masculino" ? "Masculino" : "Unissex / Solar"}
                          </span>
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between bg-card">
                          <div>
                            <h4 className={`${displayFont.className} text-2xl font-semibold text-foreground group-hover:text-secondary transition-colors`}>{product.name}</h4>
                            <p className="text-foreground/75 mt-2 text-sm leading-relaxed">{product.note}</p>
                          </div>
                          <div className="mt-6 pt-4 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <a
                              href={`https://wa.me/5584999999999?text=Olá! Gostaria de consultar os modelos disponíveis da marca ${product.name} na Ótica Gracinha.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm font-medium text-secondary hover:text-secondary/80 transition-colors gap-1.5 group/link"
                            >
                              Consultar WhatsApp
                              <MessageCircle className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                            </a>
                            {brandKeys[product.name] && (
                              <button
                                onClick={() => {
                                  setActiveLookbookBrand(brandKeys[product.name] as any);
                                  document.getElementById("lookbook")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors gap-1.5 cursor-pointer"
                              >
                                Ver Lookbook
                                <Sparkles className="h-4 w-4 animate-pulse" />
                              </button>
                            )}
                          </div>
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

        {/* Lookbook / Galeria de Modelos Section */}
        <section id="lookbook" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Editorial de Moda</span>
              <h2 className={`${displayFont.className} text-4xl sm:text-5xl font-bold mt-2 text-foreground`}>
                Galeria de Estilos
              </h2>
              <p className="mt-4 text-foreground/80 leading-relaxed text-base">
                Explore o lookbook das nossas marcas de luxo. Veja como nossas armações vestem no rosto e encontre a inspiração perfeita para o seu visual.
              </p>
            </div>

            {/* Brand tabs selector */}
            <div className="flex flex-wrap justify-center gap-2 mt-10 md:gap-4 border-b border-border/40 pb-6">
              {Object.entries(brandLookbooks).map(([key, value]) => {
                const label = key === "lanca-perfume" ? "Lança Perfume"
                            : key === "michael-kors" ? "Michael Kors"
                            : key === "versace" ? "Versace"
                            : "Vogue";
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveLookbookBrand(key as any);
                      setVisibleCount(8); // Reset visible count when switching brand
                    }}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                      activeLookbookBrand === key
                        ? "bg-primary text-primary-foreground shadow-md scale-105"
                        : "bg-card border border-border text-foreground hover:bg-accent/20"
                    }`}
                  >
                    {label} ({value.length})
                  </button>
                );
              })}
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
              {brandLookbooks[activeLookbookBrand].slice(0, visibleCount).map((imgName, index) => {
                const imgPath = `/images/${activeLookbookBrand}/${imgName}`;
                const brandLabel = activeLookbookBrand === "lanca-perfume" ? "Lança Perfume"
                                 : activeLookbookBrand === "michael-kors" ? "Michael Kors"
                                 : activeLookbookBrand === "versace" ? "Versace"
                                 : "Vogue";
                
                return (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-xl aspect-[3/4] group border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => setActiveLightboxImg(imgPath)}
                  >
                    <Image
                      src={imgPath}
                      alt={`Modelo vestindo ${brandLabel}`}
                      width={600}
                      height={800}
                      quality={90}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Hover overlay with action */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <div className="text-white text-xs font-medium tracking-wide uppercase opacity-90 mb-1">
                        {brandLabel}
                      </div>
                      <div className="text-white text-[10px] opacity-75 mb-3 font-mono">
                        Ref: {imgName.split("-")[1].replace(".jpg", "")}
                      </div>
                      <a
                        href={`https://wa.me/5584999999999?text=Olá! Gostaria de saber mais sobre a armação que a modelo está usando na foto ${imgName} da marca ${brandLabel} no Lookbook.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // Prevent lightbox from opening when clicking the link
                        className="w-full py-2 bg-secondary text-secondary-foreground text-center rounded-lg text-xs font-semibold hover:bg-secondary/90 transition-all flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Perguntar no WhatsApp
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            {brandLookbooks[activeLookbookBrand].length > visibleCount && (
              <div className="flex justify-center mt-12">
                <Button
                  onClick={() => setVisibleCount(prev => prev + 8)}
                  variant="outline"
                  className="border-border text-foreground hover:bg-accent/20 px-8 cursor-pointer"
                >
                  Ver mais fotos
                </Button>
              </div>
            )}
            
            {visibleCount > 8 && brandLookbooks[activeLookbookBrand].length <= visibleCount && (
              <div className="flex justify-center mt-12">
                <Button
                  onClick={() => setVisibleCount(8)}
                  variant="outline"
                  className="border-border text-foreground hover:bg-accent/20 px-8 cursor-pointer"
                >
                  Mostrar menos
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Watches Section */}
        <section id="relogios" className="py-16 sm:py-24 bg-background border-t border-b border-border/40">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 flex flex-col justify-center order-2 md:order-1">
                <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Alta Relojoaria</span>
                <h2 className={`${displayFont.className} text-4xl sm:text-5xl font-bold mt-2 leading-tight text-foreground`}>
                  Relógios Exclusivos
                </h2>
                <p className="mt-6 text-foreground/80 leading-relaxed text-base max-w-[60ch]">
                  Além do cuidado especializado com a sua saúde visual, a Ótica Gracinha oferece uma seleção primorosa de relógios de marcas renomadas em nossa loja.
                </p>
                <p className="mt-4 text-foreground/80 leading-relaxed text-base max-w-[60ch]">
                  Visite-nos para conhecer modelos masculinos e femininos de alta durabilidade e designs que variam do clássico ao esportivo. O acessório perfeito para complementar sua sofisticação diária.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all shadow-md cursor-pointer">
                    <a
                      href="https://wa.me/5584999999999?text=Olá! Gostaria de saber mais sobre as opções de relógios disponíveis na Ótica Gracinha."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Consultar Marcas e Modelos no WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
              <div className="md:col-span-5 order-1 md:order-2">
                <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-square group border border-border/50">
                  <Image
                    src="/images/relogios-showcase.png"
                    alt="Relógios premium em exposição na Ótica Gracinha"
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </div>
            </div>
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
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4 sm:px-6">
            <div>
              <h2 className={`${displayFont.className} text-3xl sm:text-4xl md:text-4xl font-bold`}>Tradição e cuidado em cada detalhe</h2>
              <p className="mt-4 text-foreground/80 max-w-[60ch] leading-relaxed">
                Desde 1988, a Ótica Gracinha é referência em Lagoa Nova, combinando a tradição de um atendimento familiar com a busca constante por inovação. Nossa missão é oferecer mais do que óculos, é proporcionar uma nova perspectiva de vida.
              </p>
              <p className="mt-4 text-foreground/80 max-w-[60ch] leading-relaxed">
                Acreditamos que cada cliente é único. Por isso, nossa equipe de especialistas se dedica a encontrar a solução perfeita para sua visão e estilo, com um acervo de armações selecionadas das melhores marcas.
              </p>
              <Button size="lg" className="mt-8">Conheça nossa história</Button>
            </div>
            <div className="w-full">
              <Image
                src="/images/about_interior.png"
                alt="Interior da Ótica Gracinha"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto mt-6 md:mt-0 object-cover"
                loading="lazy"
              />
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
                style={{ border: 0 }}
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
      <SchedulingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Lightbox Modal */}
      {activeLightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div className="relative max-w-4xl w-full h-[85vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute -top-12 right-0 text-white hover:text-secondary transition-colors cursor-pointer p-2 bg-white/10 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative max-h-[70vh] w-full flex justify-center">
              <Image
                src={activeLightboxImg}
                alt="Visualização do lookbook"
                unoptimized
                className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl"
                priority
              />
            </div>
            
            {/* Action inside Lightbox */}
            <div className="mt-6 text-center text-white">
              <p className="text-sm opacity-85 mb-4">
                Gostou deste modelo? Converse conosco no WhatsApp para consultar valores e disponibilidade.
              </p>
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all shadow-md cursor-pointer">
                <a
                  href={`https://wa.me/5584999999999?text=Olá! Gostaria de mais informações sobre o modelo que vi no Lookbook: ${activeLightboxImg.substring(activeLightboxImg.lastIndexOf("/") + 1)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Consultar sobre esta armação
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}