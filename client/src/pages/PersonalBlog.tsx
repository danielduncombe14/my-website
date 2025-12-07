import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { getQueryFn } from "@/lib/queryClient";

export default function PersonalBlog() {
  const { data: posts, isLoading, isError } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/personal"],
    queryFn: getQueryFn<BlogPost[]>({ on401: "throw" }),
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-personal-blog-title">
            Personal Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts, reflections, and stories from my personal journey
          </p>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-[16/9]" />
                <CardHeader>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-6 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {posts?.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover-elevate"
                data-testid={`card-post-${post.id}`}
              >
                <Link href={`/personal-blog/${post.id}`}>
                  <div className="aspect-[16/9] overflow-hidden cursor-pointer">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                  <Link href={`/personal-blog/${post.id}`}>
                    <CardTitle className="text-2xl hover:text-primary cursor-pointer transition-colors">
                      {post.title}
                    </CardTitle>
                  </Link>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/personal-blog/${post.id}`}>
                    <Button variant="ghost" size="sm" data-testid={`button-read-${post.id}`}>
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground" data-testid="text-error">Failed to load posts. Please try again later.</p>
          </div>
        )}

        {!isLoading && !isError && (!posts || posts.length === 0) && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground" data-testid="text-empty">No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
