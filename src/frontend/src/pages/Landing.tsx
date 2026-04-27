import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Box, Calculator, Save, Zap } from "lucide-react";
import { SiGithub } from "react-icons/si";

export default function Landing() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative px-4 py-20 md:py-32 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Design Your
                  <span className="block text-primary mt-2">Perfect Drone</span>
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl max-w-2xl">
                  Build, visualize, and optimize custom drone configurations
                  with real-time 3D preview and performance calculations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/workspace">
                  <Button
                    size="lg"
                    className="gap-2 text-base w-full sm:w-auto"
                  >
                    Start Designing
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base w-full sm:w-auto"
                  asChild
                >
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiGithub className="h-5 w-5" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl" />
              <img
                src="/assets/generated/drone-hero.dim_1600x900.png"
                alt="Drone Design Visualization"
                className="relative rounded-lg shadow-2xl border border-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional-grade tools for designing and optimizing your custom
              drone builds.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <button
              type="button"
              className="cursor-pointer text-left w-full"
              onClick={() => navigate({ to: "/library" })}
              data-ocid="landing.component_library_card"
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur transition-colors duration-200 hover:border-primary/50 hover:bg-card/80 h-full">
                <CardContent className="pt-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Box className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      Component Library
                      <ArrowRight className="h-4 w-4 text-primary opacity-60" />
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Choose from frames, motors, props, batteries, flight
                      controllers, and cameras to build your perfect
                      configuration.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </button>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Live 3D Preview</h3>
                  <p className="text-sm text-muted-foreground">
                    See your drone design in real-time with interactive 3D
                    visualization. Rotate, zoom, and inspect every detail.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Performance Metrics</h3>
                  <p className="text-sm text-muted-foreground">
                    Calculate weight, thrust-to-weight ratio, and estimated
                    flight time with transparent assumptions.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="pt-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Save className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Save & Share</h3>
                  <p className="text-sm text-muted-foreground">
                    Save your designs securely on-chain with Internet Identity.
                    Access them from anywhere, anytime.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-muted/30">
        <div className="container px-4 py-20 md:py-32 md:px-8">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to Build Your Drone?
            </h2>
            <p className="text-lg text-muted-foreground">
              Start designing now with our intuitive workspace. No installation
              required.
            </p>
            <Link to="/workspace">
              <Button size="lg" className="gap-2 text-base">
                Launch Workspace
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Drone Designer. All rights reserved.</p>
            <p>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
