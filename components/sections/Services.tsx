"use client";

import Link from "next/link";
import { Globe, Smartphone, Zap, Palette, Plug, MessageSquare, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/stripe";
import { formatCurrency } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  consultation: MessageSquare,
  "web-starter": Globe,
  "web-business": Globe,
  "mobile-app": Smartphone,
  automation: Zap,
  "full-platform": Palette,
};

const categoryColors: Record<string, string> = {
  consulting: "text-yellow-400 bg-yellow-400/10",
  web: "text-blue-400 bg-blue-400/10",
  mobile: "text-purple-400 bg-purple-400/10",
  automation: "text-green-400 bg-green-400/10",
  enterprise: "text-accent bg-accent/10",
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-background relative">
      <div className="absolute inset-0 dot-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary-light font-medium mb-4"
          >
            <Plug className="w-3.5 h-3.5" />
            What We Build
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold mb-4"
          >
            Services Built for{" "}
            <span className="text-gradient">Your Budget</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-muted text-lg max-w-2xl mx-auto"
          >
            Transparent pricing with no hidden fees. Every project starts with a free
            consultation to make sure we build exactly what you need.
          </motion.p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.id] || Globe;
            const colorClass = categoryColors[service.category] || "text-primary bg-primary/10";

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative glass rounded-2xl p-6 border card-hover flex flex-col ${
                  service.popular
                    ? "border-primary/50 shadow-glow-primary"
                    : "border-border"
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold shadow-glow-primary">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4 flex-grow">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-text-muted">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-4 mt-auto">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="text-xs text-text-muted mb-0.5">Starting from</div>
                      <div className="text-2xl font-bold text-text-primary">
                        {formatCurrency(service.price)}
                      </div>
                    </div>
                    <div className="text-xs text-text-muted text-right">
                      {service.duration}
                    </div>
                  </div>
                  <Link
                    href={`/book?service=${service.id}`}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      service.popular
                        ? "btn-primary"
                        : "btn-secondary"
                    }`}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-text-muted text-sm">
            Need something custom?{" "}
            <Link href="/book" className="text-primary hover:text-primary-light transition-colors font-medium">
              Let&apos;s talk about your project →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
