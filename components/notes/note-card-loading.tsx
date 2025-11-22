import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const NoteCardLoading = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-8" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-6" />
      </CardFooter>
    </Card>
  )
}
