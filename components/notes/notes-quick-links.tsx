"use client";

import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { useCreatePageUrl } from "@/hooks/use-create-page-url";

export const NotesQuickLinks = () => {
  const createPageUrl = useCreatePageUrl();
  return (
    <div className="w-48 p-4 border h-fit rounded-lg bg-muted border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
      <div className="space-y-2">
        <Link
          href="/notes/new"
          className="flex items-center gap-2 text-sm hover:text-blue-600 dark:hover:text-blue-400"
        >
          <Plus size={16} />
          Add New
        </Link>
        <Link
          href={createPageUrl("starred", "true")}
          className="flex items-center gap-2 text-sm hover:text-blue-600 dark:hover:text-blue-400"
        >
          <Star size={16} />
          Starred
        </Link>
      </div>
    </div>
  );
};
