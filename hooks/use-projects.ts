"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import type { Project, ApiResponse } from "@/lib/types"

// hooks/use-projects.ts
export function useProjects(page: number) {
  return useQuery({
    queryKey: ["projects", page],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<{
        projects: Project[];
        pagination: {
          currentPage: number;
          totalPages: number;
          totalProjects: number;
          limit: number;
          hasNextPage: boolean;
          hasPrevPage: boolean;
        }
      }>>(`/api/v1/project?page=${page}`)
      return response.data
    },
    keepPreviousData: true,
  })
}