function SignInForm() {
  return (
    <form className="relative mt-8 flex flex-col items-end ">
      <input
        type="text"
        className="w-64 h-10 border border-charcoal bg-honeydew rounded-lg px-4 py-2 mb-4"
        placeholder="Username"
      />
      <input
        type="password"
        className="w-64 h-10 border border-charcoal bg-honeydew rounded-lg px-4 py-2 mb-4"
        placeholder="Password"
      />
      <button className="w-64 h-10 bg-biceblue border border-charcoal text-honeydew rounded-lg px-4 py-2 mb-4">
        Sign In
      </button>
      <br />
      <button className="w-64 h-10 bg-biceblue border border-charcoal text-honeydew rounded-lg px-4 py-2">
        Not a member? Sign Up
      </button>
    </form>
  );
}

export default SignInForm;
