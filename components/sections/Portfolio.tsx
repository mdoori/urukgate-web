"use client";

import Link from "next/link";
import { Globe, Smartphone, Wrench, UtensilsCrossed, ShoppingBag, LayoutDashboard, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const examples = [
  {
    icon: Wrench,
    title: "Tradespeople & Contractors",
    description: "Plumbers, electricians, builders, decorators. We build sites that win you local jobs — with quote forms, before/after galleries, and Gas Safe or NICEIC badge display.",
    tags: ["Quote request form", "Photo gallery", "Click-to-call", "Google Maps"],
    gradient: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants & Takeaways",
    description: "Digital menus, online table bookings, opening hours, and WhatsApp ordering — everything a local restaurant or café needs to grow.",
    tags: ["Digital menu", "Table booking", "WhatsApp ordering", "Google Reviews"],
    gradient: "from-red-500/20 to-rose-500/20",
    border: "border-red-500/20",
    iconColor: "text-red-400",
  },
  {
    icon: ShoppingBag,
    title: "Retail & Local Shops",
    description: "From product showcases to full online stores with inventory management and payment processing, all built to your budget.",
    tags: ["Product catalogue", "Online payments", "Stock management", "Promotions"],
    gradient: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: Globe,
    title: "Professional Services",
    description: "Solicitors, accountants, estate agents, consultants. A professional online presence that builds trust and generates enquiries 24/7.",
    tags: ["Appointment booking", "Case studies", "Team profiles", "Enquiry forms"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "If your business needs something beyond a website — a customer loyalty app, booking app, or staff management tool — we build it for iOS and Android.",
    tags: ["iOS & Android", "Push notifications", "User accounts", "Offline support"],
    gradient: "from-primary/20 to-violet-500/20",
    border: "border-primary/20",
    iconColor: "text-primary",
  },
  {
    icon: LayoutDashboard,
    title: "Business Dashboards",
    description: "Replace your spreadsheets with a custom dashboard built for how your business actually works — bookings, invoicing, stock, staff rota, and more.",
    tags: ["Custom reporting", "Booking management", "Invoice generation", "Staff tools"],
    gradient: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/20",
    iconColor: "text-green-400",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-background relative">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary-light font-medium mb-4"
          >
            <Globe className="w-3.5 h-3.5" />
            What We Build
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold mb-4"
          >
            Solutions for Every{" "}
            <span className="text-gradient">Local Business</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-muted text-lg max-w-xl mx-auto"
          >
            Whether you&apos;re a one-person trade or a growing local business, we build
            software that fits your needs and your budget.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass rounded-2xl p-6 border ${item.border} card-hover relative overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-30 rounded-2xl`} />

              <div className="relative z-10">
                <div className={`w-11 h-11 rounded-xl bg-surface-elevated border border-border flex items-center justify-center mb-4 ${item.iconColor}`}>
                  <item.icon className="w-5 h-5" />
                </div>

                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-surface-elevated border border-border text-xs text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-text-muted text-sm mb-4">
            Don&apos;t see your business type? We work with all kinds of local businesses.
          </p>
          <Link href="/book" className="btn-primary inline-flex items-center gap-2">
            Book a Free Call to Discuss Your Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
