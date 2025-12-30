export const questions = [
  {
    id: 1,
    question: "Which activity do you enjoy the most?",
    options: [
      { text: "Drawing", emoji: "🎨", type: "creative" },
      { text: "Solving puzzles", emoji: "🧩", type: "logical" },
      { text: "Playing outside", emoji: "⚽", type: "social" },
      { text: "Reading stories", emoji: "📖", type: "nature" },
    ],
  },

  {
    id: 2,
    question: "What do you like to watch?",
    options: [
      { text: "Cartoons", emoji: "📺", type: "creative" },
      { text: "Science videos", emoji: "🔬", type: "logical" },
      { text: "Art videos", emoji: "🖌️", type: "creative" },
      { text: "Animal videos", emoji: "🐼", type: "nature" },
    ],
  },

  {
    id: 3,
    question: "How do you like to learn?",
    options: [
      { text: "By doing", emoji: "🛠️", type: "logical" },
      { text: "By watching", emoji: "👀", type: "creative" },
      { text: "By listening", emoji: "🎧", type: "social" },
      { text: "By reading", emoji: "📚", type: "nature" },
    ],
  },

  {
    id: 4,
    question: "What do you enjoy building?",
    options: [
      { text: "Blocks / LEGO", emoji: "🧱", type: "logical" },
      { text: "Craft items", emoji: "✂️", type: "creative" },
      { text: "Nothing", emoji: "🙂", type: "social" },
      { text: "Anything new", emoji: "💡", type: "creative" },
    ],
  },

  {
    id: 5,
    question: "Which subject do you like the most?",
    options: [
      { text: "Math", emoji: "➗", type: "logical" },
      { text: "Art", emoji: "🎨", type: "creative" },
      { text: "Science", emoji: "🔭", type: "logical" },
      { text: "Storytelling", emoji: "📖", type: "social" },
    ],
  },

  {
    id: 6,
    question: "What makes you happy?",
    options: [
      { text: "Solving puzzles", emoji: "🧩", type: "logical" },
      { text: "Drawing", emoji: "🖍️", type: "creative" },
      { text: "Helping friends", emoji: "🤝", type: "social" },
      { text: "Playing sports", emoji: "🏃‍♂️", type: "social" },
    ],
  },

  {
    id: 7,
    question: "Which toy do you like more?",
    options: [
      { text: "Robot", emoji: "🤖", type: "logical" },
      { text: "Crayons", emoji: "🖍️", type: "creative" },
      { text: "Ball", emoji: "⚽", type: "social" },
      { text: "Books", emoji: "📚", type: "nature" },
    ],
  },

  {
    id: 8,
    question: "How do you solve a problem?",
    options: [
      { text: "Think hard", emoji: "🤔", type: "logical" },
      { text: "Ask someone", emoji: "🗣️", type: "social" },
      { text: "Try again", emoji: "🔄", type: "logical" },
      { text: "Find new ideas", emoji: "💡", type: "creative" },
    ],
  },

  {
    id: 9,
    question: "Do you like asking questions?",
    options: [
      { text: "Yes, a lot!", emoji: "❓", type: "logical" },
      { text: "Sometimes", emoji: "🙂", type: "social" },
      { text: "Rarely", emoji: "😌", type: "nature" },
      { text: "No", emoji: "🙅‍♂️", type: "nature" },
    ],
  },

  {
    id: 10,
    question: "Which game do you enjoy?",
    options: [
      { text: "Memory games", emoji: "🧠", type: "logical" },
      { text: "Drawing games", emoji: "🎨", type: "creative" },
      { text: "Team games", emoji: "👥", type: "social" },
      { text: "Building games", emoji: "🧱", type: "logical" },
    ],
  },

  {
    id: 11,
    question: "What do you like reading?",
    options: [
      { text: "Science facts", emoji: "🔬", type: "logical" },
      { text: "Stories", emoji: "📖", type: "social" },
      { text: "Comics", emoji: "🦸", type: "creative" },
      { text: "Picture books", emoji: "🖼️", type: "nature" },
    ],
  },

  {
    id: 12,
    question: "Which describes you?",
    options: [
      { text: "Curious", emoji: "🧐", type: "logical" },
      { text: "Creative", emoji: "🎨", type: "creative" },
      { text: "Active", emoji: "🏃‍♀️", type: "social" },
      { text: "Calm", emoji: "😌", type: "nature" },
    ],
  },

  {
    id: 13,
    question: "What do you do in free time?",
    options: [
      { text: "Learn new things", emoji: "📘", type: "logical" },
      { text: "Draw", emoji: "🖍️", type: "creative" },
      { text: "Play with friends", emoji: "🤝", type: "social" },
      { text: "Explore things", emoji: "🔍", type: "nature" },
    ],
  },

  {
    id: 14,
    question: "Which place do you like visiting?",
    options: [
      { text: "Science museum", emoji: "🔭", type: "logical" },
      { text: "Art gallery", emoji: "🖼️", type: "creative" },
      { text: "Park", emoji: "🌳", type: "nature" },
      { text: "Library", emoji: "📚", type: "social" },
    ],
  },

  {
    id: 15,
    question: "What job sounds fun?",
    options: [
      { text: "Scientist", emoji: "🧪", type: "logical" },
      { text: "Artist", emoji: "🎨", type: "creative" },
      { text: "Sports player", emoji: "⚽", type: "social" },
      { text: "Teacher", emoji: "👩‍🏫", type: "social" },
    ],
  },
];

export const resultsMap = {
  creative: {
    type: "creative",
    emoji: "🎨",
    title: "Creative Artist",
    description:
      "You love expressing ideas through art and imagination!",
    subjects: ["Art", "Craft", "English", "Drama"],
    activities: ["Drawing", "Crafting", "Painting", "Digital art"],
  },

  logical: {
    type: "logical",
    emoji: "🧠",
    title: "Logical Thinker",
    description: "You enjoy solving puzzles and understanding how things work!",
    subjects: ["Math", "Science", "Computers"],
    activities: ["Puzzles", "Experiments", "Model Building", "Logic Games"],
  },

  social: {
    type: "social",
    emoji: "🤝",
    title: "Social Helper",
    description: "You love teamwork, communication, and helping others!",
    subjects: ["English", "Social Studies", "Communication"],
    activities: ["Team games", "Helping friends", "Storytelling", "Group tasks"],
  },

  nature: {
    type: "nature",
    emoji: "🌿",
    title: "Nature Explorer",
    description: "You enjoy nature, animals, and exploring the outdoors!",
    subjects: ["EVS", "Biology", "Geography"],
    activities: ["Nature walks", "Animal observation", "Exploring outdoors"],
  },
};