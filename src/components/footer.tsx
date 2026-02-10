import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <span className="text-xl font-bold tracking-tight">
                Pixel Perfect
              </span>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed max-w-xs">
              Curated premium tech for people who notice the details.
              Every pixel matters.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Social icons */}
              {["X", "IG", "YT"].map((s) => (
                <span
                  key={s}
                  className="h-9 w-9 rounded-full border border-background/20 flex items-center justify-center text-xs font-medium text-background/60 hover:text-background hover:border-background/50 transition-colors cursor-pointer"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5 text-background/40">
              Shop
            </h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li>
                <Link
                  href="/#products"
                  className="hover:text-background transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/#featured"
                  className="hover:text-background transition-colors"
                >
                  Featured
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-background transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-background transition-colors"
                >
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5 text-background/40">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-background/60">
              <li>
                <Link
                  href="/"
                  className="hover:text-background transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-background transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-background transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-background transition-colors"
                >
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest mb-5 text-background/40">
              Stay in the loop
            </h4>
            <p className="text-sm text-background/60 mb-4">
              Get early access to new drops and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 h-10 bg-background/10 border border-background/20 rounded-l-lg px-3 text-sm text-background placeholder:text-background/40 focus:outline-none focus:border-background/50 transition-colors"
              />
              <button className="h-10 px-5 bg-background text-foreground text-sm font-medium rounded-r-lg hover:bg-background/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            &copy; 2026 Pixel Perfect. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-background/40">
            <Link
              href="/"
              className="hover:text-background/70 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/"
              className="hover:text-background/70 transition-colors"
            >
              Terms
            </Link>
            <span className="flex items-center gap-1.5">
              Secured by
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
              </svg>
              Stripe
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
