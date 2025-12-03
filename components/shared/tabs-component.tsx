"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { NotesTable } from "../notes/notes-table";
import { NotesGrid } from "../notes/notes-grid";

const tabs = [
  { value: "grid", label: "Grid" },
  { value: "table", label: "Table" },
];

export const TabsComponent = ({ view }: { view: string }) => {
  const router = useRouter();

  const onViewChange = (view: string) => {
    router.push(`?view=${view}`);
  };

  return (
    <Tabs defaultValue={view} onValueChange={onViewChange}>
      <div className="flex gap-4 items-center py-4">
        <span className="text-sm font-medium">View</span>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="cursor-pointer"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.value === "grid" ? (
            <NotesGrid />
          ) : (
            <div className="max-w-4xl mx-auto">
              <NotesTable />
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};
