import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useRef, useEffect } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { createUser, getUserByEmail, verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { validateEmail, safeRedirect } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const formType = formData.get("formType");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null }, formType },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" }, formType },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" }, formType },
      { status: 400 }
    );
  }

  if (formType === "login") {
    const user = await verifyLogin(email, password);
    if (!user) {
      return json(
        { errors: { email: "Invalid email or password", password: null }, formType },
        { status: 400 }
      );
    }

    return createUserSession({
      redirectTo: "/home",
      remember: formData.get("remember") === "on",
      request,
      userId: user.id,
    });
  } else if (formType === "join") {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return json(
        {
          errors: {
            email: "A user already exists with this email",
            password: null,
          },
          formType,
        },
        { status: 400 }
      );
    }

    const user = await createUser(email, password);

    return createUserSession({
      redirectTo: "/home",
      remember: false,
      request,
      userId: user.id,
    });
  }

  return null;
};

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Tabs defaultValue="login">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="join">Join</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Form method="post" className="space-y-6">
              <input type="hidden" name="formType" value="login" />
              <input type="hidden" name="redirectTo" value={redirectTo} />
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    ref={emailRef}
                    id="email"
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={actionData?.errors?.email ? true : undefined}
                    aria-describedby="email-error"
                    className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  />
                  {actionData?.errors?.email ? (
                    <div className="pt-1 text-red-700" id="email-error">
                      {actionData.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    ref={passwordRef}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    aria-invalid={actionData?.errors?.password ? true : undefined}
                    aria-describedby="password-error"
                    className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  />
                  {actionData?.errors?.password ? (
                    <div className="pt-1 text-red-700" id="password-error">
                      {actionData.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-center text-sm text-gray-500">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Don't have an account?{" "}
                  <Link
                    className="text-blue-500 underline"
                    to={{
                      pathname: "/join",
                      search: searchParams.toString(),
                    }}
                  >
                    Sign up
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
              >
                Log in
              </button>
            </Form>
          </TabsContent>
          <TabsContent value="join">
            <Form method="post" className="space-y-6">
              <input type="hidden" name="formType" value="join" />
              <input type="hidden" name="redirectTo" value={redirectTo} />
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    ref={emailRef}
                    id="email"
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={actionData?.errors?.email ? true : undefined}
                    aria-describedby="email-error"
                    className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  />
                  {actionData?.errors?.email ? (
                    <div className="pt-1 text-red-700" id="email-error">
                      {actionData.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    ref={passwordRef}
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    aria-invalid={actionData?.errors?.password ? true : undefined}
                    aria-describedby="password-error"
                    className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  />
                  {actionData?.errors?.password ? (
                    <div className="pt-1 text-red-700" id="password-error">
                      {actionData.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
              >
                Create Account
              </button>
              <div className="flex items-center justify-center">
                <div className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    className="text-blue-500 underline"
                    to={{
                      pathname: "/login",
                      search: searchParams.toString(),
                    }}
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}