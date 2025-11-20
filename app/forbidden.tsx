import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>Forbidden</h2>
      <p>You are not authorized to access this resource.</p>
      <Link href="/" className="mt-4">
        Return Home
      </Link>
    </div>
  );
}
