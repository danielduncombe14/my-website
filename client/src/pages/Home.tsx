import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { BlogPost, GalleryItem } from "@shared/schema";
import heroImage from "@assets/generated_images/Workspace_hero_image_a4d128f5.png";

export default function Home() {
  const { data: personalPosts, isError: personalError } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/personal"],
  });

  const { data: businessPosts, isError: businessError } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/business"],
  });

  const { data: galleryItems, isError: galleryError } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });

  const latestPersonal = !personalError ? personalPosts?.[0] : undefined;
  const latestBusiness = !businessError ? businessPosts?.[0] : undefined;
  const featuredGallery = !galleryError ? galleryItems?.[0] : undefined;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6" data-testid="text-hero-title">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 font-medium" data-testid="text-hero-subtitle">
            Designer • Developer • Creative Thinker
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center max-w-2xl mx-auto">
            <Link href="/credentials">
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-background/10 backdrop-blur-md border-white/20 text-white hover:bg-background/20"
                data-testid="button-view-credentials"
              >
                View My Credentials
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/personal-blog">
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-background/10 backdrop-blur-md border-white/20 text-white hover:bg-background/20"
                data-testid="button-read-personal-blog"
              >
                Read Personal Blog
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/business-blog">
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-background/10 backdrop-blur-md border-white/20 text-white hover:bg-background/20"
                data-testid="button-read-business-blog"
              >
                Read Business Blog
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-background/10 backdrop-blur-md border-white/20 text-white hover:bg-background/20"
                data-testid="button-who-am-i"
              >
                Who Am I?
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Content Grid */}
      <section className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center" data-testid="text-featured-title">
          Featured Content
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Latest Personal Blog */}
          {personalError ? (
            <Card className="overflow-hidden" data-testid="card-error-personal">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Unable to load personal blog posts</p>
              </CardContent>
            </Card>
          ) : latestPersonal ? (
            <Card className="overflow-hidden hover-elevate" data-testid="card-featured-personal">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={latestPersonal.featuredImage}
                  alt={latestPersonal.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{latestPersonal.date}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{latestPersonal.readTime} min</span>
                </div>
                <CardTitle className="text-xl">{latestPersonal.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{latestPersonal.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/personal-blog/${latestPersonal.id}`}>
                  <Button variant="ghost" size="sm" data-testid="button-read-personal">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ) : null}

          {/* Latest Business Blog */}
          {businessError ? (
            <Card className="overflow-hidden" data-testid="card-error-business">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Unable to load business blog posts</p>
              </CardContent>
            </Card>
          ) : latestBusiness ? (
            <Card className="overflow-hidden hover-elevate" data-testid="card-featured-business">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={latestBusiness.featuredImage}
                  alt={latestBusiness.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{latestBusiness.date}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{latestBusiness.readTime} min</span>
                </div>
                <CardTitle className="text-xl">{latestBusiness.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{latestBusiness.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/business-blog/${latestBusiness.id}`}>
                  <Button variant="ghost" size="sm" data-testid="button-read-business">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ) : null}

          {/* Featured Gallery */}
          {galleryError ? (
            <Card className="overflow-hidden" data-testid="card-error-gallery">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Unable to load gallery items</p>
              </CardContent>
            </Card>
          ) : featuredGallery ? (
            <Card className="overflow-hidden hover-elevate" data-testid="card-featured-gallery">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={featuredGallery.imageUrl}
                  alt={featuredGallery.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{featuredGallery.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{featuredGallery.description}</p>
              </CardContent>
              <CardFooter>
                <Link href="/gallery">
                  <Button variant="ghost" size="sm" data-testid="button-view-gallery">
                    View Gallery
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ) : null}
        </div>
      </section>

      {/* Brief Introduction */}
      <section className="py-16 sm:py-24 px-4 bg-card">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-testid="text-intro-title">
            Hi, I'm Daniel
          </h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            A creative problem-solver who blends finance and accounting with technology and strategy to build clean, impactful solutions.
          </p>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            My career started in the financial world, where I learned how to analyze complex systems, think strategically, and make data-driven decisions. Today, I want to bring that same knowledge and structure and blend it with my technological savy in order to design and develop creative solutions to modern problems.
          </p>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Travel has shaped a huge part of who I am. Experiencing new cultures, environments, and ways of thinking has expanded my perspective and strengthened my ability to design and create with empathy. Whether I'm on the road exploring a new country or working through a project in the digital space, I'm always learning, adapting, and refining how I approach challenges.
          </p>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            I love transforming ideas into clean, functional, meaningful solutions. Blending creativity with analytical thinking, whether it's design, writing, or development, my focus is simple: create work that is intentional, effective, and built to make an impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about">
              <Button variant="default" data-testid="button-learn-more">
                Learn More About Me
              </Button>
            </Link>
            <Link href="/credentials">
              <Button variant="outline" data-testid="button-view-credentials">
                View Credentials
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
