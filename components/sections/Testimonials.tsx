"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Dave Thornton",
    role: "Owner, Thornton Plumbing & Heating · Wolverhampton",
    quote:
      "I was getting all my work through word of mouth before. Since URUK Gate built my website I'm getting calls from people who just found me on Google. Best money I've spent on the business.",
    rating: 5,
    avatar: "DT",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    name: "Amir Rashid",
    role: "Manager, The Balti House · Birmingham",
    quote:
      "The online booking and digital menu have made a huge difference. Customers love being able to book a table from their phone. No more missed calls during busy service hours.",
    rating: 5,
    avatar: "AR",
    gradient: "from-primary to-violet-500",
  },
  {
    name: "Sharon Bates",
    role: "Director, TrustBuild Renovations · Coventry",
    quote:
      "We were sceptical about spending money on a website but it paid for itself within weeks. We're now fully booked and had to turn work away. Moath explained everything clearly, no tech jargon at all.",
    rating: 5,
    avatar: "SB",
    gradient: "from-accent to-cyan-400",
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
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-sm text-yellow-400 font-medium mb-4"
          >
            <Star className="w-3.5 h-3.5 fill-yellow-400" />
            Client Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold mb-4"
          >
            Trusted by{" "}
            <span className="text-gradient">Local Businesses</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-muted text-lg max-w-xl mx-auto"
          >
            From plumbers in Wolverhampton to restaurants in Birmingham,
            here&apos;s what our clients say.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass rounded-2xl p-6 border border-border card-hover relative"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />

              <p className="text-text-muted text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-text-muted text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
