import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS = ["#DC2626", "#F87171", "#FBBF24", "#34D399", "#10B981", "#3B82F6", "#6366F1", "#8B5CF6", "#EC4899", "#F43F5E", "#F97316", "#FCD34D", "#6EE7B7", "#93C5FD", "#A5B4FC", "#D4D4D8", "#E5E7EB", "#F3F4F6"]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length]
}