export const Footer = () => {
  const today = new Date().getFullYear();
  return (
    <footer className="flex h-24 w-full items-center justify-center">
      <p>Copyright &copy; {today}</p>
    </footer>
  );
};
