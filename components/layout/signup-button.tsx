'use client';

import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';

export const SignUpButton = () => {
  const { data: session } = useSession();

  return session ? null : (
    <Button
      asChild
      className="hover:brightness-110 px-8 py-3 font-mono shadow-lg transition-all active:scale-[0.98]"
    >
      <Link href="/sign-up">$ sign-up --create</Link>
    </Button>
  );
};
