import Button from "@material-tailwind/react/Button";
import Image from "next/image";
import { signIn } from "next-auth/client";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image
        src="https://www.businessinsider.in/thumb/msid-82078909,width-600,resizemode-4,imgsize-42220/tech/news/how-to-solve-text-formatting-issues-in-google-docs-and-slides/google-docs.jpg"
        height="300"
        width="550"
        objectFit="contain"
      />
      <Button
        color="blue"
        buttonType="filled"
        ripple="light"
        onClick={signIn}
        iconOnly={true}
        className="!w-44 mt-10"
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
