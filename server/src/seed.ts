const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import { v4 as uuidv4 } from 'uuid';

async function main() {
  const recipes = [
    {
      id: uuidv4(),
      name: 'Pasta Carbonara',
      photoUrl: 'https://example.com/pasta-carbonara.jpg',
      description: 'A classic Italian dish made with spaghetti, pancetta, eggs, and cheese.',
      ingredients: ['spaghetti', 'pancetta', 'eggs', 'pecorino cheese'],
      cuisine: 'Italian',
      dietaryRestrictions: ['gluten-free']
    },
    {
      id: uuidv4(),
      name: 'Pad Thai',
      photoUrl: 'https://example.com/pad-thai.jpg',
      description: 'A popular Thai street food made with rice noodles, shrimp, tofu, peanuts, and bean sprouts.',
      ingredients: ['rice noodles', 'shrimp', 'tofu', 'peanuts', 'bean sprouts'],
      cuisine: 'Thai',
      dietaryRestrictions: ['vegetarian']
    },
    {
      id: uuidv4(),
      name: 'Chicken Tikka Masala',
      photoUrl: 'https://example.com/chicken-tikka-masala.jpg',
      description: 'A spicy Indian curry made with marinated chicken in a tomato-based sauce.',
      ingredients: ['chicken', 'tomatoes', 'yogurt', 'spices'],
      cuisine: 'Indian',
      dietaryRestrictions: ['dairy-free']
    },
    {
      id: uuidv4(),
      name: 'Sushi Rolls',
      photoUrl: 'https://example.com/sushi-rolls.jpg',
      description: 'A popular Japanese dish made with sushi rice, seaweed, and various fillings.',
      ingredients: ['sushi rice', 'nori seaweed', 'avocado', 'cucumber', 'crab meat'],
      cuisine: 'Japanese',
      dietaryRestrictions: ['gluten-free']
    },
    {
      id: uuidv4(),
      name: 'Beef Tacos',
      photoUrl: 'https://example.com/beef-tacos.jpg',
      description: 'A Mexican dish made with seasoned beef, tortillas, and various toppings.',
      ingredients: ['ground beef', 'tortillas', 'lettuce', 'tomatoes', 'cheese'],
      cuisine: 'Mexican',
      dietaryRestrictions: ['lactose-free']
    },
    { 
      id: uuidv4(),
      name: 'Roast Beef',
      photoUrl: 'https://example.com/roast-beef.jpg',
      description: 'A classic British dish made with roasted beef and vegetables.',
      ingredients: ['beef roast', 'potatoes', 'carrots', 'onions'],
      cuisine: 'British',
      dietaryRestrictions: []
    },
    {
      id: uuidv4(),
      name: 'Falafel Wrap',
      photoUrl: 'https://example.com/falafel-wrap.jpg',
      description: 'A Middle Eastern dish made with falafel balls, hummus, and vegetables wrapped in a pita.',
      ingredients: ['falafel balls', 'hummus', 'lettuce', 'tomatoes', 'cucumber'],
      cuisine: 'Middle Eastern',
      dietaryRestrictions: ['vegan']
    },
    {
      id: uuidv4(),
      name: 'Hamburger',
      photoUrl: 'https://example.com/hamburger.jpg',
      description: 'An American classic made with a beef patty, cheese, and various toppings on a bun.',
      ingredients: ['beef patty', 'cheddar cheese', 'lettuce', 'tomatoes', 'onions'],
      cuisine: 'American',
      dietaryRestrictions: ['gluten-free']
    },
    {
      id: uuidv4(),
      name: 'Kimchi Fried Rice',
      photoUrl: 'https://example.com/kimchi-fried-rice.jpg',
      description: 'A Korean dish made with fried rice, kimchi, and other vegetables.',
      ingredients: ['rice', 'kimchi', 'carrots', 'green onions'],
      cuisine: 'Korean',
      dietaryRestrictions: ['vegetarian']
    },
    {
      id: uuidv4(),
      name: 'Moussaka',
      photoUrl: 'https://example.com/moussaka.jpg',
      description: 'A Greek dish made with layers of eggplant, ground beef, and béchamel sauce.',
      ingredients: ['eggplant', 'ground beef', 'tomatoes', 'onions'],
      cuisine: 'Greek',
      dietaryRestrictions: []
    },
  ];

  for (const recipe of recipes) {
    await prisma.recipe.create({ data: {recipe} });
  }
}




main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
