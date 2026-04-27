import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Loader2, Trash2, UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Part, PartCategory, PartInput } from "../../features/parts/types";
import { PART_CATEGORIES } from "../../features/parts/types";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface PartFormProps {
  open: boolean;
  editPart: Part | null;
  defaultCategory?: PartCategory;
  onSave: (input: PartInput) => void;
  onClose: () => void;
  isSaving: boolean;
}

function generateId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export default function PartForm({
  open,
  editPart,
  defaultCategory,
  onSave,
  onClose,
  isSaving,
}: PartFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<PartCategory>(
    defaultCategory ?? "frame",
  );
  const [specs, setSpecs] = useState("");
  const [weight, setWeight] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      if (editPart) {
        setName(editPart.name);
        setCategory(editPart.category);
        setSpecs(editPart.specs);
        setWeight(String(editPart.weight));
        setImageUrl(editPart.imageUrl);
      } else {
        setName("");
        setCategory(defaultCategory ?? "frame");
        setSpecs("");
        setWeight("");
        setImageUrl(undefined);
      }
      setErrors({});
      setImageError(null);
      setImageUploading(false);
    }
  }, [open, editPart, defaultCategory]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setImageError("Please select a JPG, PNG, or WebP image.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setImageError("Image must be 5 MB or smaller.");
      e.target.value = "";
      return;
    }

    setImageUploading(true);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setImageUrl(dataUrl);
    } catch {
      setImageError("Could not read the image file. Please try again.");
    } finally {
      setImageUploading(false);
      e.target.value = "";
    }
  }

  function handleRemoveImage() {
    setImageUrl(undefined);
    setImageError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!specs.trim()) errs.specs = "Specs are required";
    const w = Number.parseFloat(weight);
    if (Number.isNaN(w) || w <= 0)
      errs.weight = "Weight must be a positive number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      id: editPart?.id ?? generateId(),
      name: name.trim(),
      category,
      specs: specs.trim(),
      weight: Number.parseFloat(weight),
      imageUrl: imageUrl,
    });
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md" data-ocid="parts.dialog">
        <DialogHeader>
          <DialogTitle>{editPart ? "Edit Part" : "Add New Part"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="part-name">Name</Label>
            <Input
              id="part-name"
              placeholder="e.g. Emax ECO II 2306 1700KV"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-ocid="parts.name_input"
            />
            {errors.name && (
              <p
                className="text-xs text-destructive"
                data-ocid="parts.name_field_error"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label htmlFor="part-category">Category</Label>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as PartCategory)}
            >
              <SelectTrigger
                id="part-category"
                data-ocid="parts.category_select"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {PART_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Specs */}
          <div className="space-y-1.5">
            <Label htmlFor="part-specs">Specs</Label>
            <Textarea
              id="part-specs"
              placeholder="e.g. KV: 1700, Stator: 2306, Max Current: 38A"
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
              rows={3}
              data-ocid="parts.specs_textarea"
            />
            {errors.specs && (
              <p
                className="text-xs text-destructive"
                data-ocid="parts.specs_field_error"
              >
                {errors.specs}
              </p>
            )}
          </div>

          {/* Weight */}
          <div className="space-y-1.5">
            <Label htmlFor="part-weight">Weight (grams)</Label>
            <Input
              id="part-weight"
              type="number"
              placeholder="e.g. 30"
              min="0.1"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              data-ocid="parts.weight_input"
            />
            {errors.weight && (
              <p
                className="text-xs text-destructive"
                data-ocid="parts.weight_field_error"
              >
                {errors.weight}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-1.5">
            <Label>Photo (optional)</Label>

            {imageUrl ? (
              <div className="relative rounded-lg overflow-hidden border border-border bg-muted/30">
                <img
                  src={imageUrl}
                  alt="Part preview"
                  className="w-full h-40 object-cover"
                  data-ocid="parts.image_preview"
                />
                <div className="absolute inset-0 flex items-end justify-between p-2 bg-gradient-to-t from-black/50 to-transparent">
                  <span className="text-xs text-white/80 font-medium">
                    Image attached
                  </span>
                  <div className="flex gap-1.5">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="h-7 text-xs"
                      onClick={() => fileInputRef.current?.click()}
                      data-ocid="parts.replace_image_button"
                    >
                      Replace
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="h-7 w-7 p-0"
                      onClick={handleRemoveImage}
                      aria-label="Remove image"
                      data-ocid="parts.remove_image_button"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={imageUploading}
                className="w-full flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/20 hover:bg-muted/40 hover:border-primary/40 transition-colors py-6 px-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                data-ocid="parts.image_dropzone"
              >
                {imageUploading ? (
                  <>
                    <Loader2 className="h-7 w-7 text-muted-foreground animate-spin" />
                    <span className="text-sm text-muted-foreground">
                      Loading image…
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center rounded-full bg-muted w-10 h-10">
                      {imageUrl === undefined ? (
                        <UploadCloud className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">
                        Click to upload a photo
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        JPG, PNG or WebP · max 5 MB
                      </p>
                    </div>
                  </>
                )}
              </button>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={handleFileChange}
              data-ocid="parts.image_upload"
              aria-label="Upload part photo"
            />

            {imageError && (
              <p
                className="text-xs text-destructive"
                data-ocid="parts.image_field_error"
              >
                {imageError}
              </p>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="parts.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving || imageUploading}
              data-ocid="parts.submit_button"
            >
              {isSaving ? "Saving…" : editPart ? "Save Changes" : "Add Part"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
