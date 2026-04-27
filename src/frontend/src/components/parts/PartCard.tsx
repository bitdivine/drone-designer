import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit2, Trash2, Weight } from "lucide-react";
import { useState } from "react";
import type { Part } from "../../features/parts/types";
import { PART_CATEGORIES } from "../../features/parts/types";

interface PartCardProps {
  part: Part;
  isOwned: boolean;
  onEdit: (part: Part) => void;
  onDelete: (part: Part) => void;
  index: number;
}

export default function PartCard({
  part,
  isOwned,
  onEdit,
  onDelete,
  index,
}: PartCardProps) {
  const categoryMeta = PART_CATEGORIES.find((c) => c.value === part.category);
  const [imgError, setImgError] = useState(false);

  return (
    <Card
      className="border-border/50 bg-card/60 backdrop-blur hover:border-primary/30 hover:shadow-md transition-all duration-200 flex flex-col"
      data-ocid={`parts.item.${index + 1}`}
    >
      {part.imageUrl && !imgError && (
        <div className="w-full overflow-hidden rounded-t-lg h-36">
          <img
            src={part.imageUrl}
            alt={part.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      )}

      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl shrink-0" aria-hidden="true">
              {categoryMeta?.icon}
            </span>
            <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-foreground">
              {part.name}
            </h3>
          </div>
          {part.isSample && (
            <Badge
              variant="secondary"
              className="shrink-0 text-xs"
              data-ocid={`parts.sample_badge.${index + 1}`}
            >
              Sample
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 flex flex-col gap-3 flex-1">
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {part.specs}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Weight className="h-3 w-3" />
            <span>{part.weight}g</span>
          </div>

          {isOwned && !part.isSample && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={() => onEdit(part)}
                aria-label={`Edit ${part.name}`}
                data-ocid={`parts.edit_button.${index + 1}`}
              >
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={() => onDelete(part)}
                aria-label={`Delete ${part.name}`}
                data-ocid={`parts.delete_button.${index + 1}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
