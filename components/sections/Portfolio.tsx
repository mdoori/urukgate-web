"use client";

import { ExternalLink, Globe, Smartphone, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Midland Heating Solutions",
    category: "Tradesperson Pro Website",
    location: "Wolverhampton, West Midlands",
    description:
      "A professional website for a local gas engineer and plumber. Includes an online quote request form, Gas Safe badge display, before & after photo gallery, and a click-to-call button.",
    tech: ["Next.js", "Tailwind CSS", "Supabase"],
    icon: Wrench,
    gradient: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/20",
    iconColor: "text-orange-400",
    result: "3x more quote requests in first month",
  },
  {
    title: "The Balti House",
    category: "Restaurant Package",
    location: "Birmingham, West Midlands",
    description:
      "Full digital presence for a popular Birmingham restaurant. Features a digital menu, online table booking system, WhatsApp ordering button, and Google Reviews integration.",
    tech: ["Next.js", "Stripe", "Supabase"],
    icon: Globe,
    gradient: "from-red-500/20 to-orange-500/20",
    border: "border-red-500/20",
    iconColor: "text-red-400",
    result: "60% of bookings now come online",
  },
  {
    title: "TrustBuild Renovations",
    category: "Tradesperson Pro Website",
    location: "Coventry, West Midlands",
    description:
      "Website for a home renovation and building company. Project portfolio gallery, online quote calculator, trade accreditation badges, and customer review showcase.",
    tech: ["React", "Node.js", "PostgreSQL"],
    icon: Smartphone,
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
    result: "Fully booked 6 weeks in advance",
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
            <ExternalLink className="w-3.5 h-3.5" />
            Our Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold mb-4"
          >
            Built for{" "}
            <span className="text-gradient">Midlands Businesses</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-muted text-lg max-w-xl mx-auto"
          >
            Real projects for local businesses just like yours, delivered on
            time, on budget, and with results that speak for themselves.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`glass rounded-2xl p-6 border ${project.border} card-hover relative overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30 rounded-2xl`} />

              <div className="relative z-10">
                <div className={`w-11 h-11 rounded-xl bg-surface-elevated border border-border flex items-center justify-center mb-4 ${project.iconColor}`}>
                  <project.icon className="w-5 h-5" />
                </div>

                <div className="text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
                  {project.category}
                </div>
                <div className="text-xs text-primary mb-2">{project.location}</div>
                <h3 className="font-bold text-xl mb-3">{project.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded-md bg-surface-elevated border border-border text-xs text-text-muted font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-elevated border border-border">
                  <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                  <span className="text-sm font-semibold text-green-400">{project.result}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-text-muted text-sm">
            Based in the Midlands · Serving local businesses across the UK ·{" "}
            <a href="/book" className="text-primary hover:text-primary-light transition-colors font-medium">
              Get a free quote →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
