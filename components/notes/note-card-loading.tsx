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
    <Card className="transition-shadow duration-200 hover:shadow-lg border border-gray-200 h-64">
      <CardHeader className="pb-3">
        <CardTitle>
          <Skeleton className="h-5 w-3/4 bg-accent" />
        </CardTitle>
        <Skeleton className="h-3 w-1/4 bg-accent" />
      </CardHeader>
      <CardContent className="pt-0">
        <Skeleton className="h-4 w-full mb-1 bg-accent" />
        <Skeleton className="h-4 w-full mb-1 bg-accent" />
        <Skeleton className="h-4 w-2/3 bg-accent" />
      </CardContent>
      <CardFooter className="pt-3">
        <Skeleton className="h-4 w-20 bg-accent" />
      </CardFooter>
    </Card>
  );
};
