"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export const FilterNotes = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "all";

  const handleFilterChange = (value: string) => {
    const url = value === "all" ? "/notes" : `/notes?filter=${value}`;
    router.push(url);
  };

  return (
    <Select value={currentFilter} onValueChange={handleFilterChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Filter notes" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Notes</SelectItem>
        <SelectItem value="starred">Starred Notes</SelectItem>
      </SelectContent>
    </Select>
  );
};
