import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Heart, Mail, Menu, Phone, Sparkles, X } from "lucide-react";
import { useState } from "react";
import blueSet from "@/assets/WhatsApp_Image_2026-08-27_at_7.43.16_PM_1.jpeg.asset.json";
import monochrome from "@/assets/WhatsApp_Image_2026-08-27_at_7.43.16_PM.jpeg.asset.json";
import wineTop from "@/assets/WhatsApp_Image_2026-08-27_at_7.43.15_PM.jpeg.asset.json";
import sunsetSet from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.38_PM_2.jpeg.asset.json";
import sunsetShorts from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.38_PM_3.jpeg.asset.json";
import cozyCardigan from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.39_PM.jpeg.asset.json";
import pinkPouch from "@/assets/WhatsApp_Image_2026-08-27_at_7.54.36_PM.jpeg.asset.json";
import hairBow from "@/assets/WhatsApp_Image_2026-08-27_at_7.54.37_PM.jpeg.asset.json";
import blackCardigan from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.35_PM.jpeg.asset.json";
import smileyKeychains from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.36_PM_3.jpeg.asset.json";
import lilacClutch from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.36_PM_4.jpeg.asset.json";
import blueSetFlatlay from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.36_PM_5.jpeg.asset.json";
import blossomCable from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.36_PM_7.jpeg.asset.json";
import blackBowPouch from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.37_PM.jpeg.asset.json";
import blackScallopedTop from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.38_PM.jpeg.asset.json";
import stripedShorts from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.37_PM_1.jpeg.asset.json";

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

const products = [
  { name: "Two-Piece Ocean Blue Set", category: "Apparel", description: "A vibrant two-piece set with striped shorts and a matching mesh halter top.", details: "Royal blue and sky blue stripes, an open loop-mesh torso, adjustable side ties and a soft white flower appliqué.", image: blueSetFlatlay.url },
  { name: "Ocean Blue Set — Styled", category: "Apparel", description: "The ocean blue set worn, showing the fit of the mesh bodice and striped shorts.", details: "A flower-detailed neckline, breezy loop mesh through the waist and comfortable high-waisted shorts.", image: blueSet.url },
  { name: "Ocean Blue Set — Close Up", category: "Apparel", description: "A closer look at the blue mesh bodice and flower detail.", details: "Hand-stitched white flower at the bust, striped bandeau band and open loop mesh through the body.", image: blueSet.url, position: "object-[50%_32%]" },
  { name: "Black & White Striped Mini Skirt Set", category: "Apparel", description: "A white lace halter top paired with a bold striped mini skirt.", details: "Openwork floral lace, a front tie, scalloped hem and a high-waisted black-and-white skirt.", image: monochrome.url },
  { name: "Burgundy Mesh Halter Top", category: "Apparel", description: "A deep wine-red halter bralette with an open lattice body.", details: "Ribbed sculpted cups, open lattice mesh and twisted adjustable neck ties.", image: wineTop.url },
  { name: "Black Mesh Shrug Top", category: "Apparel", description: "A cropped open-work black mesh top with long bell sleeves.", details: "Airy mesh stitch, a wide neckline and roomy bell sleeves—perfect for layering.", image: blackCardigan.url },
  { name: "Blue Striped High-Waist Shorts", category: "Apparel", description: "Royal and sky blue striped crochet shorts with tie details.", details: "Bold horizontal striping, an eyelet waistband with adjustable ties and a soft finish.", image: stripedShorts.url },
  { name: "Red & Orange Starfish Set", category: "Apparel", description: "A bright two-piece set with a scalloped halter and starfish shorts.", details: "Deep red with orange shell-stitch trim, a ribbed V-neck and matching appliquéd shorts.", image: sunsetSet.url },
  { name: "Red & Orange Starfish Shorts", category: "Apparel", description: "Bold red high-waisted crochet shorts with bright orange striping.", details: "A ribbed drawstring waistband, contrast bands and a hand-stitched starfish appliqué.", image: sunsetShorts.url },
  { name: "Rust & Cream Granny Square Cardigan", category: "Apparel", description: "A vintage-inspired granny square cardigan in warm rust and cream.", details: "Classic floral squares, long sleeves with ribbed cuffs and a relaxed fit.", image: cozyCardigan.url },
  { name: "Dark Chocolate Lace Halter Top", category: "Apparel", description: "A romantic dark lace halter with a scalloped edge.", details: "Delicate openwork shell stitch, a deep V neckline and front tie fastening.", image: blackScallopedTop.url },
  { name: "Black & Pink Bow Drawstring Pouch", category: "Accessories", description: "A sweet black drawstring pouch with pink bow details.", details: "A ruffled pink rim, functional cinch drawstring and two stitched bow appliqués.", image: blackBowPouch.url },
  { name: "Leaf Vine Cable Cover", category: "Tech Accessories", description: "A whimsical green vine wrap for charger cables—or a hanging garland.", details: "It wraps snugly along a charging cable with soft purple flower accents.", image: blossomCable.url },
  { name: "Purple Plaid Tablet / Laptop Sleeve", category: "Tech Accessories", description: "A padded crochet sleeve in a purple and lilac pattern.", details: "Thick cushioned yarn, a secure top flap and two round contrast buttons.", image: lilacClutch.url },
  { name: "Smiley Face Plush Keychains", category: "Accessories", description: "Cute little plush charms with hand-stitched expressions.", details: "Soft black plush rounds with pale blue embroidered faces on sturdy metal rings.", image: smileyKeychains.url },
  { name: "White Crochet Hair Bow", category: "Accessories", description: "A cloud-soft white crochet bow for everyday charm.", details: "A fluffy hand-stitched bow, sweet enough for casual days and dress-up moments.", image: hairBow.url, isNew: true },
  { name: "Pink Blossom Drawstring Pouch", category: "Accessories", description: "A bright pink drawstring pouch with olive ties and a leafy flourish.", details: "Vibrant crochet with an olive-green cinch tie, perfect for small treasures or gifting.", image: pinkPouch.url, isNew: true },
] as const;

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<Category>("All");
  const filtered = category === "All" ? products : products.filter((product) => product.category === category);
  const categories: Category[] = ["All", "Apparel", "Accessories", "Tech Accessories"];

  return (
    <main id="top" className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-3 font-display text-base font-semibold">
            <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"><Heart size={17} fill="currentColor" /></span>
            Melissa's Cozy Crafts
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <a href="#gallery" className="text-sm font-semibold text-muted-foreground hover:text-primary">Gallery</a>
            <a href="#contact" className="text-sm font-semibold text-muted-foreground hover:text-primary">Custom Orders</a>
            <a href="#contact" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-button)] hover:bg-primary-hover"><Mail size={15} /> Order Custom Piece</a>
          </nav>
          <button type="button" className="grid size-10 place-items-center rounded-full border border-border md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
        {menuOpen && <nav className="border-t border-border bg-background px-5 py-4 md:hidden" aria-label="Mobile navigation"><div className="mx-auto grid max-w-6xl gap-1">{[["Gallery", "#gallery"], ["Custom Orders", "#contact"]].map(([label, href]) => <a key={href} href={href} className="rounded-md px-3 py-3 font-semibold hover:bg-secondary" onClick={() => setMenuOpen(false)}>{label}</a>)}</div></nav>}
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
              <a href="#gallery" className="inline-flex min-h-12 items-center rounded-full border border-primary/40 bg-card px-6 text-sm font-bold text-primary hover:bg-secondary">Browse the gallery</a>
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
          <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Portfolio of handmade pieces</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">Each item is one-of-a-kind and can be remade in any colour scheme or size you like.</p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Filter collection">
          {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`min-h-10 rounded-full border px-5 text-xs font-bold transition-colors ${category === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-primary"}`}>{item}</button>)}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, index) => (
            <article key={product.name} className="stitch-card group flex flex-col overflow-hidden bg-card">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img src={product.image} alt={product.name} className={`h-full w-full object-cover ${("position" in product && product.position) || "object-center"} transition-transform duration-500 group-hover:scale-[1.025]`} loading={index < 3 ? "eager" : "lazy"} />
                <div className="absolute left-3 top-3 flex gap-2"><span className="rounded-full bg-card/95 px-3 py-1.5 text-[10px] font-extrabold text-primary shadow-sm">{product.category}</span>{product.isNew && <span className="rounded-full bg-primary px-3 py-1.5 text-[10px] font-extrabold text-primary-foreground shadow-sm">New</span>}</div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-semibold leading-7">{product.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
                <div className="my-4 border-t border-border/70" />
                <p className="text-xs leading-5 text-muted-foreground">{product.details}</p>
                <a href={`mailto:melissanyakure@gmail.com?subject=${encodeURIComponent(`Custom order: ${product.name}`)}`} className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-primary hover:text-primary-hover">Order this piece <ArrowRight size={15} /></a>
              </div>
            </article>
          ))}
        </div>
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