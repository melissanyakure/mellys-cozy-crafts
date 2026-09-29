import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Heart, Loader2, Mail, Menu, Phone, ShoppingBag, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import monochrome from "@/assets/WhatsApp_Image_2026-08-27_at_7.43.16_PM.jpeg.asset.json";
import { STOREFRONT_QUERY, storefrontApiRequest, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { CartDrawer } from "@/components/CartDrawer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Melissa's Cozy Crafts — Handmade Crochet" },
      { name: "description", content: "Handcrafted custom crochet apparel and accessories, made with care by Melissa Nyakure." },
      { property: "og:title", content: "Melissa's Cozy Crafts" },
      { property: "og:description", content: "Handcrafted, cozy, and custom crochet apparel and accessories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Category = "All" | "Apparel" | "Accessories" | "Tech Accessories";
const categories: Category[] = ["All", "Apparel", "Accessories", "Tech Accessories"];

function ProductCard({ product, index }: { product: ShopifyProduct; index: number }) {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to your basket", { description: node.title });
  };

  return (
    <article className="stitch-card group flex flex-col overflow-hidden bg-card">
      <Link to="/product/$handle" params={{ handle: node.handle }} className="relative block aspect-[4/3] overflow-hidden bg-muted">
        {image && (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]"
            loading={index < 3 ? "eager" : "lazy"}
          />
        )}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-card/95 px-3 py-1.5 text-[10px] font-extrabold text-primary shadow-sm">{node.productType}</span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link to="/product/$handle" params={{ handle: node.handle }}>
          <h3 className="font-display text-xl font-semibold leading-7 hover:text-primary">{node.title}</h3>
        </Link>
        <p className="mt-2 w-fit rounded-full bg-sunshine px-3 py-1.5 text-sm font-extrabold text-sunshine-foreground">
          {formatPrice(node.priceRange.minVariantPrice.amount, node.priceRange.minVariantPrice.currencyCode)}
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{node.description}</p>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isLoading || !variant?.availableForSale}
          className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-button)] transition-colors hover:bg-primary-hover disabled:opacity-50"
        >
          {isLoading ? <Loader2 size={15} className="animate-spin" /> : <ShoppingBag size={15} />}
          Add to basket
        </button>
      </div>
    </article>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<Category>("All");

  const { data: products, isPending } = useQuery({
    queryKey: ["shopify-products"],
    queryFn: async () => {
      const result = await storefrontApiRequest(STOREFRONT_QUERY, { first: 50 });
      return (result?.data?.products?.edges || []) as ShopifyProduct[];
    },
  });

  const filtered =
    category === "All" ? products || [] : (products || []).filter((p) => p.node.productType === category);

  return (
    <main id="top" className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-3 font-display text-base font-semibold">
            <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"><Heart size={17} fill="currentColor" /></span>
            Melissa's Cozy Crafts
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <a href="#gallery" className="text-sm font-semibold text-muted-foreground hover:text-primary">Shop</a>
            <a href="#contact" className="text-sm font-semibold text-muted-foreground hover:text-primary">Custom Orders</a>
            <a href="#contact" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-button)] hover:bg-primary-hover"><Mail size={15} /> Order Custom Piece</a>
            <CartDrawer />
          </nav>
          <div className="flex items-center gap-3 md:hidden">
            <CartDrawer />
            <button type="button" className="grid size-10 place-items-center rounded-full border border-border" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
        {menuOpen && <nav className="border-t border-border bg-background px-5 py-4 md:hidden" aria-label="Mobile navigation"><div className="mx-auto grid max-w-6xl gap-1">{[["Shop", "#gallery"], ["Custom Orders", "#contact"]].map(([label, href]) => <a key={href} href={href} className="rounded-md px-3 py-3 font-semibold hover:bg-secondary" onClick={() => setMenuOpen(false)}>{label}</a>)}</div></nav>}
      </header>

      <section className="relative overflow-hidden">
        <div className="hero-wash absolute inset-0" />
        <div className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-6xl items-center gap-14 px-5 py-16 md:grid-cols-[0.92fr_1.08fr] md:py-10">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-foreground"><Sparkles size={13} /> Made by hand, made for you</p>
            <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">Melissa's<br />Cozy Crafts</h1>
            <p className="mt-5 max-w-lg font-display text-lg italic leading-7 text-primary">Handcrafted, cozy, and custom crochet apparel &amp; accessories.</p>
            <p className="mt-6 max-w-lg text-[15px] leading-7 text-muted-foreground">Welcome in! Every piece here is looped stitch by stitch in my studio—wearable handmade art made in your colours, your size, your style. Browse the collection and let's make something just for you.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[var(--shadow-button)] hover:bg-primary-hover">Order Custom Piece <ArrowRight size={16} /></a>
              <a href="#gallery" className="inline-flex min-h-12 items-center rounded-full border border-primary/40 bg-card px-6 text-sm font-bold text-primary hover:bg-secondary">Shop the collection</a>
            </div>
          </div>
          <div className="hero-photo-frame relative mx-auto w-full max-w-[510px] p-2.5">
            <img src={monochrome.url} alt="Melissa modeling a white crochet lace top and striped skirt" className="aspect-[4/5] w-full rounded-[1.35rem] object-cover object-center" />
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">The collection</p>
          <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Shop handmade pieces</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">Each item is one-of-a-kind and can be remade in any colour scheme or size you like. Add to your basket and check out securely, or reach out for a custom order.</p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Filter collection">
          {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`min-h-10 rounded-full border px-5 text-xs font-bold transition-colors ${category === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-primary"}`}>{item}</button>)}
        </div>
        {isPending ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-24 text-center text-muted-foreground">No products found</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, index) => (
              <ProductCard key={product.node.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>

      <section id="contact" className="scroll-mt-20 px-5 pb-20 md:pb-24">
        <div className="contact-panel mx-auto max-w-6xl px-6 py-14 text-center sm:px-10 md:py-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Custom orders</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">Let's make something just for you</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground">Have a custom color scheme or size in mind? Reach out via email or WhatsApp to place your order!</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="mailto:melissanyakure@gmail.com" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary-hover"><Mail size={17} /> melissanyakure@gmail.com</a>
            <a href="https://wa.me/254115114169" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-primary/40 bg-card px-6 text-sm font-bold text-primary hover:bg-background"><Phone size={17} /> WhatsApp 0115114169</a>
          </div>
          <a href="tel:0115114169" className="mt-5 inline-block text-sm font-semibold text-muted-foreground hover:text-primary">Or call 0115114169</a>
        </div>
      </section>

      <footer className="border-t border-border/70 bg-secondary/60 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="font-display text-lg font-semibold">Melissa's Cozy Crafts</p>
          <p className="text-xs text-muted-foreground">Copyright © 2026 Melissa's Cozy Crafts. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
