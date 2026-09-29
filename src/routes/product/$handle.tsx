import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { CartDrawer } from "@/components/CartDrawer";

export const Route = createFileRoute("/product/$handle")({
  head: () => ({
    meta: [
      { title: "Product — Melissa's Cozy Crafts" },
      { name: "description", content: "Handmade crochet piece by Melissa's Cozy Crafts, made to order in Kenya." },
      { property: "og:title", content: "Product — Melissa's Cozy Crafts" },
      { property: "og:description", content: "Handmade crochet piece by Melissa's Cozy Crafts, made to order in Kenya." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { handle } = useParams({ from: "/product/$handle" });
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);

  const { data, isPending, error } = useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      const result = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return result?.data?.productByHandle as ShopifyProduct["node"] | null;
    },
  });

  const handleAddToCart = async () => {
    if (!data) return;
    const variant = data.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product: { node: data },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to your basket", { description: data.title });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to shop
          </Link>
          <CartDrawer />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        {isPending && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {error && <p className="py-24 text-center text-muted-foreground">Couldn't load this product. Please try again.</p>}
        {!isPending && !error && !data && (
          <p className="py-24 text-center text-muted-foreground">Product not found.</p>
        )}
        {data && (
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <div className="overflow-hidden rounded-3xl border border-border bg-card">
                <img
                  src={data.images.edges[selectedImage]?.node.url}
                  alt={data.images.edges[selectedImage]?.node.altText || data.title}
                  className="aspect-square w-full object-cover"
                />
              </div>
              {data.images.edges.length > 1 && (
                <div className="mt-4 flex gap-3">
                  {data.images.edges.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`h-20 w-20 overflow-hidden rounded-xl border-2 ${i === selectedImage ? "border-primary" : "border-border"}`}
                    >
                      <img src={img.node.url} alt={img.node.altText || data.title} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">{data.productType}</p>
              <h1 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">{data.title}</h1>
              <p className="mt-4 text-2xl font-bold text-foreground">
                {formatPrice(data.priceRange.minVariantPrice.amount, data.priceRange.minVariantPrice.currencyCode)}
              </p>
              <p className="mt-6 leading-relaxed text-muted-foreground">{data.description}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Every piece is handmade to order just for you — allow a few days for crafting before delivery.
              </p>
              <button
                onClick={handleAddToCart}
                disabled={isLoading || !data.variants.edges[0]?.node.availableForSale}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingBag className="h-4 w-4" />}
                Add to basket
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
