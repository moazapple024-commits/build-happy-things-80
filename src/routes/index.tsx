import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { MenuList } from "@/components/site/MenuList";
import { HallRental } from "@/components/site/HallRental";
import { CartBar } from "@/components/site/CartBar";
import { Reserve } from "@/components/site/Reserve";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Tobize Intercontinental Restaurant · Doha" },
      {
        name: "description",
        content:
          "Tobize Intercontinental Restaurant in Doha — order farrouj, sandwiches, desserts and fresh juices directly via WhatsApp.",
      },
      { property: "og:title", content: "Tobize Intercontinental Restaurant · Doha" },
      {
        property: "og:description",
        content: "Order your favorite food from Tobize Doha easily via WhatsApp.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative bg-background text-foreground">
      <Nav />
      <Hero />
      <MenuList />
      <HallRental />
      <Reserve />
      <Footer />
      <CartBar />
    </main>
  );
}
