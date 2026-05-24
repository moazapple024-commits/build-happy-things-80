import farrouj from "@/assets/farrouj.jpg";
import sandwiches from "@/assets/sandwiches.jpg";
import juices from "@/assets/juicesAR.jpg";
import lambChop from "@/assets/meal-lamb-chop.jpg";
import lambKebab from "@/assets/meal-lamb-kebab.jpg";
import friedRice from "@/assets/meal-fried-rice.jpg";
import jollofOnly from "@/assets/meal-jollof-only.jpg";
import burger from "@/assets/meal-burger.jpg";
import shawarma from "@/assets/meal-shawarma.jpg";
import brownieSundae from "@/assets/meal-brownie-sundae.jpg";
import dateCake from "@/assets/meal-date-cake.jpg";
import tiramisu from "@/assets/meal-tiramisu.jpg";
import pannaCotta from "@/assets/meal-panna-cotta.jpg";
import nativeRice from "@/assets/meal-native-rice.jpg";
import fufuEgusi from "@/assets/meal-fufu-egusi.jpg";
import ugaliNyama from "@/assets/meal-ugali-nyama.jpg";
import chickenBbq from "@/assets/meal-chicken-bbq.jpg";
import mandazi from "@/assets/meal-mandazi.jpg";
import spaghetti from "@/assets/meal-spaghetti.jpg";
import coffee from "@/assets/meal-coffee.jpg";
import friedGoat from "@/assets/meal-fried-goat.jpg";
import chickenKofta from "@/assets/meal-chicken-kofta.jpg";
import shishTawook from "@/assets/meal-shish-tawook.jpg";
import chickenBiryani from "@/assets/meal-chicken-biryani.jpg";
import mukimo from "@/assets/meal-mukimo.jpg";
import majboosLamb from "@/assets/meal-majboos-lamb.jpg";
import vermicelliRice from "@/assets/meal-vermicelli-rice.jpg";
import tabbouleh from "@/assets/meal-tabbouleh.jpg";
import greenSalad from "@/assets/meal-green-salad.jpg";
import fattoush from "@/assets/meal-fattoush.jpg";
import type { MenuItem } from "./cart";

export const MENU: MenuItem[] = [
  { id: "lamb-chop", name: "Lamb Chop", desc: "Grilled lamb chops served on a bed of fragrant yellow rice", price: 75, image: lambChop },
  { id: "lamb-kebab", name: "Lamb Kebab", desc: "Char-grilled lamb skewers with peppers, onions and basmati rice", price: 50, image: lambKebab },
  { id: "fufu-egusi", name: "Fufu / Egusi / Beef", desc: "Traditional fufu with rich egusi soup and tender beef", price: 45, image: fufuEgusi },
  { id: "ugali-nyama", name: "Ugali / Nyama Choma / Kachumbari", desc: "East-African grilled meat with ugali and fresh kachumbari salad", price: 40, image: ugaliNyama },
  { id: "fried-goat", name: "Fried Goat Meat", desc: "Crispy seasoned goat meat, slow-fried to perfection", price: 35, image: friedGoat },
  { id: "farrouj", name: "Grilled Farrouj", desc: "Golden chicken with our signature marinade, garlic & pickles", price: 35, image: farrouj },
  { id: "native-rice", name: "Native Rice", desc: "Authentic spiced native rice with smoked fish and herbs", price: 35, image: nativeRice },
  { id: "jollof", name: "Jollof Rice", desc: "Spicy West-African tomato rice, rich and aromatic", price: 30, image: jollofOnly },
  { id: "fried-rice", name: "Fried Rice", desc: "Wok-tossed rice with chicken, vegetables and soy", price: 30, image: friedRice },
  { id: "chicken-bbq", name: "Chicken BBQ", desc: "Smoky charcoal-grilled BBQ chicken with house glaze", price: 30, image: chickenBbq },
  { id: "chicken-kofta", name: "Chicken Kofta", desc: "Grilled chicken kofta skewers with fries and salad", price: 30, image: chickenKofta },
  { id: "burger", name: "Beef Burger", desc: "Juicy beef patty, cheddar, fresh greens and crispy fries", price: 30, image: burger },
  { id: "shish-tawook", name: "Shish Tawook", desc: "Marinated chicken cubes grilled with rice, fries and salad", price: 25, image: shishTawook },
  { id: "spaghetti", name: "Spaghetti Pomodoro", desc: "Classic Italian spaghetti in fresh tomato & basil sauce", price: 25, image: spaghetti },
  { id: "majboos-lamb", name: "Majboos & Lamb", desc: "Qatari spiced rice topped with slow-cooked tender lamb", price: 30, image: majboosLamb },
  { id: "mukimo", name: "Mukimo", desc: "Kenyan mashed greens, potatoes and beans with savoury stew", price: 25, image: mukimo },
  { id: "vermicelli-chicken", name: "Vermicelli Rice & Chicken", desc: "Toasted vermicelli rice with seasoned chicken strips and vegetables", price: 20, image: vermicelliRice },
  { id: "tabbouleh", name: "Tabbouleh Salad", desc: "Fresh parsley, bulgur, tomato and lemon-olive oil dressing", price: 20, image: tabbouleh },
  { id: "fattoush", name: "Fattoush Salad", desc: "Crisp greens, sumac dressing and toasted pita chips", price: 15, image: fattoush },
  { id: "green-salad", name: "Green Salad", desc: "Garden-fresh lettuce, tomato, cucumber and carrots", price: 15, image: greenSalad },
  { id: "chicken-biryani", name: "Chicken Biryani", desc: "Aromatic basmati biryani with tender spiced chicken", price: 15, image: chickenBiryani },
  { id: "shawarma", name: "Chicken Shawarma", desc: "Slow-roasted chicken wrap with garlic sauce and pickles", price: 15, image: shawarma },
  { id: "sandwiches", name: "Chef Sandwich", desc: "Fresh bread with a variety of premium fillings", price: 22, image: sandwiches },
  { id: "tiramisu", name: "Tiramisu Cake", desc: "Classic Italian layered dessert with coffee and mascarpone", price: 30, image: tiramisu },
  { id: "panna-cotta", name: "Panna Cotta", desc: "Silky Italian cream dessert with cherry compote", price: 25, image: pannaCotta },
  { id: "brownie-sundae", name: "Brownie Sundae", desc: "Warm brownie, vanilla ice cream, chocolate sauce & cherry", price: 20, image: brownieSundae },
  { id: "date-cake", name: "Date Cake", desc: "Moist date sponge cake topped with almond", price: 20, image: dateCake },
  { id: "mandazi", name: "Mandazi", desc: "East-African sweet fried dough, light and fluffy", price: 5, image: mandazi },
  { id: "juices", name: "Fresh Juice", desc: "Natural juices and refreshing mocktails", price: 15, image: juices },
  { id: "coffee", name: "Coffee", desc: "Freshly brewed coffee with delicate latte art", price: 10, image: coffee },
];
