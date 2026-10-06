"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterNotesProps = {
  activeFilter?: "all" | "starred";
};

export const FilterNotes = ({ activeFilter }: FilterNotesProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFilter =
    activeFilter ?? (searchParams.get("starred") === "true" ? "starred" : "all");

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("starred");
    } else {
      params.set("starred", "true");
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
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
