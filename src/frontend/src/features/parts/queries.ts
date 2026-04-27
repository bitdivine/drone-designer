import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "../../hooks/useActor";
import type { Part, PartInput } from "./types";
import { SAMPLE_PARTS } from "./types";

export function useListParts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Part[]>({
    queryKey: ["parts"],
    queryFn: async () => {
      if (actor && !actorFetching) {
        const backendParts = await actor.listParts();
        if (Array.isArray(backendParts)) {
          // Map backend Part (owner: Principal, createdAt: bigint) to frontend Part
          return backendParts.map((p) => ({
            id: p.id,
            category: p.category as Part["category"],
            name: p.name,
            specs: p.specs,
            weight: p.weight,
            createdAt: Number(p.createdAt),
            isSample: p.isSample,
            owner:
              typeof p.owner === "string"
                ? p.owner
                : (p.owner.toText?.() ?? String(p.owner)),
            imageUrl: p.imageUrl,
          }));
        }
      }
      return SAMPLE_PARTS;
    },
    enabled: true,
    staleTime: 30_000,
  });
}

export function useSavePart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: PartInput) => {
      if (!actor) throw new Error("Not connected to backend");
      const id = await actor.savePart({
        id: input.id,
        name: input.name,
        category: input.category as never,
        specs: input.specs,
        weight: input.weight,
        imageUrl: input.imageUrl,
      });
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parts"] });
    },
  });
}

export function useDeletePart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected to backend");
      return actor.deletePart(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parts"] });
    },
  });
}
