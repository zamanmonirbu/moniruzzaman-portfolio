"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import type { BlogsResponse } from "@/lib/types"

export function useBlogs(page: number) {
  return useQuery({
    queryKey: ["blogs", page],
    queryFn: async () => {
      const response = await apiClient.get<BlogsResponse>(`/api/v1/blog?page=${page}`)
      return response.data // Return just the data property
    },
    placeholderData: keepPreviousData,
  })
}