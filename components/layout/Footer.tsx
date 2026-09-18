import Link from "next/link";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import UrukLogoIcon from "@/components/ui/UrukLogoIcon";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <UrukLogoIcon size={36} />
              <span className="font-bold text-lg">
                URUK<span className="text-gradient"> Gate</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-sm">
              Your gateway to digital growth. We build professional websites and mobile
              apps for small and local businesses across the UK.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <span
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-text-muted"
              >
                <Instagram className="w-4 h-4" />
              </span>
              <span
                aria-label="X (formerly Twitter)"
                className="w-9 h-9 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-text-muted"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Services</h3>
            <ul className="space-y-3">
              {[
                "Starter Website",
                "Business Website",
                "Mobile App",
                "Business Automation",
                "Strategy Consultation",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-text-muted">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:hello@urukgate.co.uk" className="hover:text-text-primary transition-colors">
                  hello@urukgate.co.uk
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-muted">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+447777667621" className="hover:text-text-primary transition-colors">
                  +44 7777 667 621
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-muted">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>United Kingdom</span>
              </li>
            </ul>
            <Link
              href="/book"
              className="inline-block mt-6 btn-primary text-sm"
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} URUK Gate. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-text-muted hover:text-text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-text-muted hover:text-text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
