export const ACADEMIC_DATA = [
  {
    id: 1,
    name: "Engineering",
    departments: [
      {
        id: 101,
        name: "Computer Engineering",
        subjects: [
          {
            id: 201,
            name: "Full Stack Web",
            pages: [
              {
                id: 5001,
                title: "Introduction to React.js",
                content: `
      <h2>The Component-Based Library</h2>
      <p>React is a powerful JavaScript library for building user interfaces, specifically single-page applications. It's used for handling the view layer for web and mobile apps.</p>
      
      <h3>Key Features of React</h3>
      <ul>
        <li><strong>Declarative:</strong> React makes it painless to create interactive UIs. Design simple views for each state in your application.</li>
        <li><strong>Component-Based:</strong> Build encapsulated components that manage their own state, then compose them to make complex UIs.</li>
        <li><strong>Virtual DOM:</strong> React creates an in-memory data structure cache, which computes the resulting differences, and then updates the browser's displayed DOM efficiently.</li>
      </ul>

      <pre><code>// A simple React Component
function Welcome() {
  return &lt;h1&gt;Hello, World!&lt;/h1&gt;;
}</code></pre>

      <p>By breaking the UI into a <strong>component tree</strong>, React allows developers to build large-scale applications with data that changes over time without reloading the page.</p>
    `,
              },
              {
                id: 5002,
                title: "Mastering Tailwind CSS",
                content: `
      <h2>Utility-First Fundamentals</h2>
      <p>Tailwind CSS works by scanning all of your HTML files, JavaScript components, and other templates for class names, generating the corresponding styles and then writing them to a static CSS file.</p>
      
      <h3>Why choose Tailwind?</h3>
      <p>Unlike traditional CSS where you write custom rules, Tailwind provides thousands of tiny "utility" classes that you apply directly to your elements.</p>

      <pre><code>&lt;!-- Styled button in Tailwind --&gt;
&lt;button class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"&gt;
  Click Me
&lt;/button&gt;</code></pre>

      <h3>Core Benefits</h3>
      <ul>
        <li><strong>No more global CSS:</strong> You don't have to worry about changing a class name and breaking a different page.</li>
        <li><strong>Responsive Design:</strong> Use prefixes like <code>md:</code> or <code>lg:</code> to build complex layouts easily.</li>
        <li><strong>Consistency:</strong> Tailwind uses a predefined design system (colors, spacing, typography) so your UI stays uniform.</li>
      </ul>
    `,
              },
            ],
          },
        ],
      },
      {
        id: 102,
        name: "Mechanical Engineering",
        subjects: [
          {
            id: 202,
            name: "Thermodynamics",
            pages: [{ id: 5101, title: "First Law of Thermo", content: "..." }],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Medical Science",
    departments: [
      {
        id: 103,
        name: "Cardiology",
        subjects: [
          {
            id: 203,
            name: "Human Anatomy",
            pages: [
              { id: 6001, title: "The Circulatory System", content: "..." },
            ],
          },
        ],
      },
      {
        id: 104,
        name: "Neurology",
        subjects: [
          {
            id: 204,
            name: "Brain Functions",
            pages: [
              { id: 6101, title: "Synaptic Transmission", content: "..." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Commerce",
    departments: [
      {
        id: 105,
        name: "Accounting",
        subjects: [
          {
            id: 205,
            name: "Financial Auditing",
            pages: [{ id: 7001, title: "Balance Sheets 101", content: "..." }],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Legal Studies",
    departments: [
      {
        id: 106,
        name: "Corporate Law",
        subjects: [
          {
            id: 206,
            name: "Intellectual Property",
            pages: [{ id: 8001, title: "Patent Fundamentals", content: "..." }],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Architecture",
    departments: [
      {
        id: 107,
        name: "Urban Planning",
        subjects: [
          {
            id: 207,
            name: "Sustainable Design",
            pages: [
              { id: 8101, title: "Green Building Materials", content: "..." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Environmental Science",
    departments: [
      {
        id: 108,
        name: "Climatology",
        subjects: [
          {
            id: 208,
            name: "Renewable Energy",
            pages: [{ id: 8201, title: "Solar Photovoltaics", content: "..." }],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Space Science",
    departments: [
      {
        id: 109,
        name: "Astrophysics",
        subjects: [
          {
            id: 209,
            name: "Cosmology",
            pages: [{ id: 8301, title: "Black Hole Dynamics", content: "..." }],
          },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Psychology",
    departments: [
      {
        id: 110,
        name: "Cognitive Science",
        subjects: [
          {
            id: 210,
            name: "Behavioral Analysis",
            pages: [
              { id: 8401, title: "Classical Conditioning", content: "..." },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 9,
    name: "Digital Arts",
    departments: [
      {
        id: 111,
        name: "Graphic Design",
        subjects: [
          {
            id: 211,
            name: "UI/UX Principles",
            pages: [{ id: 8501, title: "Color Theory", content: "..." }],
          },
        ],
      },
    ],
  },
  {
    id: 10,
    name: "Business Management",
    departments: [
      {
        id: 112,
        name: "Human Resources",
        subjects: [
          {
            id: 212,
            name: "Organizational Behavior",
            pages: [{ id: 8601, title: "Leadership Styles", content: "..." }],
          },
        ],
      },
    ],
  },
];
