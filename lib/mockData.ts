// mockData.ts

import { NetworkEdge, NetworkNode, Post, User } from "@/types/app.types";

/**
 * Current logged-in user with complete profile information
 */
export const currentUser: User = {
  id: "user-001",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/avatars/john.jpg",
  bio: "Senate.City enthusiast and early adopter. Passionate about connecting with others through meaningful conversations.",
  subtitle: "Product Manager at TechCorp",
  role: "user",
  createdAt: "2024-11-15T08:30:00Z",
};

/**
 * Array of all platform users including the current user
 */
export const users: User[] = [
  currentUser,
  {
    id: "user-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "/avatars/jane.jpg",
    bio: "Political science researcher focusing on digital democracy and civic engagement platforms.",
    subtitle: "Researcher at Democracy Lab",
    role: "user",
    createdAt: "2024-12-03T14:20:00Z",
  },
  {
    id: "user-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    bio: "Interests include public policy, urban planning, and community building through technology.",
    subtitle: "City Council Member",
    role: "user",
    createdAt: "2025-01-12T09:45:00Z",
  },
  {
    id: "user-004",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    avatar: "/avatars/maria.jpg",
    bio: "Working on initiatives to increase civic participation through digital platforms.",
    subtitle: "Civic Tech Advocate",
    role: "user",
    createdAt: "2025-01-20T11:10:00Z",
  },
  {
    id: "user-005",
    name: "David Chen",
    email: "david.chen@example.com",
    bio: "Software engineer interested in building tools for better governance and community engagement.",
    subtitle: "Senior Developer at GovTech",
    role: "user",
    createdAt: "2025-02-05T16:30:00Z",
  },
  {
    id: "user-006",
    name: "Sarah Jones",
    email: "sarah.jones@example.com",
    avatar: "/avatars/sarah.jpg",
    bio: "Passionate about creating inclusive digital spaces for civic discourse.",
    subtitle: "Community Manager",
    role: "user",
    createdAt: "2025-02-18T10:15:00Z",
  },
  {
    id: "user-007",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    bio: "Exploring the intersection of technology and democratic participation.",
    subtitle: "Digital Strategy Consultant",
    role: "user",
    createdAt: "2025-03-01T13:40:00Z",
  },
  {
    id: "user-008",
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    avatar: "/avatars/lisa.jpg",
    bio: "Focused on making governance more accessible through user-friendly platforms.",
    subtitle: "UX Designer",
    role: "user",
    createdAt: "2025-03-15T09:20:00Z",
  },
  {
    id: "user-009",
    name: "Alex Rodriguez",
    email: "alex.rodriguez@example.com",
    avatar: "/avatars/alex.jpg",
    bio: "Data scientist analyzing patterns in civic engagement and participation.",
    subtitle: "Data Analytics Lead",
    role: "user",
    createdAt: "2025-03-25T08:05:00Z",
  },
  {
    id: "user-010",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    bio: "Journalist covering digital democracy initiatives and civic tech innovations.",
    subtitle: "Technology Reporter",
    role: "user",
    createdAt: "2025-04-01T15:30:00Z",
  },
  {
    id: "user-011",
    name: "Thomas Wright",
    email: "thomas.wright@example.com",
    bio: "Part of the Senate.City verification team, working on integrity and trust in digital governance.",
    subtitle: "Trust & Safety Specialist",
    role: "user",
    createdAt: "2025-01-25T14:15:00Z",
  },
  {
    id: "user-012",
    name: "Olivia Parker",
    email: "olivia.parker@example.com",
    avatar: "/avatars/olivia.jpg",
    bio: "Public opinion researcher specializing in civic engagement polling and data visualization.",
    subtitle: "Public Opinion Analyst",
    role: "user",
    createdAt: "2025-01-28T10:45:00Z",
  },
  {
    id: "user-013",
    name: "Nathan Kim",
    email: "nathan.kim@example.com",
    bio: "AI ethics expert focused on creating fair and transparent moderation systems for online civic platforms.",
    subtitle: "AI Ethics Engineer",
    role: "user",
    createdAt: "2025-02-03T09:20:00Z",
  },
  {
    id: "user-014",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    avatar: "/avatars/priya.jpg",
    bio: "Community organizer with experience in helping newcomers navigate digital civic platforms.",
    subtitle: "Community Onboarding Lead",
    role: "user",
    createdAt: "2025-02-05T16:30:00Z",
  },
  {
    id: "user-015",
    name: "Christopher Torres",
    email: "christopher.torres@example.com",
    bio: "Local government technology advisor helping municipalities adopt digital democracy tools.",
    subtitle: "Municipal Tech Advisor",
    role: "user",
    createdAt: "2025-02-10T11:25:00Z",
  },
  {
    id: "user-016",
    name: "Emily Nakamura",
    email: "emily.nakamura@example.com",
    avatar: "/avatars/emily.jpg",
    bio: "Backend developer specializing in APIs for civic tech platforms and policy tracking systems.",
    subtitle: "Backend Developer",
    role: "user",
    createdAt: "2025-02-15T13:10:00Z",
  },
  {
    id: "user-017",
    name: "Marcus Johnson",
    email: "marcus.johnson@example.com",
    bio: "Event coordinator for digital town halls and civic education initiatives.",
    subtitle: "Digital Events Coordinator",
    role: "user",
    createdAt: "2025-02-20T10:05:00Z",
  },
  {
    id: "user-018",
    name: "Sophia Lee",
    email: "sophia.lee@example.com",
    avatar: "/avatars/sophia.jpg",
    bio: "Communications specialist helping journalists effectively cover civic engagement platforms.",
    subtitle: "Media Relations Specialist",
    role: "user",
    createdAt: "2025-02-22T14:50:00Z",
  },
  {
    id: "user-019",
    name: "Jamal Williams",
    email: "jamal.williams@example.com",
    bio: "Political scientist researching the impact of digital democracy tools on voter behavior.",
    subtitle: "Political Science Professor",
    role: "user",
    createdAt: "2025-02-26T09:30:00Z",
  },
  {
    id: "user-020",
    name: "Hannah Clark",
    email: "hannah.clark@example.com",
    avatar: "/avatars/hannah.jpg",
    bio: "Product designer focused on creating features that connect online discussions to real-world impact.",
    subtitle: "Product Designer",
    role: "user",
    createdAt: "2025-03-01T15:20:00Z",
  },
  {
    id: "user-021",
    name: "Daniel Nguyen",
    email: "daniel.nguyen@example.com",
    bio: "Educator implementing civic tech platforms in school curriculums to teach digital citizenship.",
    subtitle: "Digital Citizenship Educator",
    role: "user",
    createdAt: "2025-03-05T11:15:00Z",
  },
  {
    id: "user-022",
    name: "Rebecca Martinez",
    email: "rebecca.martinez@example.com",
    avatar: "/avatars/rebecca.jpg",
    bio: "Neighborhood association president using digital tools to increase community involvement.",
    subtitle: "Community Leader",
    role: "user",
    createdAt: "2025-03-08T10:40:00Z",
  },
  {
    id: "user-023",
    name: "Kevin O'Neill",
    email: "kevin.oneill@example.com",
    bio: "Integration engineer working on connecting government data systems with civic platforms.",
    subtitle: "Systems Integration Engineer",
    role: "user",
    createdAt: "2025-03-10T13:25:00Z",
  },
  {
    id: "user-025",
    name: "Amara Jackson",
    email: "amara.jackson@example.com",
    avatar: "/avatars/amara.jpg",
    bio: "Inclusion researcher focused on making digital civic participation accessible to all communities.",
    subtitle: "Digital Inclusion Specialist",
    role: "user",
    createdAt: "2025-03-12T09:50:00Z",
  },
  {
    id: "user-027",
    name: "Simon Peterson",
    email: "simon.peterson@example.com",
    bio: "Computational linguist studying how language patterns in civic discussions influence policy outcomes.",
    subtitle: "Linguistics Researcher",
    role: "user",
    createdAt: "2025-03-14T16:20:00Z",
  },
  {
    id: "user-029",
    name: "Victoria Reynolds",
    email: "victoria.reynolds@example.com",
    avatar: "/avatars/victoria.jpg",
    bio: "Platform growth manager celebrating the expansion of Senate.City to new municipalities.",
    subtitle: "Platform Growth Manager",
    role: "user",
    createdAt: "2025-03-15T11:10:00Z",
  },
  {
    id: "user-031",
    name: "Benjamin Cohen",
    email: "benjamin.cohen@example.com",
    bio: "Social cohesion researcher studying the long-term impact of digital civic platforms on communities.",
    subtitle: "Social Impact Researcher",
    role: "user",
    createdAt: "2025-03-18T14:35:00Z",
  },
];

/**
 * Array of all posts on the platform
 */
/**
 * Sample posts data representing user activity on the Senate.City platform
 * This dataset contains community discussions about civic engagement and digital democracy
 */
export const posts: Post[] = [
  {
    id: "post-001", // Unique post identifier
    userId: "user-002", // Author reference
    content:
      "Just published my research on digital civic engagement platforms. Excited to share insights on how Senate.City can revolutionize how we participate in governance!",
    createdAt: "2025-04-05T14:23:00Z", // Recent post from April 5, 2025
    likes: 24, // Moderate engagement level
    comments: 7, // Several discussion points
    weight: 8, // Medium visualization weight
    tags: ["research", "civic engagement", "digital democracy"], // Academic/research focused
  },
  {
    id: "post-002",
    userId: "user-004", // Different author
    content:
      "Hosted a workshop today on increasing civic participation through social media. Great discussions on the potential and challenges ahead.",
    createdAt: "2025-04-05T10:15:00Z", // Same day, earlier post
    likes: 18, // Lower engagement than post-001
    comments: 5,
    weight: 6, // Lower visualization importance
    tags: ["workshop", "civic participation", "social media"], // Educational focus
  },
  {
    id: "post-003",
    userId: "user-001", // Likely a new user based on content
    content:
      "Excited to be part of the Senate.City community! Looking forward to connecting with like-minded individuals passionate about civic engagement.",
    createdAt: "2025-04-04T16:45:00Z", // Previous day
    likes: 32, // High engagement for an introduction post
    comments: 9,
    weight: 10, // Higher importance in visualization
    tags: ["introduction", "community"], // Community-building content
  },
  {
    id: "post-004",
    userId: "user-006",
    content:
      "What features would you like to see implemented in Senate.City to enhance community discussions?",
    createdAt: "2025-04-04T09:30:00Z", // Morning post from previous day
    likes: 15, // Moderate likes
    comments: 23, // Very high comment count - discussion generator
    weight: 12, // Important in visualization due to conversation volume
    tags: ["feature request", "discussion", "feedback"], // Platform development focus
  },
  {
    id: "post-005",
    userId: "user-005", // Technical user based on content
    content:
      "Working on a new tool to visualize connections between discussions on Senate.City. Early prototype showing promising results!",
    createdAt: "2025-04-03T15:20:00Z", // Two days ago
    likes: 27,
    comments: 8,
    weight: 9,
    tags: ["development", "visualization", "prototype"], // Technical development post
  },
  {
    id: "post-006",
    userId: "user-003",
    content:
      "Just proposed a new city initiative for urban green spaces. Would love your feedback on Senate.City!",
    createdAt: "2025-04-03T11:10:00Z", // Two days ago, morning
    likes: 41, // High engagement
    comments: 16, // Good discussion volume
    weight: 14, // Important in network visualization
    tags: ["initiative", "urban planning", "feedback"], // Policy-oriented content
  },
  {
    id: "post-007",
    userId: "user-008", // Likely a UX researcher or developer
    content:
      "Gathering user feedback on the Senate.City interface. What aspects of the UI do you find most intuitive or challenging?",
    createdAt: "2025-04-02T13:45:00Z", // Three days ago
    likes: 12, // Lower likes
    comments: 19, // High comment count - discussion post
    weight: 11,
    tags: ["UX", "feedback", "interface design"], // Design-focused content
  },
  {
    id: "post-008",
    userId: "user-007",
    content:
      "Interesting case study on how digital platforms like Senate.City can bridge the gap between elected officials and constituents.",
    createdAt: "2025-04-02T08:30:00Z", // Three days ago, early morning
    likes: 23,
    comments: 6,
    weight: 7, // Lower importance in visualization
    tags: ["case study", "governance", "civic tech"], // Research/analysis content
  },
  {
    id: "post-009",
    userId: "user-009", // Data analyst based on content
    content:
      "Analyzing participation patterns on civic platforms. Initial data suggests Senate.City has 30% higher engagement rates compared to traditional forums.",
    createdAt: "2025-04-01T11:20:00Z", // Four days ago
    likes: 35, // High engagement
    comments: 14,
    weight: 12, // Important for network visualization
    tags: ["data analysis", "engagement", "metrics"], // Analytics-focused
  },
  {
    id: "post-010",
    userId: "user-010", // Journalist or media professional
    content:
      "New article coming out next week featuring Senate.City as a leading innovation in digital democracy. Would love to interview more users for diverse perspectives!",
    createdAt: "2025-03-31T09:15:00Z", // Six days ago
    likes: 29,
    comments: 21, // High discussion volume
    weight: 13,
    tags: ["media", "interview", "journalism"], // Media relations content
  },
  {
    id: "post-011",
    userId: "user-012",
    content:
      "Just conducted a poll on Senate.City about citizen priorities for the upcoming budget allocation. Fascinating to see education and infrastructure at the top!",
    createdAt: "2025-03-30T16:28:00Z", // Week-old post
    likes: 38, // High engagement
    comments: 27, // Very active discussion
    weight: 15, // High importance in visualization
    tags: ["poll", "budget", "citizen priorities"], // Civic polling content
  },
  {
    id: "post-012",
    userId: "user-015",
    content:
      "Our local government just adopted Senate.City as an official channel for public consultations. This is a huge step forward for digital democracy!",
    createdAt: "2025-03-29T13:40:00Z", // 8 days ago
    likes: 52, // Very high engagement
    comments: 31, // Very active discussion
    weight: 18, // Major node in visualization
    tags: ["government", "adoption", "public consultation"], // Government adoption news
  },
  {
    id: "post-013",
    userId: "user-008", // Same user as post-007, likely a developer
    content:
      "Just released a major update to Senate.City's accessibility features. Now supporting screen readers, keyboard navigation, and high contrast mode.",
    createdAt: "2025-03-28T09:15:00Z", // 9 days ago
    likes: 43, // High engagement
    comments: 18,
    weight: 14,
    tags: ["accessibility", "update", "inclusion"], // Accessibility improvements
  },
  {
    id: "post-014",
    userId: "user-017",
    content:
      "Organizing a virtual town hall next week on Senate.City to discuss the proposed transportation policy changes. Join us for a real-time deliberation!",
    createdAt: "2025-03-27T11:30:00Z", // 10 days ago
    likes: 26,
    comments: 12,
    weight: 10,
    tags: ["town hall", "transportation", "policy"], // Event announcement
  },
  {
    id: "post-015",
    userId: "user-003", // Same user as post-006, community-focused
    content:
      "Created a guide for community leaders on how to effectively use Senate.City for neighborhood initiatives. Download link in comments!",
    createdAt: "2025-03-26T15:45:00Z", // 11 days ago
    likes: 31,
    comments: 23, // High interest in the resource
    weight: 13,
    tags: ["guide", "community leaders", "resources"], // Educational resource
  },
  {
    id: "post-016",
    userId: "user-019", // Academic researcher based on content
    content:
      "Studying the impact of Senate.City on voter turnout in local elections. Preliminary results show a 15% increase in areas with active platform use.",
    createdAt: "2025-03-25T10:20:00Z", // 12 days ago
    likes: 47, // Very high engagement
    comments: 29, // Active discussion
    weight: 16, // Important node
    tags: ["research", "voter turnout", "impact"], // Research findings
  },
  {
    id: "post-017",
    userId: "user-014",
    content:
      "Just launched a mentorship program pairing experienced Senate.City users with newcomers to help them navigate digital civic engagement effectively.",
    createdAt: "2025-03-24T13:55:00Z", // 13 days ago
    likes: 36,
    comments: 15,
    weight: 12,
    tags: ["mentorship", "onboarding", "community support"], // Community program
  },
  {
    id: "post-018",
    userId: "user-021", // Educator based on content
    content:
      "Our school is using Senate.City to teach students about civic responsibility and digital citizenship. The engagement levels are incredible!",
    createdAt: "2025-03-23T09:10:00Z", // 14 days ago
    likes: 44, // High engagement
    comments: 22,
    weight: 15,
    tags: ["education", "civic responsibility", "digital citizenship"], // Educational use case
  },
  {
    id: "post-019",
    userId: "user-007", // Same user as post-008, research-focused
    content:
      "Comparing Senate.City's discussion model with traditional public forums. The structured approach seems to reduce polarization significantly.",
    createdAt: "2025-03-22T14:35:00Z", // 15 days ago
    likes: 33,
    comments: 17,
    weight: 13,
    tags: ["research", "polarization", "discussion models"], // Research comparison
  },
  {
    id: "post-020",
    userId: "user-023", // Developer or platform manager
    content:
      "Excited to announce that Senate.City now integrates with government open data portals, making it easier to reference official statistics in discussions!",
    createdAt: "2025-03-21T11:25:00Z", // 16 days ago
    likes: 39,
    comments: 24,
    weight: 15,
    tags: ["integration", "open data", "feature"], // Feature announcement
  },
  {
    id: "post-021",
    userId: "user-016", // Developer based on content
    content:
      "Using Senate.City's API to build a dashboard that tracks the journey of citizen proposals from initial discussion to policy implementation.",
    createdAt: "2025-03-20T16:50:00Z", // 17 days ago
    likes: 28,
    comments: 11,
    weight: 9,
    tags: ["API", "development", "policy tracking"], // Technical development
  },
  {
    id: "post-022",
    userId: "user-025", // Diversity researcher based on content
    content:
      "Just wrapped up a series of interviews with marginalized communities about digital civic participation. Important insights for making Senate.City more inclusive.",
    createdAt: "2025-03-19T12:15:00Z", // 18 days ago
    likes: 41, // High engagement
    comments: 26, // Active discussion
    weight: 14,
    tags: ["inclusion", "interviews", "accessibility"], // Inclusion research
  },
  {
    id: "post-023",
    userId: "user-011", // Team member based on content
    content:
      "Senate.City's verification process for public officials has been recognized by the National Association of Digital Governance as a best practice. Proud to be part of this team!",
    createdAt: "2025-03-18T09:30:00Z", // 19 days ago
    likes: 54, // Very high engagement
    comments: 19,
    weight: 16, // Important node
    tags: ["verification", "recognition", "governance"], // Recognition announcement
  },
  {
    id: "post-024",
    userId: "user-027", // Academic researcher
    content:
      "Just published a paper analyzing the linguistic patterns in Senate.City discussions and how they correlate with policy outcomes. Link in comments!",
    createdAt: "2025-03-17T14:45:00Z", // 20 days ago
    likes: 37,
    comments: 21,
    weight: 13,
    tags: ["linguistics", "research", "policy outcomes"], // Research publication
  },
  {
    id: "post-025",
    userId: "user-013", // Technical developer
    content:
      "Implementing a new AI-powered moderation system on Senate.City that can identify constructive vs. destructive patterns of engagement while respecting privacy.",
    createdAt: "2025-03-16T10:20:00Z", // 21 days ago
    likes: 46, // High engagement
    comments: 32, // Very active discussion
    weight: 17, // Major node in visualization
    tags: ["AI", "moderation", "privacy"], // Technical feature development
  },
  {
    id: "post-026",
    userId: "user-029", // Platform leadership based on content
    content:
      "Just hit a milestone: 500 municipalities now use Senate.City for some form of official citizen engagement. Digital democracy is scaling fast!",
    createdAt: "2025-03-15T13:35:00Z", // 22 days ago
    likes: 67, // Extremely high engagement
    comments: 38, // Very active discussion
    weight: 20, // Most important node in this dataset
    tags: ["milestone", "adoption", "scaling"], // Platform growth announcement
  },
  {
    id: "post-027",
    userId: "user-018", // Media relations professional
    content:
      "Created a toolkit for journalists on how to effectively reference and report on Senate.City discussions as part of their coverage of local issues.",
    createdAt: "2025-03-14T09:55:00Z", // 23 days ago
    likes: 32,
    comments: 14,
    weight: 11,
    tags: ["journalism", "toolkit", "local media"], // Media resource
  },
  {
    id: "post-028",
    userId: "user-031", // Social researcher
    content:
      "Studying the long-term impact of Senate.City on social cohesion in communities that have used it for over a year. Results are very encouraging!",
    createdAt: "2025-03-13T15:10:00Z", // 24 days ago
    likes: 41, // High engagement
    comments: 23,
    weight: 15,
    tags: ["research", "social cohesion", "long-term impact"], // Long-term research
  },
  {
    id: "post-029",
    userId: "user-020", // Feature designer or product manager
    content:
      "Just proposed a new feature for Senate.City: 'Impact Tracking' to follow how discussions lead to real-world changes. Thoughts on implementation?",
    createdAt: "2025-03-12T11:25:00Z", // 25 days ago
    likes: 38,
    comments: 29, // High discussion on feature proposal
    weight: 14,
    tags: ["feature request", "impact tracking", "development"], // Feature proposal
  },
  {
    id: "post-030",
    userId: "user-022", // Community leader
    content:
      "Our neighborhood used Senate.City to collaboratively design a new community park. From ideation to approval in just 3 months! Case study coming soon.",
    createdAt: "2025-03-11T14:40:00Z", // 26 days ago
    likes: 59, // Very high engagement
    comments: 33, // Very active discussion
    weight: 18, // Major node in visualization
    tags: ["case study", "urban planning", "collaboration"], // Success story
  },
];

/**
 * Get a user by their unique ID
 * @param id User ID to look for
 * @returns User object if found, undefined otherwise
 */
export const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id);
};

/**
 * Get all posts created by a specific user
 * @param userId User ID to filter posts by
 * @returns Array of posts created by the specified user
 */
export const getPostsByUserId = (userId: string): Post[] => {
  return posts.filter((post) => post.userId === userId);
};

/**
 * Get a specific post by its ID
 * @param id Post ID to look for
 * @returns Post object if found, undefined otherwise
 */
export const getPostById = (id: string): Post | undefined => {
  return posts.find((post) => post.id === id);
};

/**
 * Generate network visualization data from posts
 * Creates nodes for each post and edges connecting related posts
 * @returns Object containing network nodes and edges
 */
export function generateNetworkData() {
  // Create nodes for each post
  const nodes = posts.map((post) => ({
    id: post.id,
    label: getUserById(post.userId)?.name || "Unknown",
    value: post.weight, // Size based on weight
    group: post.tags && post.tags.length > 0 ? post.tags[0] : undefined, // Group by first tag if available
  }));

  // Create some connections between posts

  const edges = [
    {
      from: "post-001",
      to: "post-003",
      value: 3,
      title: "Research to Introduction",
    },
    {
      from: "post-002",
      to: "post-004",
      value: 2,
      title: "Workshop to Feature Request",
    },
    {
      from: "post-003",
      to: "post-005",
      value: 4,
      title: "Introduction to Development",
    },
    {
      from: "post-004",
      to: "post-006",
      value: 5,
      title: "Feature Request to Initiative",
    },
    { from: "post-005", to: "post-007", value: 2, title: "Development to UX" },
    {
      from: "post-006",
      to: "post-008",
      value: 3,
      title: "Initiative to Case Study",
    },
    { from: "post-001", to: "post-007", value: 1, title: "Research to UX" },
    {
      from: "post-002",
      to: "post-008",
      value: 2,
      title: "Workshop to Case Study",
    },
    {
      from: "post-003",
      to: "post-006",
      value: 3,
      title: "Introduction to Initiative",
    },
    {
      from: "post-009",
      to: "post-005",
      value: 4,
      title: "Data Analysis to Development",
    },
    { from: "post-010", to: "post-001", value: 3, title: "Media to Research" },
    { from: "post-007", to: "post-010", value: 2, title: "UX to Media" },
    {
      from: "post-008",
      to: "post-009",
      value: 1,
      title: "Case Study to Data Analysis",
    },
    {
      from: "post-011",
      to: "post-012",
      value: 4,
      title: "Poll to Government Adoption",
    },
    {
      from: "post-012",
      to: "post-013",
      value: 3,
      title: "Government Adoption to Accessibility",
    },
    {
      from: "post-013",
      to: "post-022",
      value: 5,
      title: "Accessibility to Inclusion",
    },
    {
      from: "post-014",
      to: "post-011",
      value: 2,
      title: "Town Hall to Poll",
    },
    {
      from: "post-015",
      to: "post-017",
      value: 3,
      title: "Guide to Mentorship",
    },
    {
      from: "post-016",
      to: "post-018",
      value: 4,
      title: "Research to Education",
    },
    {
      from: "post-017",
      to: "post-003",
      value: 2,
      title: "Mentorship to Introduction",
    },
    {
      from: "post-018",
      to: "post-014",
      value: 3,
      title: "Education to Town Hall",
    },
    {
      from: "post-019",
      to: "post-016",
      value: 4,
      title: "Research to Research",
    },
    {
      from: "post-020",
      to: "post-021",
      value: 3,
      title: "Integration to API Development",
    },
    {
      from: "post-021",
      to: "post-029",
      value: 5,
      title: "API Development to Feature Request",
    },
    {
      from: "post-022",
      to: "post-025",
      value: 4,
      title: "Inclusion to Moderation",
    },
    {
      from: "post-023",
      to: "post-026",
      value: 6,
      title: "Verification to Milestone",
    },
    {
      from: "post-024",
      to: "post-019",
      value: 2,
      title: "Linguistics to Research",
    },
    {
      from: "post-025",
      to: "post-007",
      value: 3,
      title: "Moderation to UX Feedback",
    },
    {
      from: "post-026",
      to: "post-030",
      value: 4,
      title: "Milestone to Case Study",
    },
    {
      from: "post-027",
      to: "post-010",
      value: 5,
      title: "Journalism Toolkit to Media",
    },
    {
      from: "post-028",
      to: "post-024",
      value: 3,
      title: "Social Cohesion to Linguistics",
    },
    {
      from: "post-029",
      to: "post-005",
      value: 4,
      title: "Feature Request to Visualization",
    },
    {
      from: "post-030",
      to: "post-006",
      value: 5,
      title: "Urban Planning to Urban Green Spaces",
    },
    {
      from: "post-001",
      to: "post-016",
      value: 3,
      title: "Research to Voter Turnout",
    },
    {
      from: "post-001",
      to: "post-024",
      value: 4,
      title: "Research to Linguistics",
    },
    {
      from: "post-001",
      to: "post-028",
      value: 2,
      title: "Research to Social Cohesion",
    },
    {
      from: "post-004",
      to: "post-029",
      value: 5,
      title: "Feature Request to Feature Request",
    },
    {
      from: "post-006",
      to: "post-015",
      value: 3,
      title: "Urban Initiative to Community Guide",
    },
    {
      from: "post-006",
      to: "post-030",
      value: 4,
      title: "Urban Initiative to Community Park",
    },
    {
      from: "post-008",
      to: "post-030",
      value: 3,
      title: "Case Study to Case Study",
    },
    {
      from: "post-009",
      to: "post-016",
      value: 4,
      title: "Data Analysis to Research",
    },
    {
      from: "post-009",
      to: "post-028",
      value: 3,
      title: "Data Analysis to Social Cohesion",
    },
    {
      from: "post-010",
      to: "post-023",
      value: 2,
      title: "Media to Verification Recognition",
    },
    {
      from: "post-012",
      to: "post-026",
      value: 5,
      title: "Government Adoption to Milestone",
    },
    {
      from: "post-014",
      to: "post-018",
      value: 3,
      title: "Town Hall to Education",
    },
    {
      from: "post-019",
      to: "post-025",
      value: 4,
      title: "Polarization Research to Moderation",
    },
    {
      from: "post-020",
      to: "post-009",
      value: 5,
      title: "Open Data to Data Analysis",
    },
  ];

  return { nodes, edges };
}

/**
 * Network data type containing nodes and edges for visualization
 */
export interface NetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}
