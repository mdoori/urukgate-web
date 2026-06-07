"use client";

import { CalendarCheck, CreditCard, Video, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Book a Consultation",
    description:
      "Choose a service, pick a time that works for you, and fill in a brief about your business and goals.",
    color: "from-primary to-violet-500",
    shadowColor: "shadow-[0_0_30px_rgba(99,102,241,0.3)]",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Secure Your Slot",
    description:
      "Pay a small deposit online via Stripe. Your payment is protected and fully refundable if we're not the right fit.",
    color: "from-violet-500 to-accent",
    shadowColor: "shadow-[0_0_30px_rgba(139,92,246,0.3)]",
  },
  {
    number: "03",
    icon: Video,
    title: "Meet Online",
    description:
      "Join a Google Meet video call at your booked time. We'll dig into your needs and map out the perfect solution.",
    color: "from-accent to-cyan-400",
    shadowColor: "shadow-[0_0_30px_rgba(6,182,212,0.3)]",
  },
  {
    number: "04",
    icon: Rocket,
    title: "We Build & Launch",
    description:
      "We get to work on your project with regular updates and previews. You approve, we deploy.",
    color: "from-cyan-400 to-primary",
    shadowColor: "shadow-[0_0_30px_rgba(6,182,212,0.3)]",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-surface relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent font-medium mb-4"
          >
            <Rocket className="w-3.5 h-3.5" />
            The Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-bold mb-4"
          >
            From Idea to{" "}
            <span className="text-gradient">Live Product</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-muted text-lg max-w-xl mx-auto"
          >
            A straightforward process designed to get your software delivered on time and
            on budget.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
              )}

              {/* Icon */}
              <div
                className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${step.color} ${step.shadowColor} flex items-center justify-center mb-6 relative`}
              >
                <step.icon className="w-8 h-8 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-surface border border-border flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{step.number}</span>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-3">{step.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
