"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import type { Project, ApiResponse } from "@/lib/types"

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Project[]>>("/api/v1/project")
      return response.data
    },
  })
}
