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
    <Card className="transition-shadow duration-200 hover:shadow-lg border border-gray-500 h-64">
      <CardHeader className="pb-3">
        <CardTitle>
          <Skeleton className="h-5 w-3/4 bg-gray-500" />
        </CardTitle>
        <Skeleton className="h-3 w-1/4 bg-gray-500" />
      </CardHeader>
      <CardContent className="pt-0">
        <Skeleton className="h-4 w-full mb-1 bg-gray-500" />
        <Skeleton className="h-4 w-full mb-1 bg-gray-500" />
        <Skeleton className="h-4 w-2/3 bg-gray-500" />
      </CardContent>
      <CardFooter className="pt-3">
        <Skeleton className="h-4 w-20 bg-gray-500" />
      </CardFooter>
    </Card>
  );
};
