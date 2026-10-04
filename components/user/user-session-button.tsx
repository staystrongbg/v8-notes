'use client';

import { useSession } from '@/lib/auth-client';
import Link from 'next/link';

import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { UserDropdown } from './user-dropdown';

export const UserSessionButton = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <Button variant="ghost" disabled aria-label="Loading user session">
        <Skeleton className="bg-muted size-8 rounded-full" />
      </Button>
    );
  }

  if (session?.user) {
    return <UserDropdown user={session.user} />;
  }

  return (
    <Link href="/sign-in">
      <Button variant="outline">Sign In</Button>
    </Link>
  );
};
