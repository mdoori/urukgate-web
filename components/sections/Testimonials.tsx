"use client";

import { ShieldCheck, Clock, MessageCircle, PoundSterling, Wrench, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: PoundSterling,
    title: "Transparent Pricing",
    description: "No hidden fees, no surprise invoices. You get a fixed price upfront before any work begins. What we quote is what you pay.",
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
  },
  {
    icon: MessageCircle,
    title: "Plain English, Always",
    description: "No jargon, no tech speak. We explain everything in simple terms so you always know exactly what you're getting and why.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Most websites are delivered in 2–4 weeks. We know your time is money, so we work quickly without cutting corners.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Wrench,
    title: "Built for Local Businesses",
    description: "We specialise in small and local businesses across the UK. We understand your customers, your market, and what actually works.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
  },
  {
    icon: ShieldCheck,
    title: "Support After Launch",
    description: "Every project includes free support after launch. If something breaks or you need a small change, we're here to help.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  {
    icon: TrendingUp,
    title: "Built to Get You Results",
    description: "A website isn't just a brochure — it should win you business. Everything we build is designed to generate enquiries and grow your revenue.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary-light font-medium mb-4"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Why Choose Us
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold mb-4"
          >
            Software That Works{" "}
            <span className="text-gradient">For You</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-muted text-lg max-w-xl mx-auto"
          >
            We&apos;re a small, focused team that cares about getting you real results —
            not just delivering a website and disappearing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 border border-border card-hover"
            >
              <div className={`w-11 h-11 rounded-xl ${reason.bg} border ${reason.border} flex items-center justify-center mb-4`}>
                <reason.icon className={`w-5 h-5 ${reason.color}`} />
              </div>
              <h3 className="font-bold text-lg mb-2">{reason.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
