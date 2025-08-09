import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {bookService} from '@/service';
import {Book} from '@/types';
import {SearchParams} from "next/dist/server/request/search-params";

type PaginatedBooks = {
    data: Book[];
    page: number;
    limit: number;
    total: number;
};

export function useBookAPI() {
    const queryClient = useQueryClient();

    const useGetBooks = () =>
        useQuery<Book[]>({
            queryKey: ['books'],
            queryFn: bookService.getAll,
        });

    const useGetPaginatedBooks = (params: SearchParams) =>
        useQuery<PaginatedBooks>({
            queryKey: ['paginatedBooks', params],
            queryFn: () => bookService.getPaginate(params),
        });

    const useGetBook = (id: string) =>
        useQuery<Book>({
            queryKey: ['book', id],
            queryFn: () => bookService.getOne(id),
            enabled: !!id,
        });

    const useCreateBook = () =>
        useMutation({
            mutationFn: bookService.create,
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['books']});
                queryClient.invalidateQueries({queryKey: ['paginatedBooks']});
            },
        });

    const useUpdateBook = () =>
        useMutation({
            mutationFn: ({id, formData}: { id: string; formData: FormData }) =>
                bookService.update(id, formData),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['books']});
                queryClient.invalidateQueries({queryKey: ['paginatedBooks']});
            },
        });

    const useDeleteBook = () =>
        useMutation({
            mutationFn: (id: string) => bookService.remove(id),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['books']});
                queryClient.invalidateQueries({queryKey: ['paginatedBooks']});
            },
        });

    return {
        useGetBooks,
        useGetPaginatedBooks,
        useGetBook,
        useCreateBook,
        useUpdateBook,
        useDeleteBook,
    };
}
