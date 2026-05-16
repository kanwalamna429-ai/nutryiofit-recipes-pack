import { createFileRoute } from "@tanstack/react-router";

const categories = [
  { name: "Breakfast", img: "/images/recipes/breakfast.jpg" },
  { name: "Vegetarian", img: "/images/recipes/vegetarian.jpg" },
  { name: "Non-Veg", img: "/images/recipes/non-veg.jpg" },
  { name: "Soup", img: "/images/recipes/soup.jpg" },
  { name: "Salads & Sides", img: "/images/recipes/salads-sides.jpg" },
  { name: "Snacks & Dips", img: "/images/recipes/snacks-dips.jpg" },
  { name: "Beverage", img: "/images/recipes/beverage.jpg" },
  { name: "Dessert", img: "/images/recipes/dessert.jpg" },
  { name: "Baking", img: "/images/recipes/baking.jpg" },
  { name: "Diet-Specific", img: "/images/recipes/diet-specific.jpg" },
];

const featured = [
  "halal-butter-chicken.jpg",
  "halal-shakshuka.jpg",
  "halal-grilled-salmon.jpg",
  "halal-biryani.jpg",
  "halal-hummus.jpg",
  "halal-greek-salad.jpg",
  "halal-chicken-shawarma.jpg",
  "halal-tabbouleh.jpg",
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NutryioFit — Healthy Recipes" },
      { name: "description", content: "Browse 800+ healthy halal recipes across breakfast, mains, soups, salads, desserts and more." },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="text-2xl font-bold">NutryioFit</h1>
          <p className="text-sm text-muted-foreground">Healthy recipe library — preview</p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-xl font-semibold">Categories</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((c) => (
            <div key={c.name} className="overflow-hidden rounded-lg border bg-card">
              <img src={c.img} alt={c.name} loading="lazy" className="aspect-square w-full object-cover" />
              <div className="p-2 text-sm font-medium">{c.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="mb-4 text-xl font-semibold">Featured recipes</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {featured.map((f) => (
            <img
              key={f}
              src={`/images/recipes/${f}`}
              alt={f.replace(/^halal-|\.jpg$/g, "").replace(/-/g, " ")}
              loading="lazy"
              className="aspect-square w-full rounded-lg border object-cover"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
