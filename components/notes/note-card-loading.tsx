import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const NoteCardLoading = () => {
  return (
    <Card className="dark:hover:border-accent hover:border-orange-400 h-[calc(100vh-16rem)] w-full snap-start sm:h-auto">
      <CardHeader className="pb-3">
        <div className="flex justify-between">
          <div>
            <CardTitle>
              <Skeleton className="h-5 w-3/4 bg-accent dark:bg-gray-700" />
            </CardTitle>
            <Skeleton className="h-3 w-1/4 bg-accent dark:bg-gray-700" />
          </div>
          <Skeleton className="h-4 w-4 bg-accent dark:bg-gray-700" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Skeleton className="h-4 w-full mb-1 bg-accent dark:bg-gray-700" />
        <Skeleton className="h-4 w-full mb-1 bg-accent dark:bg-gray-700" />
        <Skeleton className="h-4 w-2/3 bg-accent dark:bg-gray-700" />
      </CardContent>
      <CardFooter className="pt-3">
        <Skeleton className="h-4 w-20 bg-accent dark:bg-gray-700" />
      </CardFooter>
    </Card>
  );
};
