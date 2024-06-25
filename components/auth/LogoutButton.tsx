import { logout } from "@/actions/logout";

interface LogoutButtonProps {
    children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onCLick = () => {
    logout();
  };

  return (
    <span onClick={onCLick} className="cursor-pointer">
      {children}
    </span>
  );
};
