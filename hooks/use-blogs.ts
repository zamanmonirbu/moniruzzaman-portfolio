"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import type { Blog, ApiResponse } from "@/lib/types"

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Blog[]>>("/api/v1/blog")
      return response.data
    },
  })
}
