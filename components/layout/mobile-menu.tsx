import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Filter } from "lucide-react";
import { FilterNotes } from "../notes/filter-notes";

interface MobileMenuProps {
  noteCount: number;
  noteLengthFormat: string;
}

export default function MobileMenu({ ...props }: MobileMenuProps) {
  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <div className="flex items-center gap-2 mb-4 sm:hidden cursor-pointer">
          <Filter className="h-6 w-6" />
          <p className="text-muted-foreground text-sm">Filters</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[30vh]">
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>Filter notes</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-8 items-center justify-center">
          <p className="text-muted-foreground text-center">
            You have {props.noteCount} {props.noteLengthFormat} in this view.
          </p>
          <FilterNotes />
        </div>
        <DrawerFooter>
          <DrawerClose>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
