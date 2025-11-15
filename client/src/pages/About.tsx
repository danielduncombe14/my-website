import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Workspace_hero_image_a4d128f5.png";
import profileImage from "@assets/generated_images/Professional_profile_portrait_0a5ea5a5.png";

export default function About() {
  const skills = [
    "UI/UX Design",
    "Web Development",
    "TypeScript",
    "React",
    "Node.js",
    "Strategic Planning",
    "Content Creation",
    "Creative Writing",
    "Project Management",
    "Digital Marketing",
    "Brand Strategy",
    "Photography",
  ];

  const quickFacts = [
    { label: "Location", value: "San Francisco, CA" },
    { label: "Experience", value: "8+ Years" },
    { label: "Focus", value: "Digital Innovation" },
    { label: "Availability", value: "Open to Opportunities" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/60" />
        </div>
        <h1 className="relative z-10 text-5xl sm:text-6xl font-bold text-white" data-testid="text-about-title">
          About Me
        </h1>
      </section>

      {/* Content Layout */}
      <section className="py-16 sm:py-24 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Biography - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-4" data-testid="text-bio-title">My Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a multidisciplinary creative professional with a deep passion for design, technology, 
                  and storytelling. My journey began over eight years ago when I discovered the intersection 
                  of visual design and code, and I've been exploring that space ever since.
                </p>
                <p>
                  Throughout my career, I've had the privilege of working with diverse teams and clients, 
                  from innovative startups to established enterprises. Each project has taught me the value 
                  of empathy, clear communication, and the importance of user-centered design thinking.
                </p>
                <p>
                  My approach combines strategic thinking with hands-on execution. I believe that great work 
                  comes from understanding both the big picture and the smallest details. Whether I'm designing 
                  an interface, writing code, or crafting content, I strive for excellence and continuous improvement.
                </p>
                <p>
                  Beyond professional work, I'm an avid photographer, writer, and lifelong learner. I believe 
                  in giving back to the community through mentorship and sharing knowledge. When I'm not working, 
                  you'll find me exploring new places, experimenting with new technologies, or enjoying a good book.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <h2 className="text-3xl font-bold mb-4" data-testid="text-philosophy-title">My Philosophy</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I believe that design and technology should serve humanity, not the other way around. 
                  Every project is an opportunity to create something meaningful that improves people's lives, 
                  even in small ways.
                </p>
                <p>
                  Collaboration is at the heart of everything I do. The best solutions emerge when diverse 
                  perspectives come together with a shared purpose. I'm always eager to learn from others 
                  and contribute my own insights to create something greater than the sum of its parts.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Profile Photo */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-center mb-6">
                  <Avatar className="w-48 h-48">
                    <AvatarImage src={profileImage} alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Jane Doe</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Creative Professional & Digital Innovator
                </p>
                
                {/* Social Links */}
                <div className="flex justify-center gap-2">
                  <Button variant="ghost" size="icon" data-testid="button-email">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" data-testid="button-github">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" data-testid="button-linkedin">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" data-testid="button-twitter">
                    <Twitter className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  {quickFacts.map((fact) => (
                    <div key={fact.label} className="flex justify-between">
                      <span className="text-muted-foreground">{fact.label}:</span>
                      <span className="font-medium">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center" data-testid="text-skills-title">
            Skills & Expertise
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="text-base px-4 py-2"
                data-testid={`badge-skill-${skill.toLowerCase().replace(/\//g, "-").replace(/ /g, "-")}`}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
