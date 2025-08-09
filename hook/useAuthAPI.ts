import {useMutation} from "@tanstack/react-query";
import {authService} from "@/service";

export function useAuthAPI() {
    const useCreateUser = () =>
        useMutation({
            mutationFn: authService.create
        })

    return {
        useCreateUser,
    }
}