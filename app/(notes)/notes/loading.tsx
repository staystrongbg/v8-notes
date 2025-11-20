import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen grid place-items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
