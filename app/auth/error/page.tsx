import CardWrapper from "@/components/auth/CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
const ErrorPage = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="flex items-center justify-center">
        <ExclamationTriangleIcon className="h-10 w-10 text-red-500" />
      </div>
    </CardWrapper>
  );
};

export default ErrorPage;
