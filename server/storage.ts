import {
  type BlogPost,
  type InsertBlogPost,
  type Credential,
  type InsertCredential,
  type GalleryItem,
  type InsertGalleryItem,
} from "@shared/schema";

export interface IStorage {
  // Blog Posts
  getAllBlogPosts(type?: string): Promise<BlogPost[]>;
  getBlogPostById(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Credentials
  getAllCredentials(): Promise<Credential[]>;
  getCredentialById(id: string): Promise<Credential | undefined>;
  createCredential(credential: InsertCredential): Promise<Credential>;

  // Gallery Items
  getAllGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemById(id: string): Promise<GalleryItem | undefined>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
}

export class MemStorage implements IStorage {
  private blogPosts: Map<string, BlogPost>;
  private credentials: Map<string, Credential>;
  private galleryItems: Map<string, GalleryItem>;
  private blogPostCounter: number;
  private credentialCounter: number;
  private galleryItemCounter: number;

  constructor() {
    this.blogPosts = new Map();
    this.credentials = new Map();
    this.galleryItems = new Map();
    this.blogPostCounter = 0;
    this.credentialCounter = 0;
    this.galleryItemCounter = 0;
    this.seedData();
  }

  private seedData() {
    // Seed Personal Blog Posts
    const personalPost1: BlogPost = {
      id: "personal-post-1",
      title: "Finding Balance in a Digital World",
      excerpt: "Reflections on maintaining mindfulness and presence in an increasingly connected age. How I've learned to set boundaries and find peace.",
      content: "In today's hyperconnected world, finding balance has become more challenging than ever. We're constantly bombarded with notifications, messages, and the endless scroll of social media. Over the past few years, I've embarked on a journey to reclaim my time and attention.\n\nThe first step was recognizing the problem. I realized I was spending hours each day mindlessly scrolling, my focus fragmented across dozens of apps and platforms. It was affecting my productivity, my relationships, and my mental health.\n\nI started small, implementing digital detox periods and setting strict boundaries around my phone usage. I removed social media apps from my phone and designated specific times for checking messages. The initial withdrawal was difficult, but the results were transformative.\n\nNow, I wake up to a morning routine that doesn't involve screens. I've rediscovered the joy of reading physical books, taking walks without my phone, and having uninterrupted conversations. My focus has improved, my anxiety has decreased, and I feel more present in my daily life.\n\nThis journey is ongoing, and I'm still learning. But I've come to understand that technology should serve us, not control us. By being intentional about how we use our devices, we can harness their benefits while protecting our wellbeing.",
      featuredImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=675&fit=crop",
      category: "Mindfulness",
      type: "personal",
      date: "March 15, 2024",
      readTime: 5,
      author: "Jane Doe",
      tags: ["Mindfulness", "Digital Wellness", "Productivity", "Mental Health"],
    };

    const personalPost2: BlogPost = {
      id: "personal-post-2",
      title: "Lessons from My Creative Journey",
      excerpt: "What I've learned from years of creative work, failures, and unexpected successes that shaped who I am today.",
      content: "Looking back on my creative journey, I'm struck by how much the failures taught me compared to the successes. Every project that didn't go as planned became a stepping stone to something better.\n\nI started creating content without any clear direction, just a passion for making things. Some projects took off, others fell flat. But each one taught me something valuable about my craft, my audience, and myself.\n\nOne of the biggest lessons was learning to embrace imperfection. I used to agonize over every detail, afraid to share anything that wasn't perfect. This perfectionism was paralyzing. Eventually, I realized that done is better than perfect, and that sharing your work is the only way to grow.\n\nAnother crucial insight was the importance of consistency over intensity. I used to work in intense bursts, producing a lot in a short time and then burning out. Now, I've learned to maintain a sustainable pace, showing up regularly even when inspiration is lacking.\n\nCollaboration has also been transformative. Working with other creatives has expanded my perspective and pushed me beyond my comfort zone. Some of my best work has come from partnerships where our different strengths complemented each other.\n\nThe journey continues, and I'm excited about what lies ahead. Each project is an opportunity to learn, grow, and create something meaningful.",
      featuredImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=675&fit=crop",
      category: "Creativity",
      type: "personal",
      date: "February 28, 2024",
      readTime: 6,
      author: "Jane Doe",
      tags: ["Creativity", "Personal Growth", "Lessons Learned", "Career"],
    };

    // Seed Business Blog Posts
    const businessPost1: BlogPost = {
      id: "business-post-1",
      title: "The Future of Remote Work: Trends and Predictions",
      excerpt: "An analysis of emerging remote work trends and what they mean for businesses and professionals in the coming years.",
      content: "The pandemic accelerated the shift to remote work by several years, and now we're seeing the long-term implications of this transformation. As someone who's been working remotely for over five years, I've observed significant changes in how businesses operate.\n\nOne of the most notable trends is the rise of hybrid work models. Companies are realizing that flexibility is key to attracting and retaining talent. The one-size-fits-all approach is being replaced by policies that allow employees to choose where and how they work best.\n\nTechnology continues to evolve to support distributed teams. We're seeing innovations in collaboration tools, virtual reality meetings, and asynchronous communication platforms. These technologies are making remote work more effective and engaging than ever before.\n\nHowever, challenges remain. Building company culture remotely requires intentional effort. Many organizations are investing in virtual team-building activities, regular check-ins, and in-person gatherings to maintain connection and cohesion.\n\nThe geographic flexibility of remote work is also reshaping talent markets. Companies can now hire the best people regardless of location, leading to increased competition for top talent. This has implications for compensation, benefits, and how companies position themselves to attract employees.\n\nLooking ahead, I predict we'll see more emphasis on outcomes rather than hours worked. Trust and autonomy will become even more important. Companies that embrace this shift and invest in the right tools and culture will thrive in the new world of work.",
      featuredImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=675&fit=crop",
      category: "Business Strategy",
      type: "business",
      date: "March 10, 2024",
      readTime: 7,
      author: "Jane Doe",
      tags: ["Remote Work", "Future of Work", "Business Strategy", "Productivity"],
    };

    const businessPost2: BlogPost = {
      id: "business-post-2",
      title: "Building User-Centric Products: A Framework",
      excerpt: "A comprehensive guide to designing and developing products that truly solve user problems and create lasting value.",
      content: "Creating successful products requires more than good ideas and technical execution. It demands a deep understanding of user needs and a commitment to solving real problems.\n\nThe foundation of user-centric product development is research. Before writing a single line of code or creating any designs, we need to understand who we're building for. This means conducting user interviews, observing behavior, and analyzing data to uncover genuine pain points.\n\nOnce we understand our users, we can begin to ideate solutions. The key here is to stay focused on the problem, not fall in love with a specific solution. We should explore multiple approaches and be willing to pivot based on feedback.\n\nPrototyping and testing are crucial steps that too many teams skip or rush through. By creating low-fidelity prototypes and getting them in front of users early, we can validate assumptions and catch issues before investing significant resources.\n\nIteration is where the magic happens. Each round of feedback should inform the next version of the product. This cycle of build-measure-learn allows us to progressively refine our solution until it truly resonates with users.\n\nFinally, successful products require ongoing attention. User needs evolve, markets change, and new competitors emerge. Maintaining a user-centric approach means continuously gathering feedback and adapting to ensure the product remains relevant and valuable.\n\nThis framework has helped me ship products that users love and that drive real business results. It's not always easy, but the payoff is worth it.",
      featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop",
      category: "Product Development",
      type: "business",
      date: "February 20, 2024",
      readTime: 8,
      author: "Jane Doe",
      tags: ["Product Management", "UX Design", "User Research", "Development"],
    };

    // Add blog posts to storage
    [personalPost1, personalPost2, businessPost1, businessPost2].forEach((post) => {
      this.blogPosts.set(post.id, post);
    });

    // Seed Credentials - Education
    const edu1: Credential = {
      id: "edu-1",
      type: "education",
      title: "Chartered Professional Accountants of Canada (CPA Canada)",
      organization: "CPA Canada",
      date: "2018 - 2021",
      description: "Professional accounting designation demonstrating expertise in financial management, accounting practices, and ethical business standards.",
    };

    const edu2: Credential = {
      id: "edu-2",
      type: "education",
      title: "Bachelor of Commerce (BCom), Accounting",
      organization: "The University of British Columbia",
      date: "2013 - 2018",
      description: "Focused on accounting and commerce. Involved in UBC Recreation as an Assistant Director and participated in JDC West as a coach.",
    };

    const edu3: Credential = {
      id: "edu-3",
      type: "education",
      title: "Bachelor of Commerce (BCom), Accounting",
      organization: "National University of Singapore",
      date: "2016 - 2016",
      description: "Exchange program. Received the NUS Lee Foundation Award worth $2,500 for academic and extra-curricular achievement.",
    };

    // Seed Credentials - Certifications
    const cert1: Credential = {
      id: "cert-1",
      type: "certification",
      title: "AWS Certified Solutions Architect",
      organization: "Amazon Web Services",
      date: "2023",
      description: "Professional-level certification demonstrating expertise in designing distributed systems on AWS.",
    };

    const cert2: Credential = {
      id: "cert-2",
      type: "certification",
      title: "Google UX Design Professional Certificate",
      organization: "Google",
      date: "2022",
      description: "Comprehensive program covering user experience design principles and practices.",
    };

    const cert3: Credential = {
      id: "cert-3",
      type: "certification",
      title: "Certified Scrum Master (CSM)",
      organization: "Scrum Alliance",
      date: "2021",
      description: "Certification in agile project management and Scrum methodology.",
    };

    // Seed Credentials - Awards
    const award1: Credential = {
      id: "award-1",
      type: "award",
      title: "Best Innovation Award",
      organization: "Tech Excellence Awards",
      date: "2023",
      description: "Recognized for innovative approach to solving complex user experience challenges in enterprise software.",
    };

    // Add credentials to storage
    [edu1, edu2, edu3, cert1, cert2, cert3, award1].forEach((cred) => {
      this.credentials.set(cred.id, cred);
    });

    // Seed Gallery Items
    const gallery1: GalleryItem = {
      id: "gallery-1",
      title: "Mountain Sunset",
      description: "Captured during a hiking trip in the Sierra Nevada mountains",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      category: "Landscape",
    };

    const gallery2: GalleryItem = {
      id: "gallery-2",
      title: "Urban Architecture",
      description: "Modern city skyline at dusk",
      imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=800&fit=crop",
      category: "Architecture",
    };

    const gallery3: GalleryItem = {
      id: "gallery-3",
      title: "Abstract Patterns",
      description: "Geometric composition exploring color and form",
      imageUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=800&fit=crop",
      category: "Abstract",
    };

    const gallery4: GalleryItem = {
      id: "gallery-4",
      title: "Coastal Serenity",
      description: "Peaceful morning at the beach",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      category: "Landscape",
    };

    const gallery5: GalleryItem = {
      id: "gallery-5",
      title: "City Lights",
      description: "Night photography in downtown",
      imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&h=800&fit=crop",
      category: "Architecture",
    };

    const gallery6: GalleryItem = {
      id: "gallery-6",
      title: "Color Study",
      description: "Experimental color composition",
      imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&h=800&fit=crop",
      category: "Abstract",
    };

    // Add gallery items to storage
    [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6].forEach((item) => {
      this.galleryItems.set(item.id, item);
    });
  }

  // Blog Posts
  async getAllBlogPosts(type?: string): Promise<BlogPost[]> {
    const allPosts = Array.from(this.blogPosts.values());
    if (type) {
      return allPosts.filter((post) => post.type === type);
    }
    return allPosts;
  }

  async getBlogPostById(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    this.blogPostCounter++;
    const id = `${insertPost.type}-post-${this.blogPostCounter}`;
    const post: BlogPost = { ...insertPost, id };
    this.blogPosts.set(id, post);
    return post;
  }

  // Credentials
  async getAllCredentials(): Promise<Credential[]> {
    return Array.from(this.credentials.values());
  }

  async getCredentialById(id: string): Promise<Credential | undefined> {
    return this.credentials.get(id);
  }

  async createCredential(insertCredential: InsertCredential): Promise<Credential> {
    this.credentialCounter++;
    const id = `${insertCredential.type}-${this.credentialCounter}`;
    const credential: Credential = { ...insertCredential, id };
    this.credentials.set(id, credential);
    return credential;
  }

  // Gallery Items
  async getAllGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values());
  }

  async getGalleryItemById(id: string): Promise<GalleryItem | undefined> {
    return this.galleryItems.get(id);
  }

  async createGalleryItem(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    this.galleryItemCounter++;
    const id = `gallery-${this.galleryItemCounter}`;
    const item: GalleryItem = { ...insertItem, id };
    this.galleryItems.set(id, item);
    return item;
  }
}

export const storage = new MemStorage();
