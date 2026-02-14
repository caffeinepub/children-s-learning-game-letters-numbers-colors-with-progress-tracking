import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Category, Progress } from '../backend';

export function useProgress() {
  const { actor, isFetching } = useActor();

  return useQuery<Progress>({
    queryKey: ['progress'],
    queryFn: async () => {
      if (!actor) {
        return { highestScore: BigInt(0), roundsPlayed: BigInt(0), lastPlayed: BigInt(0) };
      }
      return actor.getProgress();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ category, score }: { category: Category; score: number }) => {
      if (!actor) return;
      await actor.updateProgress(category, BigInt(score));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
}

export function useQuestionsByCategory(category: Category) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['questions', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuestionsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}
