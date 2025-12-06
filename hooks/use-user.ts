"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import type { User, ApiResponse } from "@/lib/types"

const USER_EMAIL = "monir.cse6.bu@gmail.com"

export function useUser() {
  return useQuery({
    queryKey: ["user", USER_EMAIL],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<User>>(`/api/v1/user/${USER_EMAIL}`)
      return response.data
    },
  })
}
