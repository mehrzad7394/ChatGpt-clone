import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <SignUp path="/sign-up" signInUrl="/sign-in"/>
    </div>
  );
};

export default SignUpPage;
