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
import glassesData from "./glasses_data.json";

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
    name: "Reserva",
    note: "O DNA criativo e autêntico da grife carioca traduzido em óculos de grau e de sol. Combina o estilo de vida urbano e descontraído da marca com o design clássico contemporâneo, oferecendo leveza, conforto e armações duráveis de alta qualidade.",
    image: "/images/reserva.png",
    category: "masculino",
    features: ["DNA Carioca & Autêntico", "Estilo de Vida Urbano", "Leveza e Alta Resistência"]
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


const brandKeys: Record<string, string> = {
  "Lança Perfume": "lanca-perfume",
  "Michael Kors": "michael-kors",
  "Ray-Ban": "rayban",
  "Reserva": "reserva",
  "Versace": "versace",
  "Vogue": "vogue"
};

const watchesData = {
  condor: [
    { name: "Relógio Condor Casual", image: "/images/relogios/condor-01.jpg", ref: "CONDOR(1)" },
    { name: "Relógio Condor Elegante", image: "/images/relogios/condor-02.jpg", ref: "CONDOR(2)" },
    { name: "Relógio Condor Classic", image: "/images/relogios/condor-03.jpg", ref: "CONDOR" },
    { name: "Relógio Condor C02035NCP_K4X", image: "/images/relogios/c02035ncp_k4x.jpg", ref: "C02035NCP_K4X" },
    { name: "Relógio Condor CO2035NAR_K4K", image: "/images/relogios/co2035nar_k4k.jpg", ref: "CO2035NAR_K4K" },
    { name: "Relógio Condor CO2035NBI_K4J", image: "/images/relogios/co2035nbi_k4j.jpg", ref: "CO2035NBI_K4J" },
    { name: "Relógio Condor CO2035NIQ_K4J", image: "/images/relogios/co2035niq_k4j.jpg", ref: "CO2035NIQ_K4J" },
    { name: "Relógio Condor CO2035NJQ_K4X(1)", image: "/images/relogios/co2035njq_k4x_1.jpg", ref: "CO2035NJQ_K4X(1)" },
    { name: "Relógio Condor CO2035NJQ_K4X", image: "/images/relogios/co2035njq_k4x.jpg", ref: "CO2035NJQ_K4X" },
    { name: "Relógio Condor CO2035NLJ_K4P", image: "/images/relogios/co2035nlj_k4p.jpg", ref: "CO2035NLJ_K4P" },
    { name: "Relógio Condor CO2035NOK_K4J", image: "/images/relogios/co2035nok_k4j.jpg", ref: "CO2035NOK_K4J" },
    { name: "Relógio Condor CO2035NUM_5X", image: "/images/relogios/co2035num_5x.jpg", ref: "CO2035NUM_5X" },
    { name: "Relógio Condor CO2035NUS_5K(1)", image: "/images/relogios/co2035nus_5k_1.jpg", ref: "CO2035NUS_5K(1)" },
    { name: "Relógio Condor CO2035NUS_5K", image: "/images/relogios/co2035nus_5k.jpg", ref: "CO2035NUS_5K" },
    { name: "Relógio Condor CO2035NVP_5K(1)", image: "/images/relogios/co2035nvp_5k_1.jpg", ref: "CO2035NVP_5K(1)" },
    { name: "Relógio Condor CO2035NVP_5K", image: "/images/relogios/co2035nvp_5k.jpg", ref: "CO2035NVP_5K" },
    { name: "Relógio Condor CO2035NXR_K4K", image: "/images/relogios/co2035nxr_k4k.jpg", ref: "CO2035NXR_K4K" },
    { name: "Relógio Condor CO2035NYU_5K", image: "/images/relogios/co2035nyu_5k.jpg", ref: "CO2035NYU_5K" },
    { name: "Relógio Condor CO2035NZM_K4X", image: "/images/relogios/co2035nzm_k4x.jpg", ref: "CO2035NZM_K4X" },
    { name: "Relógio Condor CO2035OAY_K4X", image: "/images/relogios/co2035oay_k4x.jpg", ref: "CO2035OAY_K4X" },
    { name: "Relógio Condor COJHS512BAB_4D", image: "/images/relogios/cojhs512bab_4d.jpg", ref: "COJHS512BAB_4D" },
    { name: "Relógio Condor COJHS512BAD_4K", image: "/images/relogios/cojhs512bad_4k.jpg", ref: "COJHS512BAD_4K" },
  ],
  technos: [
    { name: "Relógio Technos Executive", image: "/images/relogios/technos-04.jpg", ref: "TECHNOS(1)" },
    { name: "Relógio Technos Classic", image: "/images/relogios/technos-05.jpg", ref: "TECHNOS(2)" },
    { name: "Relógio Technos Sport", image: "/images/relogios/technos-06.jpg", ref: "TECHNOS(3)" },
    { name: "Relógio Technos Gold", image: "/images/relogios/technos-07.jpg", ref: "TECHNOS(4)" },
    { name: "Relógio Technos Diamond", image: "/images/relogios/technos-08.jpg", ref: "TECHNOS(5)" },
    { name: "Relógio Technos Legacy", image: "/images/relogios/technos-09.jpg", ref: "TECHNOS(6)" },
    { name: "Relógio Technos Elegance", image: "/images/relogios/technos-10.jpg", ref: "TECHNOS(7)" },
    { name: "Relógio Technos Slim", image: "/images/relogios/technos-11.jpg", ref: "TECHNOS(8)" },
    { name: "Relógio Technos Chronograph", image: "/images/relogios/technos-12.jpg", ref: "TECHNOS(9)" },
    { name: "Relógio Technos Casual", image: "/images/relogios/technos-13.jpg", ref: "TECHNOS(10)" },
    { name: "Relógio Technos Automatic", image: "/images/relogios/technos-14.jpg", ref: "TECHNOS(11)" },
    { name: "Relógio Technos Vintage", image: "/images/relogios/technos-15.jpg", ref: "TECHNOS(12)" },
    { name: "Relógio Technos Unique", image: "/images/relogios/technos-16.jpg", ref: "TECHNOS" },
    { name: "Relógio Technos 1L22WM_1X", image: "/images/relogios/1l22wm_1x.jpg", ref: "1L22WM_1X" },
    { name: "Relógio Technos 2015CEM_1X", image: "/images/relogios/2015cem_1x.jpg", ref: "2015CEM_1X" },
    { name: "Relógio Technos 2025LVB_1X", image: "/images/relogios/2025lvb_1x.jpg", ref: "2025LVB_1X" },
    { name: "Relógio Technos 2035 MTP_1X", image: "/images/relogios/2035_mtp_1x.jpg", ref: "2035 MTP_1X" },
    { name: "Relógio Technos 2035MWJ_1X", image: "/images/relogios/2035mwj_1x.jpg", ref: "2035MWJ_1X" },
    { name: "Relógio Technos 2035MXP_1D", image: "/images/relogios/2035mxp_1d.jpg", ref: "2035MXP_1D" },
    { name: "Relógio Technos 2035NBP_1K", image: "/images/relogios/2035nbp_1k.jpg", ref: "2035NBP_1K" },
    { name: "Relógio Technos 2035NCT_1P(1)", image: "/images/relogios/2035nct_1p_1.jpg", ref: "2035NCT_1P(1)" },
    { name: "Relógio Technos 2035NCT_1P", image: "/images/relogios/2035nct_1p.jpg", ref: "2035NCT_1P" },
    { name: "Relógio Technos 2035NET_1D", image: "/images/relogios/2035net_1d.jpg", ref: "2035NET_1D" },
    { name: "Relógio Technos 2035NFD_1K", image: "/images/relogios/2035nfd_1k.jpg", ref: "2035NFD_1K" },
    { name: "Relógio Technos 2036MQN_1X", image: "/images/relogios/2036mqn_1x.jpg", ref: "2036MQN_1X" },
    { name: "Relógio Technos 2115KNV_1P", image: "/images/relogios/2115knv_1p.jpg", ref: "2115KNV_1P" },
    { name: "Relógio Technos 2115LALS_0P", image: "/images/relogios/2115lals_0p.jpg", ref: "2115LALS_0P" },
    { name: "Relógio Technos 2115LAQ_2M", image: "/images/relogios/2115laq_2m.jpg", ref: "2115LAQ_2M" },
    { name: "Relógio Technos 2115MPN_4K", image: "/images/relogios/2115mpn_4k.jpg", ref: "2115MPN_4K" },
    { name: "Relógio Technos 2115UAP_0X", image: "/images/relogios/2115uap_0x.jpg", ref: "2115UAP_0X" },
    { name: "Relógio Technos 5Y0IP_4X", image: "/images/relogios/5y0ip_4x.jpg", ref: "5Y0IP_4X" },
    { name: "Relógio Technos 5Y20IV_1X", image: "/images/relogios/5y20iv_1x.jpg", ref: "5Y20IV_1X" },
    { name: "Relógio Technos GL22A0_1P", image: "/images/relogios/gl22a0_1p.jpg", ref: "GL22A0_1P" },
    { name: "Relógio Technos GL22AA_1P", image: "/images/relogios/gl22aa_1p.jpg", ref: "GL22AA_1P" },
    { name: "Relógio Technos GM12AG_1P", image: "/images/relogios/gm12ag_1p.jpg", ref: "GM12AG_1P" },
    { name: "Relógio Technos L5Y20LX_1P", image: "/images/relogios/l5y20lx_1p.jpg", ref: "L5Y20LX_1P" },
  ],
};

function Header({ onOpenModal }: { onOpenModal: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <a href="#" className="flex items-center gap-2">
          <Image src={logoOtica} alt="Ótica Gracinha Logo" width={56} height={56} className="rounded-full object-cover" />
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
  const [activeLookbookBrand, setActiveLookbookBrand] = useState<"lanca-perfume" | "michael-kors" | "rayban" | "reserva" | "versace" | "vogue">("lanca-perfume");
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeWatchBrand, setActiveWatchBrand] = useState<"todos" | "technos" | "condor">("todos");
  const [visibleWatchesCount, setVisibleWatchesCount] = useState(8);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

  const filteredProducts = selectedCategory === "todos"
    ? productCards
    : productCards.filter((product) => product.category === selectedCategory);

  const filteredWatches = activeWatchBrand === "todos"
    ? [...watchesData.condor, ...watchesData.technos]
    : activeWatchBrand === "technos"
      ? watchesData.technos
      : watchesData.condor;

  const activeModels = glassesData.filter((item) => item.key === activeLookbookBrand);

  return (
    <div className={`${bodyFont.className} bg-background text-foreground`}>
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="pt-20">
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
          className="relative h-[65vh] sm:h-[75vh] flex items-center justify-center text-center text-white md:hidden"
          style={{ backgroundImage: "url('/images/hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center 20%' }}
        >
          <div className="absolute inset-0 bg-black/25" />
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
                              href={`https://wa.me/5584999191542?text=Olá! Gostaria de consultar os modelos disponíveis da marca ${product.name} na Ótica Gracinha.`}
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
                                Ver Galeria
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
                Explore a galeria de estilos das nossas marcas de luxo. Veja como nossas armações vestem no rosto e encontre a inspiração perfeita para o seu visual.
              </p>
            </div>

            {/* Brand tabs selector */}
            <div className="flex flex-wrap justify-center gap-2 mt-10 md:gap-4 border-b border-border/40 pb-6">
              {[
                { key: "lanca-perfume", label: "Lança Perfume" },
                { key: "michael-kors", label: "Michael Kors" },
                { key: "rayban", label: "Ray-Ban" },
                { key: "reserva", label: "Reserva" },
                { key: "versace", label: "Versace" },
                { key: "vogue", label: "Vogue" },
              ].map((brandItem) => {
                const count = glassesData.filter((item) => item.key === brandItem.key).length;
                return (
                  <button
                    key={brandItem.key}
                    onClick={() => {
                      setActiveLookbookBrand(brandItem.key as any);
                      setVisibleCount(8); // Reset visible count when switching brand
                    }}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                      activeLookbookBrand === brandItem.key
                        ? "bg-primary text-primary-foreground shadow-md scale-105"
                        : "bg-card border border-border text-foreground hover:bg-accent/20"
                    }`}
                  >
                    {brandItem.label} ({count})
                  </button>
                );
              })}
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
              {activeModels.slice(0, visibleCount).map((item, index) => {
                return (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-xl aspect-[3/4] group border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 bg-card flex flex-col cursor-pointer"
                    onClick={() => setActiveLightboxImg(item.image)}
                  >
                    <Image
                      src={item.image}
                      alt={`${item.brand} ${item.modelName}`}
                      width={600}
                      height={800}
                      quality={90}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Hover overlay with action */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none z-10">
                      <div className="text-white text-xs font-medium tracking-wide uppercase opacity-90 mb-1">
                        {item.brand}
                      </div>
                      <div className="text-white text-[10px] opacity-75 mb-3 font-mono">
                        Ref: {item.modelName}
                      </div>
                      <a
                        href={`https://wa.me/5584999191542?text=Olá! Gostaria de saber mais sobre a armação da marca ${item.brand} (Ref: ${item.modelName}) que vi no site.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // Prevent lightbox from opening when clicking the link
                        className="w-full py-2 bg-secondary text-secondary-foreground text-center rounded-lg text-xs font-semibold hover:bg-secondary/90 transition-all flex items-center justify-center gap-1.5 pointer-events-auto"
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
            {activeModels.length > visibleCount && (
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

            {visibleCount > 8 && activeModels.length <= visibleCount && (
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
                      href="https://wa.me/5584999191542?text=Olá! Gostaria de saber mais sobre as opções de relógios disponíveis na Ótica Gracinha."
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

            {/* Galeria de Relógios */}
            <div className="mt-16 pt-12 border-t border-border/40">
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Coleção de Luxo</span>
                <h3 className={`${displayFont.className} text-3xl sm:text-4xl font-bold mt-2 text-foreground`}>
                  Galeria de Relógios
                </h3>
                <p className="mt-4 text-foreground/80 leading-relaxed text-base">
                  Explore nossa variedade de relógios masculinos e femininos das renomadas marcas Technos e Condor. Encontre o design ideal para você e consulte a disponibilidade.
                </p>
              </div>

              {/* Brand Tabs for Watches */}
              <div className="flex flex-wrap justify-center gap-2 mt-10 md:gap-4 border-b border-border/40 pb-6">
                {(["todos", "technos", "condor"] as const).map((brand) => {
                  const label = brand === "todos" ? "Todos os Modelos"
                    : brand === "technos" ? "Technos"
                      : "Condor";
                  const count = brand === "todos" ? (watchesData.condor.length + watchesData.technos.length)
                    : brand === "technos" ? watchesData.technos.length
                      : watchesData.condor.length;
                  return (
                    <button
                      key={brand}
                      onClick={() => {
                        setActiveWatchBrand(brand);
                        setVisibleWatchesCount(8);
                      }}
                      className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${activeWatchBrand === brand
                          ? "bg-primary text-primary-foreground shadow-md scale-105"
                          : "bg-card border border-border text-foreground hover:bg-accent/20"
                        }`}
                    >
                      {label} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Watches Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
                {filteredWatches.slice(0, visibleWatchesCount).map((watch, index) => {
                  const brandLabel = watch.name.includes("Condor") ? "Condor" : "Technos";
                  return (
                    <div
                      key={index}
                      className="relative overflow-hidden rounded-xl aspect-[3/4] group border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-card"
                      onClick={() => setActiveLightboxImg(watch.image)}
                    >
                      <Image
                        src={watch.image}
                        alt={watch.name}
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
                          Ref: {watch.ref}
                        </div>
                        <a
                          href={`https://wa.me/5584999191542?text=Olá! Gostaria de saber mais sobre o relógio ${brandLabel} (Ref: ${watch.ref}) que vi na galeria de relógios do site.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()} // Prevent lightbox from opening when clicking the link
                          className="w-full py-2 bg-secondary text-secondary-foreground text-center rounded-lg text-xs font-semibold hover:bg-secondary/90 transition-all flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          Consultar no WhatsApp
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More Button for Watches */}
              {filteredWatches.length > visibleWatchesCount && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={() => setVisibleWatchesCount(prev => prev + 8)}
                    variant="outline"
                    className="border-border text-foreground hover:bg-accent/20 px-8 cursor-pointer"
                  >
                    Ver mais relógios
                  </Button>
                </div>
              )}
              {visibleWatchesCount > 8 && filteredWatches.length <= visibleWatchesCount && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={() => setVisibleWatchesCount(8)}
                    variant="outline"
                    className="border-border text-foreground hover:bg-accent/20 px-8 cursor-pointer"
                  >
                    Mostrar menos
                  </Button>
                </div>
              )}
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
                src={"https://www.google.com/maps?q=Av.+Dr.+Silvio+Bezerra+de+Melo,+15+-+Centro,+Lagoa+Nova+-+RN,+59390-000&output=embed"}
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
            <p className="text-background/70 mt-2">Av. Dr. Silvio Bezerra de Melo, 15</p>
            <p className="text-background/70">Centro, Lagoa Nova - RN - 59390-000</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">Contato</h4>
            <p className="text-background/70 mt-2"> (84) 99919-1542</p>
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
                alt="Visualização da galeria"
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
                {(() => {
                  const isWatch = activeLightboxImg.includes("/relogios/");
                  const fileName = activeLightboxImg.substring(activeLightboxImg.lastIndexOf("/") + 1);
                  const cleanName = fileName.replace(/_\d+\.jpg$/, "").replace(/\.jpg$/, "");
                  
                  const brand = activeLightboxImg.includes("/relogios/")
                    ? (fileName.startsWith("condor") ? "Condor" : "Technos")
                    : activeLightboxImg.includes("/colecao/lanca-perfume/") ? "Lança Perfume"
                    : activeLightboxImg.includes("/colecao/michael-kors/") ? "Michael Kors"
                    : activeLightboxImg.includes("/colecao/rayban/") ? "Ray-Ban"
                    : activeLightboxImg.includes("/colecao/reserva/") ? "Reserva"
                    : activeLightboxImg.includes("/colecao/versace/") ? "Versace"
                    : activeLightboxImg.includes("/colecao/vogue/") ? "Vogue"
                    : "";

                  const textProduct = isWatch ? "relógio" : "modelo";
                  const buttonLabel = isWatch ? "Consultar sobre este relógio" : "Consultar sobre esta armação";
                  
                  const waText = brand 
                    ? `Olá! Gostaria de mais informações sobre o ${textProduct} da marca ${brand} (Ref: ${cleanName}) que vi no site.`
                    : `Olá! Gostaria de mais informações sobre o modelo que vi na Galeria: ${fileName}.`;

                  return (
                    <a
                      href={`https://wa.me/5584999191542?text=${encodeURIComponent(waText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      {buttonLabel}
                    </a>
                  );
                })()}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}