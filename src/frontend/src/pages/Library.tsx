import { Box } from "lucide-react";
import PartsLibraryPanel from "../components/parts/PartsLibraryPanel";

export default function Library() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Page Header */}
      <section className="border-b border-border/40 bg-card/60 backdrop-blur py-10">
        <div className="container px-4 md:px-8">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Box className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Component Library
              </h1>
              <p className="text-muted-foreground mt-1">
                Browse frames, motors, props, batteries, flight controllers, and
                cameras. Sign in to add your own parts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parts Content */}
      <section
        className="flex-1 py-10 bg-background"
        data-ocid="library.section"
      >
        <div className="container px-4 md:px-8">
          <PartsLibraryPanel />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/30 py-6">
        <div className="container px-4 md:px-8">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Drone Designer. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
