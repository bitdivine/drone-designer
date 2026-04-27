import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useDeletePart,
  useListParts,
  useSavePart,
} from "../../features/parts/queries";
import type { Part, PartCategory } from "../../features/parts/types";
import { PART_CATEGORIES } from "../../features/parts/types";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import PartCard from "./PartCard";
import PartForm from "./PartForm";

export default function PartsLibraryPanel() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const currentPrincipal = identity?.getPrincipal().toText() ?? null;

  const { data: parts = [], isLoading } = useListParts();
  const savePart = useSavePart();
  const deletePart = useDeletePart();

  const [activeCategory, setActiveCategory] = useState<PartCategory | "all">(
    "all",
  );
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Part | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Part | null>(null);

  const filtered = parts.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.specs.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function handleAddClick() {
    if (!isAuthenticated) {
      toast.error("Sign in to add parts", {
        description: "Use the Sign In button in the header to authenticate.",
      });
      return;
    }
    setEditTarget(null);
    setFormOpen(true);
  }

  function handleEdit(part: Part) {
    setEditTarget(part);
    setFormOpen(true);
  }

  function handleDeleteRequest(part: Part) {
    setDeleteTarget(part);
  }

  async function handleSave(input: Parameters<typeof savePart.mutateAsync>[0]) {
    try {
      await savePart.mutateAsync(input);
      toast.success(editTarget ? "Part updated" : "Part added");
      setFormOpen(false);
      setEditTarget(null);
    } catch {
      toast.error("Failed to save part. Please try again.");
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    try {
      await deletePart.mutateAsync(deleteTarget.id);
      toast.success("Part deleted");
    } catch {
      toast.error("Failed to delete part.");
    } finally {
      setDeleteTarget(null);
    }
  }

  const countForCategory = (cat: PartCategory | "all") =>
    cat === "all"
      ? parts.length
      : parts.filter((p) => p.category === cat).length;

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search parts…"
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="parts.search_input"
          />
        </div>
        <Button
          onClick={handleAddClick}
          className="gap-2 shrink-0"
          data-ocid="parts.add_button"
        >
          <Plus className="h-4 w-4" />
          Add Part
        </Button>
      </div>

      {/* Category tabs */}
      <Tabs
        value={activeCategory}
        onValueChange={(v) => setActiveCategory(v as PartCategory | "all")}
      >
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          <TabsTrigger
            value="all"
            className="text-xs"
            data-ocid="parts.filter.all"
          >
            All ({countForCategory("all")})
          </TabsTrigger>
          {PART_CATEGORIES.map((cat) => (
            <TabsTrigger
              key={cat.value}
              value={cat.value}
              className="text-xs gap-1"
              data-ocid={`parts.filter.${cat.value}`}
            >
              <span aria-hidden="true">{cat.icon}</span>
              {cat.label} ({countForCategory(cat.value)})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders have no meaningful id
            <Skeleton key={i} className="h-44 rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-center space-y-4"
          data-ocid="parts.empty_state"
        >
          <div className="text-5xl">🔍</div>
          <div>
            <p className="font-semibold text-lg">No parts found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {search
                ? "Try a different search term or clear the filter."
                : "Be the first to add a part in this category."}
            </p>
          </div>
          {isAuthenticated && (
            <Button
              variant="outline"
              onClick={handleAddClick}
              data-ocid="parts.empty_add_button"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Part
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((part, i) => (
            <PartCard
              key={part.id}
              part={part}
              isOwned={
                isAuthenticated &&
                part.owner === currentPrincipal &&
                !part.isSample
              }
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
              index={i}
            />
          ))}
        </div>
      )}

      {/* Add / Edit form */}
      <PartForm
        open={formOpen}
        editPart={editTarget}
        defaultCategory={activeCategory !== "all" ? activeCategory : undefined}
        onSave={handleSave}
        onClose={() => {
          setFormOpen(false);
          setEditTarget(null);
        }}
        isSaving={savePart.isPending}
      />

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="parts.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Part</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deleteTarget?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="parts.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="parts.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
