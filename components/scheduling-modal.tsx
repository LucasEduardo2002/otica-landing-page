"use client";

import React, { useState, useEffect } from "react";
import { X, MessageCircle, Calendar, User, Phone, Clock, ClipboardList, CheckCircle2 } from "lucide-react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Button } from "./ui/button";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SchedulingModal({ isOpen, onClose }: SchedulingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Exame de Vista");
  const [period, setPeriod] = useState("Manhã");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset state on open
      setIsSuccess(false);
      setIsSubmitting(false);
      setErrors({});
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Format phone number to (XX) XXXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    let formattedValue = "";

    if (rawValue.length === 0) {
      formattedValue = "";
    } else if (rawValue.length <= 2) {
      formattedValue = `(${rawValue}`;
    } else if (rawValue.length <= 6) {
      formattedValue = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2)}`;
    } else if (rawValue.length <= 10) {
      formattedValue = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 6)}-${rawValue.slice(6)}`;
    } else {
      formattedValue = `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 7)}-${rawValue.slice(7, 11)}`;
    }

    setPhone(formattedValue);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) {
      newErrors.name = "Por favor, digite seu nome completo.";
    }

    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
      newErrors.phone = "Por favor, insira um número de WhatsApp válido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate scheduling processing before sending to WhatsApp
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Construct WhatsApp message
      const textMessage = `Olá, Ótica Gracinha! Gostaria de confirmar um agendamento de visita pelo site:

Nome: ${name.trim()}
WhatsApp: ${phone}
Serviço: ${service}
Período preferencial: ${period}
${message.trim() ? `Mensagem: ${message.trim()}` : ""}`;

      const whatsappUrl = `https://wa.me/5584999191542?text=${encodeURIComponent(textMessage)}`;

      // Open WhatsApp in new tab after a brief success animation
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        onClose();
      }, 2000);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${bodyFont.className}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border/80 overflow-hidden transform transition-all duration-300 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Top Gradient Accent */}
        <div className="bg-gradient-to-r from-primary to-secondary h-1.5 w-full shrink-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted text-foreground/60 hover:text-foreground transition-colors cursor-pointer z-10"
          aria-label="Fechar modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-border/40 shrink-0">
              <h3 className={`${displayFont.className} text-3xl font-bold text-foreground flex items-center gap-2`}>
                Agende sua Visita
              </h3>
              <p className="text-sm text-foreground/70 mt-1 leading-relaxed">
                Preencha os dados abaixo e entraremos em contato rapidamente para confirmar seu horário.
              </p>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 py-4 space-y-5 overflow-y-auto flex-1 max-h-[55vh]">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-primary" /> Nome Completo
                </label>
                <input
                  type="text"
                  placeholder="Ex: Maria Souza da Silva"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all ${errors.name ? "border-destructive focus:ring-destructive/20" : "border-border"
                    }`}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-xs text-destructive font-medium">{errors.name}</p>
                )}
              </div>

              {/* WhatsApp Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-primary" /> WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="(84) 99999-9999"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`w-full px-4 py-2.5 rounded-lg border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all ${errors.phone ? "border-destructive focus:ring-destructive/20" : "border-border"
                    }`}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive font-medium">{errors.phone}</p>
                )}
              </div>

              {/* Service Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5">
                  <ClipboardList className="h-3.5 w-3.5 text-primary" /> Objetivo da Visita
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    "Exame de Vista",
                    "Armações e Lentes",
                    "Ajuste / Conserto",
                    "Outro Assunto",
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setService(item)}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-medium text-left transition-all duration-200 cursor-pointer ${service === item
                        ? "bg-primary/10 border-primary text-foreground shadow-sm font-semibold"
                        : "bg-background/40 border-border text-foreground/80 hover:bg-muted"
                        }`}
                      disabled={isSubmitting}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Period Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary" /> Período de Preferência
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "Manhã", label: "Manhã (08h às 12h)" },
                    { id: "Tarde", label: "Tarde (13h às 18h)" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPeriod(p.id)}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-medium text-left transition-all duration-200 cursor-pointer ${period === p.id
                        ? "bg-secondary/15 border-secondary text-foreground shadow-sm font-semibold"
                        : "bg-background/40 border-border text-foreground/80 hover:bg-muted"
                        }`}
                      disabled={isSubmitting}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
                  Mensagem Adicional (opcional)
                </label>
                <textarea
                  placeholder="Caso queira comentar sobre alguma dúvida ou receita médica..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border/40 shrink-0 space-y-3 bg-muted/20">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/20 active:scale-[0.98] transition-all duration-200 cursor-pointer text-sm"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <MessageCircle className="h-5 w-5 fill-white text-emerald-600" />
                    Confirmar no WhatsApp
                  </>
                )}
              </Button>
              <p className="text-[11px] text-foreground/50 text-center leading-normal">
                Ao clicar em confirmar, você abrirá o WhatsApp com sua mensagem pré-formatada.
                Sua visita só estará confirmada após o retorno da nossa equipe.
              </p>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div className="p-8 py-12 text-center flex flex-col items-center justify-center space-y-6 flex-1 min-h-[40vh] animate-in fade-in zoom-in-95 duration-300">
            <div className="h-20 w-20 bg-emerald-500/10 rounded-full flex items-center justify-center animate-bounce duration-1000">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 animate-pulse" />
            </div>
            <div className="space-y-2 max-w-[32ch]">
              <h3 className={`${displayFont.className} text-3xl font-bold text-foreground`}>
                Quase Pronto!
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Estamos abrindo seu WhatsApp para enviar os detalhes do agendamento para a Ótica Gracinha.
              </p>
            </div>
            <div className="w-full max-w-[200px] h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full animate-progress" style={{ width: '40%' }} />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs hover:bg-muted cursor-pointer"
            >
              Fechar Janela
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
