export const API_PATH = {
    BOOK: {
        GET_ALL: `/api/book`,
        GET_PAGINATED: (query: URLSearchParams) => `/api/book?${query.toString()}`,
        CREATE: `/api/book`,
        UPDATE: (id: string) => `/api/book/${id}`,
        DELETE: (id: string) => `/api/book/${id}`,
        GET_BY_ID: (id: string) => `/api/book/${id}`,
    },
    GENRE: {
        GET_ALL: `/api/genre`,
        CREATE: `/api/genre`,
        UPDATE: (id: string) => `/api/genre/${id}`,
        DELETE: (id: string) => `/api/genre/${id}`,
    },
    AUTH: {
        CREATE: `/api/auth/sign-up`,
    }
}