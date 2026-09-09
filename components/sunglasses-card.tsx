"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Cormorant_Garamond } from "next/font/google";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export interface SunglassesModel {
  id: string;
  brand: string;
  brandKey: string;
  modelName: string;
  category: "feminino" | "masculino" | "unissex" | string;
  tag?: string;
  description?: string;
  images: string[];
}

interface SunglassesCardProps {
  model: SunglassesModel;
  onImageClick?: (imageUrl: string, model: SunglassesModel) => void;
}

export function SunglassesCard({ model, onImageClick }: SunglassesCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const totalImages = model.images.length;
  const hasMultiple = totalImages > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setCurrentIdx(idx);
  };

  const activeImage = model.images[currentIdx] || model.images[0];

  const waMessage = `Olá! Gostaria de consultar a disponibilidade do óculos de sol da marca ${model.brand} (Ref: ${model.modelName}) que vi no site.`;

  return (
    <Card className="overflow-hidden h-full flex flex-col group hover:shadow-xl transition-all duration-300 border-border/60 bg-card rounded-2xl">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Image Container with Carousel */}
        <div
          className="relative aspect-[4/3] w-full bg-white flex items-center justify-center cursor-pointer overflow-hidden select-none border-b border-border/30"
          onClick={() => onImageClick?.(activeImage, model)}
        >
          {/* Main Image */}
          <div className="relative w-full h-full p-4 flex items-center justify-center">
            <Image
              src={activeImage}
              alt={`${model.brand} (Foto ${currentIdx + 1})`}
              width={600}
              height={450}
              quality={90}
              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          </div>

          {/* Photo Count Badge (if > 1) */}
          {hasMultiple && (
            <div className="absolute top-3 right-3 pointer-events-none z-10">
              <span className="text-[11px] font-medium bg-foreground/80 text-background backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                ✦ {currentIdx + 1}/{totalImages} fotos
              </span>
            </div>
          )}

          {/* Carousel Arrows (Hover/Touch) */}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Foto anterior"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/85 hover:bg-background text-foreground shadow-md border border-border/50 flex items-center justify-center opacity-80 md:opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 hover:scale-110 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Próxima foto"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/85 hover:bg-background text-foreground shadow-md border border-border/50 flex items-center justify-center opacity-80 md:opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 hover:scale-110 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots Pagination */}
              <div className="absolute bottom-2.5 left-0 right-0 flex items-center justify-center gap-1.5 z-20 pointer-events-auto">
                {model.images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => handleDotClick(e, idx)}
                    aria-label={`Ver foto ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      currentIdx === idx
                        ? "w-5 h-1.5 bg-secondary"
                        : "w-1.5 h-1.5 bg-foreground/30 hover:bg-foreground/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Card Body Info */}
        <div className="p-5 flex-1 flex flex-col justify-between bg-card">
          <div>
            <h4
              className={`${displayFont.className} text-2xl font-bold text-foreground group-hover:text-secondary transition-colors`}
            >
              {model.brand}
            </h4>
            <p className="text-xs text-muted-foreground font-medium mt-0.5 tracking-wider">
              {model.modelName}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-4 pt-3 border-t border-border/40">
            <a
              href={`https://wa.me/5584999191542?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full py-2.5 px-3 bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm group/btn"
            >
              <MessageCircle className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
              <span>Consultar no WhatsApp</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
