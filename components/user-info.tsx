import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card>
      <CardHeader className="w-[600px] flex flex-col gap-2">
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="w-[600px] flex flex-col gap-4">
        <div className="flex flex-row justify-between gap-2">
          <p className="font-medium">ID</p>
          <p>{user?.id}</p>
        </div>
        <div className="flex flex-row justify-between gap-2">
          <p className="font-medium">Name</p>
          <p>{user?.name}</p>
        </div>
        <div className="flex flex-row justify-between gap-2">
          <p className="font-medium">Email</p>
          <p className="">{user?.email}</p>
        </div>
        <div className="flex flex-row justify-between gap-2">
          <p className="font-medium">Role</p>
          <p className="">{user?.role}</p>
        </div>
        <div className="flex flex-row justify-between gap-2">
          <p className="font-medium">Two Factor Authentication</p>
          {/* <p className="">OFF</p> */}
          <Badge variant="success">
            {/* {user?.isTwoFactorEnabled ? "ON" : "OFF"} */}
            OFF
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
