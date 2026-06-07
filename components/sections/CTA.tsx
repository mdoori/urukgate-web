"use client";

import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl border border-primary/20 p-12 shadow-glow-primary"
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-primary mb-6">
            <CalendarCheck className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Ready to Transform
            <br />
            <span className="text-gradient">Your Business?</span>
          </h2>

          <p className="text-text-muted text-lg max-w-xl mx-auto mb-8">
            Book a free 30-minute discovery call. No hard sell, no obligation, just an
            honest conversation about what technology can do for your business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="btn-primary flex items-center gap-2 text-base px-8 py-3.5"
            >
              Book Your Free Call
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="mailto:hello@urukgate.co.uk"
              className="btn-secondary flex items-center gap-2 text-base px-8 py-3.5"
            >
              Send Us a Message
            </Link>
          </div>

          <p className="text-text-muted text-sm mt-6">
            Typically responds within 2 hours · Available Mon–Fri 9am–6pm
          </p>
        </motion.div>
      </div>
    </section>
  );
}
