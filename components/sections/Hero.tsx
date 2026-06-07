"use client";

import Link from "next/link";
import { ArrowRight, Play, Star, Users, Briefcase, Zap } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Briefcase, label: "Services Available", value: "6" },
  { icon: Users, label: "UK Based & Local", value: "100%" },
  { icon: Star, label: "Avg. Delivery Time", value: "3wk" },
  { icon: Zap, label: "Years Experience", value: "8+" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm text-primary-light font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Now accepting new clients. URUK Gate is open
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Your Gateway to{" "}
            <span className="text-gradient">Digital</span>
            <br />
            Growth
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-text-muted leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Midlands-based software developer helping local businesses get online
            and grow. Websites, booking systems, and mobile apps, explained clearly,
            delivered fast, priced fairly.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/book" className="btn-primary flex items-center gap-2 text-base px-8 py-3.5">
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services" className="btn-secondary flex items-center gap-2 text-base px-8 py-3.5">
              <Play className="w-4 h-4" />
              View Our Services
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-5 card-hover border border-border"
              >
                <stat.icon className="w-5 h-5 text-primary mb-3 mx-auto" />
                <div className="text-2xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-xs text-text-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
