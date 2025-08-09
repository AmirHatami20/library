import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {genreService} from "@/service";
import {Genre} from "@/types";

export function useGenreAPI() {
    const queryClient = useQueryClient();

    const useGetGenres = () =>
        useQuery<Genre[]>({
            queryKey: ['genres'],
            queryFn: genreService.getAll,
        });

    const useCreateGenre = () =>
        useMutation({
            mutationFn: genreService.create,
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['genres']});
            }
        })

    const useUpdateGenre = () =>
        useMutation({
            mutationFn: ({id, body}: { id: string, body: { name: string } }) =>
                genreService.update(id, body),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['genres']});
            }
        })

    const useDeleteGenre = () =>
        useMutation({
            mutationFn: (id: string) =>
                genreService.remove(id),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['genres']});
            }
        })

    return {
        useGetGenres,
        useCreateGenre,
        useUpdateGenre,
        useDeleteGenre,
    }
}