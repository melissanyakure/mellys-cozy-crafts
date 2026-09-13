import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Heart, Mail, Menu, Phone, Sparkles, X } from "lucide-react";
import { type FormEvent, useState } from "react";
import { z } from "zod";
import { SiteButton } from "@/components/site-button";
import blueSet from "@/assets/WhatsApp_Image_2026-08-27_at_7.43.16_PM_1.jpeg.asset.json";
import blueMirror from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.38_PM_1.jpeg.asset.json";
import monochrome from "@/assets/WhatsApp_Image_2026-08-27_at_7.43.16_PM.jpeg.asset.json";
import wineTop from "@/assets/WhatsApp_Image_2026-08-27_at_7.43.15_PM.jpeg.asset.json";
import sunsetSet from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.38_PM_2.jpeg.asset.json";
import sunsetShorts from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.38_PM_3.jpeg.asset.json";
import cozyCardigan from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.39_PM.jpeg.asset.json";
import bowPouch from "@/assets/WhatsApp_Image_2026-08-27_at_7.54.36_PM.jpeg.asset.json";
import makerPortrait from "@/assets/WhatsApp_Image_2026-08-27_at_7.54.37_PM.jpeg.asset.json";
import blackCardigan from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.35_PM.jpeg.asset.json";
import smileyKeychains from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.36_PM_3.jpeg.asset.json";
import lilacClutch from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.36_PM_4.jpeg.asset.json";
import blueSetFlatlay from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.36_PM_5.jpeg.asset.json";
import blossomCable from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.36_PM_7.jpeg.asset.json";
import blackBowPouch from "@/assets/WhatsApp_Image_2026-08-27_at_7.32.37_PM.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Melissa's Cozy Crafts | Handmade Crochet" },
      { name: "description", content: "One-of-a-kind crochet clothing and accessories, lovingly handmade to order by Melissa Nyakure." },
      { property: "og:title", content: "Melissa's Cozy Crafts" },
      { property: "og:description", content: "Handmade with love, stitch by stitch. Explore Melissa's made-to-order crochet pieces." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const products = [
  { name: "Chunky Black Cropped Cardigan", description: "A cozy statement layer with oversized bell sleeves, a ribbed yoke, and a beautifully substantial texture.", materials: "Premium acrylic yarn", image: blackCardigan.url, position: "object-center" },
  { name: "Ocean Blue Halter Set", description: "A breezy two-piece with a flower-detailed halter, airy latticework, and soft striped shorts.", materials: "Soft cotton-blend yarn", image: blueSetFlatlay.url, position: "object-center" },
  { name: "Black Scalloped Crop Top", description: "A flattering deep-V silhouette, finished with a tie front and delicate scalloped edging.", materials: "Cotton-blend yarn", image: wineTop.url, position: "object-center" },
  { name: "Navy & Sky Blue Striped Shorts", description: "Bold, easygoing stripes meet a comfortable adjustable drawstring waist.", materials: "Soft acrylic yarn", image: blueMirror.url, position: "object-center" },
  { name: "Smiley Face Keychains", description: "Pocket-sized amigurumi friends, each stitched with its own sweet embroidered expression.", materials: "Cotton yarn & fiberfill", image: smileyKeychains.url, position: "object-center" },
  { name: "Sunset Starfish Shorts Set", description: "A fiery red-and-orange halter set made playful with a hand-stitched starfish appliqué.", materials: "Cotton-blend yarn", image: sunsetSet.url, position: "object-center" },
  { name: "Lilac Patchwork Clutch", description: "A softly structured purple-and-cream pouch with nostalgic patternwork and button closures.", materials: "Acrylic yarn & buttons", image: lilacClutch.url, position: "object-center" },
  { name: "Vine & Blossom Cable Cozy", description: "A charming leafy wrap dotted with purple blossoms to make everyday charging feel special.", materials: "Fine cotton yarn", image: blossomCable.url, position: "object-center" },
  { name: "Monochrome Stripe Skirt Set", description: "Graphic black-and-white stripes paired with a romantic openwork lace crop top.", materials: "Cotton-blend yarn", image: monochrome.url, position: "object-center" },
  { name: "Cream Lace Crop Top", description: "A delicate openwork floral top with a soft tie front—light, romantic, and easy to layer.", materials: "Fine cotton yarn", image: monochrome.url, position: "object-[50%_25%]" },
  { name: "Rust Granny-Square Cardigan", description: "Warm rust and cream motifs come together in a nostalgic, relaxed patchwork layer.", materials: "Soft acrylic yarn", image: cozyCardigan.url, position: "object-center" },
  { name: "Wine Ribbed Halter Top", description: "A rich maroon bralette with sculpted ribbing and adjustable twisted ties.", materials: "Cotton-blend yarn", image: wineTop.url, position: "object-center" },
  { name: "Bow Drawstring Pouch", description: "A petite handmade pouch finished with playful pink bows and a secure drawstring top.", materials: "Acrylic yarn", image: blackBowPouch.url, position: "object-center" },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  message: z.string().trim().min(10, "Tell Melissa a little more about what you would like.").max(1000),
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({});
    const subject = encodeURIComponent(`Crochet enquiry from ${result.data.name}`);
    const body = encodeURIComponent(`${result.data.message}\n\nFrom: ${result.data.name}\nEmail: ${result.data.email}`);
    window.location.href = `mailto:melissanyakure@gmail.com?subject=${subject}&body=${body}`;
  }

  const nav = [
    ["About", "#about"],
    ["Collection", "#collection"],
    ["Contact", "#contact"],
  ];

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 py-5 sm:px-8 lg:px-12">
          <a href="#top" className="min-w-0 font-display text-3xl font-bold text-primary-foreground">Melissa's Cozy Crafts</a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {nav.map(([label, href]) => <a key={href} href={href} className="text-sm font-bold text-primary-foreground/90 transition-colors hover:text-primary-foreground">{label}</a>)}
          </nav>
          <button type="button" className="grid size-11 place-items-center rounded-full border border-primary-foreground/40 text-primary-foreground md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && <nav className="mx-5 grid gap-1 rounded-md bg-background p-3 shadow-xl md:hidden" aria-label="Mobile navigation">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded px-4 py-3 font-bold text-foreground hover:bg-secondary">{label}</a>)}</nav>}
      </header>

      <section id="top" className="relative min-h-[92svh] bg-surface-deep">
        <img src={blueSet.url} alt="Melissa wearing a handmade blue crochet halter and shorts set" className="absolute inset-0 h-full w-full object-cover object-[50%_34%] opacity-80" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--surface-deep)_94%,transparent)_0%,color-mix(in_oklab,var(--surface-deep)_63%,transparent)_52%,color-mix(in_oklab,var(--surface-deep)_20%,transparent)_100%)]" />
        <div className="relative mx-auto flex min-h-[92svh] max-w-7xl items-end px-5 pb-16 pt-32 sm:px-8 md:items-center md:pb-0 lg:px-12">
          <div className="max-w-2xl text-primary-foreground">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]"><Sparkles size={15} /> Made by hand in Nairobi</p>
            <h1 className="font-display text-6xl font-bold leading-[0.88] sm:text-7xl lg:text-8xl">Handmade with love,<br /><span className="text-surface-warm">stitch by stitch.</span></h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-primary-foreground/85 sm:text-lg">One-of-a-kind crochet wearables and little treasures, thoughtfully made to order by Melissa.</p>
            <a href="#collection" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-7 py-3 font-bold text-primary-foreground shadow-[var(--shadow-button)] transition-colors hover:bg-primary-hover">Explore the collection <ArrowDown size={18} /></a>
          </div>
        </div>
      </section>

      <section id="about" className="paper-texture px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-3 rotate-2 border stitched-line" />
            <img src={makerPortrait.url} alt="Melissa, the crochet artist behind Cozy Crafts" className="relative aspect-[4/5] w-full rounded-md object-cover object-[center_30%]" loading="lazy" />
            <div className="absolute -bottom-5 -right-3 rotate-[-4deg] rounded-sm bg-secondary px-5 py-3 font-display text-2xl font-bold text-secondary-foreground shadow-md">Made by Melissa ♡</div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Meet the maker</p>
            <h2 className="mt-3 font-display text-5xl font-bold leading-none sm:text-6xl">A little joy in every loop.</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">Hi, I’m Melissa—a self-taught crochet artist who loves turning yarn into pieces full of personality. Every top, set, and tiny accessory is made slowly and thoughtfully by hand.</p>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">Because each piece is made to order, we can talk about your favorite colors, fit, and finishing touches to create something that feels truly yours.</p>
            <div className="mt-7 flex items-center gap-3 font-display text-3xl font-semibold text-primary"><Heart size={22} fill="currentColor" /> Unique, personal, yours.</div>
          </div>
        </div>
      </section>

      <section id="collection" className="border-y border-border bg-card px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">The collection</p>
              <h2 className="mt-2 font-display text-5xl font-bold sm:text-6xl">Made to be loved.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">See something you love? Ask about colors, sizing, and your own custom details.</p>
          </div>
          <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <article key={product.name} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
                  <img src={product.image} alt={product.name} className={`h-full w-full ${product.position} object-cover transition-transform duration-500 group-hover:scale-[1.025]`} loading={index < 3 ? "eager" : "lazy"} />
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground backdrop-blur-sm">Made to order</span>
                </div>
                <div className="pt-5">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                    <h3 className="min-w-0 font-display text-3xl font-bold leading-none">{product.name}</h3>
                    <a href={`mailto:melissanyakure@gmail.com?subject=${encodeURIComponent(`Enquiry: ${product.name}`)}`} className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-primary transition-colors hover:bg-secondary" aria-label={`Ask about ${product.name}`}><ArrowUpRight size={18} /></a>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-primary">{product.materials}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="paper-texture px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Let’s make something</p>
            <h2 className="mt-2 font-display text-5xl font-bold leading-none sm:text-6xl">Your dream piece starts here.</h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">Tell me what caught your eye, your preferred colors, and your size. I’ll get back to you to plan the details.</p>
            <div className="mt-8 grid gap-4 text-sm font-semibold">
              <a href="mailto:melissanyakure@gmail.com" className="flex items-center gap-3 hover:text-primary"><Mail className="text-primary" size={19} /> melissanyakure@gmail.com</a>
              <a href="tel:0115114169" className="flex items-center gap-3 hover:text-primary"><Phone className="text-primary" size={19} /> 0115 114 169</a>
            </div>
          </div>
          <form onSubmit={submitContact} className="grid gap-5 rounded-md border border-border bg-card p-6 shadow-sm sm:p-8" noValidate>
            <label className="grid gap-2 text-sm font-bold">Your name<input name="name" maxLength={100} className="min-h-12 rounded-md border border-input bg-background px-4 font-normal outline-none transition-shadow focus:ring-2 focus:ring-ring" placeholder="Jane Doe" />{errors["name"] && <span className="text-xs font-medium text-destructive">{errors["name"]}</span>}</label>
            <label className="grid gap-2 text-sm font-bold">Email address<input name="email" type="email" maxLength={255} className="min-h-12 rounded-md border border-input bg-background px-4 font-normal outline-none transition-shadow focus:ring-2 focus:ring-ring" placeholder="jane@example.com" />{errors["email"] && <span className="text-xs font-medium text-destructive">{errors["email"]}</span>}</label>
            <label className="grid gap-2 text-sm font-bold">What would you love?<textarea name="message" maxLength={1000} rows={5} className="resize-y rounded-md border border-input bg-background px-4 py-3 font-normal outline-none transition-shadow focus:ring-2 focus:ring-ring" placeholder="I’d love the Ocean Blue Halter Set in..." />{errors["message"] && <span className="text-xs font-medium text-destructive">{errors["message"]}</span>}</label>
            <SiteButton type="submit" className="w-full sm:w-fit">Send my enquiry <ArrowUpRight size={17} /></SiteButton>
          </form>
        </div>
      </section>

      <footer className="bg-surface-deep px-5 py-8 text-primary-foreground sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="font-display text-2xl font-bold">Melissa's Cozy Crafts</p>
          <p className="text-xs text-primary-foreground/70">Handmade with patience, joy & lots of yarn.</p>
        </div>
      </footer>
    </main>
  );
}
