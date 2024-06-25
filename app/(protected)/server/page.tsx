import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await useCurrentUser();
  return <UserInfo user={user} label="Server" />;
};
export default ServerPage;
