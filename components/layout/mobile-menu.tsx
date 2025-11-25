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
import { Button } from "@/components/ui/button";
import { Filter, Menu, Search } from "lucide-react";
import { FilterNotes } from "../notes/filter-notes";

interface MobileMenuProps {
  noteCount: number;
  noteLengthFormat: string;
}

export default function MobileMenu({ ...props }: MobileMenuProps) {
  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Filter className="h-5 w-5" />
        </Button>
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
