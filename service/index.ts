import axios from "@/lib/axios";
import {API_PATH} from "@/constant/apiPath";

type GetPaginateParams = {
    bookGenres?: string;
    search?: string;
    page?: number;
    limit?: number;
};

export const bookService = {
    getAll: async () => {
        const res = await axios.get(API_PATH.BOOK.GET_ALL);
        return res.data;
    },

    getOne: async (id: string) => {
        const res = await axios.get(API_PATH.BOOK.GET_BY_ID(id))
        return res.data;
    },

    getPaginate: async (params: GetPaginateParams) => {
        const query = new URLSearchParams();

        if (params.bookGenres) query.set("bookGenres", params.bookGenres);
        if (params.search) query.set("search", params.search);
        if (params.page) query.set("page", String(params.page));
        if (params.limit) query.set("limit", String(params.limit));

        const res = await axios.get(API_PATH.BOOK.GET_PAGINATED(query));
        return res.data;
    },


    create: async (formData: FormData) => {
        const res = await axios.post(API_PATH.BOOK.CREATE, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res.data;
    },

    update: async (id: string, formData: FormData) => {
        const res = await axios.put(API_PATH.BOOK.UPDATE(id), formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return res.data;
    },

    remove: async (id: string) => {
        const res = await axios.delete(API_PATH.BOOK.UPDATE(id));
        return res.data;
    },
};

export const genreService = {
    getAll: async () => {
        const res = await axios.get(API_PATH.GENRE.GET_ALL);
        return res.data;
    },

    create: async (body: { name: string }) => {
        const res = await axios.post(API_PATH.GENRE.CREATE, body);
        return res.data;
    },

    update: async (id: string, body: { name: string }) => {
        const res = await axios.put(API_PATH.GENRE.UPDATE(id), body);
        return res.data;
    },
    remove: async (id: string) => {
        const res = await axios.delete(API_PATH.GENRE.DELETE(id));
        return res.data;
    }

}

export const authService = {
    create: async (formData: FormData) => {
        const res = await axios.post(API_PATH.AUTH.CREATE, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return res.data;
    }
}