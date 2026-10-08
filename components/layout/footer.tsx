import { DonateButton } from '../shared/donate-button';

export const Footer = () => {
  const today = new Date().getFullYear();
  return (
    <footer className="flex h-24 w-full flex-col items-center justify-center gap-1">
      <p>Copyright &copy; {today} ddamaja.dev</p>
      <DonateButton />
    </footer>
  );
};
