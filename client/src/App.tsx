import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import Home from "@/pages/Home";
import About from "@/pages/About";
import PersonalBlog from "@/pages/PersonalBlog";
import BusinessBlog from "@/pages/BusinessBlog";
import BlogPostPage from "@/pages/BlogPost";
import Credentials from "@/pages/Credentials";
import Gallery from "@/pages/Gallery";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/personal-blog" component={PersonalBlog} />
      <Route path="/business-blog" component={BusinessBlog} />
      <Route path="/personal-blog/:id">
        {() => <BlogPostPage type="personal" />}
      </Route>
      <Route path="/business-blog/:id">
        {() => <BlogPostPage type="business" />}
      </Route>
      <Route path="/credentials" component={Credentials} />
      <Route path="/gallery" component={Gallery} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Navigation />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
