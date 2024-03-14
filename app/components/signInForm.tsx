import { Link, useSearchParams } from "@remix-run/react";

function SignInForm() {
  const [searchParams] = useSearchParams();

  return (
    <form className="relative mt-8 flex flex-col items-end ">
      <Link
        className="w-64 h-10 bg-biceblue border border-charcoal text-honeydew text-center rounded-lg px-4 py-2 mb-4"
        to={{
          pathname: "/login",
          search: searchParams.toString(),
        }}
      >
        Sign In
      </Link>
      <br />
      <Link
        className="w-64 h-10 bg-biceblue border border-charcoal text-honeydew text-center rounded-lg px-4 py-2"
        to={{
          pathname: "/join",
          search: searchParams.toString(),
        }}
      >
        Not a member? Sign Up
      </Link>
    </form>
  );
}

export default SignInForm;
