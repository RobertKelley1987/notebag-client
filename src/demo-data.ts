import { Note, Tag } from "./types";

export const demoTags: Tag[] = [
  { id: "1", name: "Food" },
  { id: "2", name: "Work" },
  { id: "3", name: "Gym" },
  { id: "4", name: "Music" },
  { id: "5", name: "Family" },
];

export const demoNotes: Note[] = [
  {
    id: "1",
    title: "Chipotle",
    content:
      "Vegan items: Guacamole, brown rice, all salsas, black beans, pinto beans, lettuce.",
    pinned: false,
    tags: [{ id: "1", name: "Food" }],
  },
  {
    id: "2",
    title: "Taco Bell",
    content: "Vegan items: Fresco crunch wrap supreme, fresco bean burrito.",
    pinned: false,
    tags: [{ id: "1", name: "Food" }],
  },
  {
    id: "3",
    title: "Rice and Beans Recipe",
    content:
      "1 clove garlic\n1 chopped onion\n2 cups dry black beans\n3 cups brown rice\n1 chopped green pepper\n1/2 cup hot sauce",
    pinned: false,
    tags: [{ id: "1", name: "Food" }],
  },
  {
    id: "4",
    title: "Father's day gift",
    content: "Tie\nRestaurant gift certificate\nNew grill",
    pinned: false,
    tags: [{ id: "5", name: "Family" }],
  },
  {
    id: "5",
    title: "Finn's dance recital",
    content: "Get Finn to the venue by 5 PM Friday. Remember to bring flowers.",
    pinned: false,
    tags: [{ id: "5", name: "Family" }],
  },
  {
    id: "6",
    title: "Saturday Dinner Ideas",
    content: "Sushi\nPizza\nIndian Food",
    pinned: false,
    tags: [{ id: "5", name: "Family" }],
  },
  {
    id: "7",
    title: "Pull Day",
    content:
      "Pullups - 3x15\nCable rows - 90 lbs - 3x10\nHammer curls - 30 lbs - 3x8",
    pinned: false,
    tags: [{ id: "3", name: "Gym" }],
  },
  {
    id: "8",
    title: "Push Day",
    content:
      "Bench press - 80 lbs - 3x15\nIncline dumbbell press - 40 lb dumbbells - 3x9",
    pinned: false,
    tags: [{ id: "3", name: "Gym" }],
  },
  {
    id: "9",
    title: "Leg Day",
    content:
      "Bulgarian split squats - 30 lb dumbbells - 3x10\nGoblet squats - 40 lb dumbbell - 3x10",
    pinned: false,
    tags: [{ id: "3", name: "Gym" }],
  },
  {
    id: "10",
    title: "Listening List",
    content:
      "Nails - Abandon All Life\nConverge - Jane Doe\nOneohtrix Point Never - Garden of Delete",
    pinned: false,
    tags: [{ id: "4", name: "Music" }],
  },
  {
    id: "11",
    title: "Band Name Ideas",
    content: "Sour Milk\nThe Sad Sundays\nRed Sabbath\nUsurper",
    pinned: false,
    tags: [{ id: "4", name: "Music" }],
  },
  {
    id: "12",
    title: "Band Practice Notes",
    content:
      "Work on drum fills for new song.\nAsk if Trey can play a guitar solo.",
    pinned: false,
    tags: [{ id: "4", name: "Music" }],
  },
  {
    id: "13",
    title: "Healthy Snacks for Work",
    content: "Trail mix\nGreek yogurt\nSalad bowl",
    pinned: false,
    tags: [{ id: "2", name: "Work" }],
  },
  {
    id: "14",
    title: "Office Party Theme Ideas",
    content: '"The Office"\nUnder the Sea\nWestern Saloon\nCostume Party',
    pinned: false,
    tags: [{ id: "2", name: "Work" }],
  },
];
