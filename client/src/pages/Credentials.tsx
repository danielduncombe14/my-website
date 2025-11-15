import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Star, Briefcase } from "lucide-react";
import type { Credential } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Credentials() {
  const { data: credentials, isLoading, isError } = useQuery<Credential[]>({
    queryKey: ["/api/credentials"],
  });

  const education = credentials?.filter((c) => c.type === "education") || [];
  const certifications = credentials?.filter((c) => c.type === "certification") || [];
  const awards = credentials?.filter((c) => c.type === "award") || [];

  const skills = [
    { category: "Design", items: ["UI/UX Design", "Visual Design", "Prototyping", "Design Systems"] },
    { category: "Development", items: ["TypeScript", "React", "Node.js", "Web APIs"] },
    { category: "Strategy", items: ["Product Strategy", "User Research", "Data Analysis", "Project Management"] },
    { category: "Content", items: ["Technical Writing", "Content Strategy", "SEO", "Copywriting"] },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="text-credentials-title">
            Credentials & Expertise
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my education, certifications, and professional achievements
          </p>
        </div>

        {/* Education Timeline */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold" data-testid="text-education-title">Education</h2>
          </div>
          
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {education.map((edu) => (
                <Card key={edu.id} className="hover-elevate" data-testid={`card-education-${edu.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{edu.title}</CardTitle>
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <Briefcase className="w-4 h-4" />
                          <span className="font-medium">{edu.organization}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{edu.date}</p>
                      </div>
                    </div>
                  </CardHeader>
                  {edu.description && (
                    <CardContent>
                      <p className="text-muted-foreground">{edu.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Certifications Grid */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold" data-testid="text-certifications-title">Certifications</h2>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <Card key={cert.id} className="hover-elevate" data-testid={`card-cert-${cert.id}`}>
                  <CardHeader>
                    <CardTitle className="text-lg mb-2">{cert.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-1">{cert.organization}</p>
                    <p className="text-xs text-muted-foreground">{cert.date}</p>
                  </CardHeader>
                  {cert.description && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Skills Matrix */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold" data-testid="text-skills-title">Skills Matrix</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skillGroup) => (
              <Card key={skillGroup.category} className="hover-elevate">
                <CardHeader>
                  <CardTitle className="text-xl">{skillGroup.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        data-testid={`badge-${skill.toLowerCase().replace(/ /g, "-")}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Awards & Recognition */}
        {awards.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold" data-testid="text-awards-title">Awards & Recognition</h2>
            </div>
            
            <div className="space-y-4">
              {awards.map((award) => (
                <Card key={award.id} className="hover-elevate" data-testid={`card-award-${award.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{award.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{award.organization} • {award.date}</p>
                      </div>
                    </div>
                  </CardHeader>
                  {award.description && (
                    <CardContent>
                      <p className="text-muted-foreground">{award.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
