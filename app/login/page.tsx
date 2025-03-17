"use client";
import { CustomButton, SectionTitle } from "@/components";
import { isValidEmailAddressFormat } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
	const router = useRouter();
	const [error, setError] = useState("");
	// const session = useSession();
	const { data: session, status: sessionStatus } = useSession();

	useEffect(() => {
		// if user has already logged in redirect to home page
		if (sessionStatus === "authenticated") {
			router.replace("/");
		}
	}, [sessionStatus, router]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const license = e.target[0].value;
		const activeKey = e.target[1].value;

		const res = await signIn("credentials", {
			redirect: false,
			license,
			activeKey,
		});

		if (res?.error) {
			setError("Invalid license or active key");
			toast.error("Invalid license or active key");
			if (res?.url) router.replace("/");
		} else {
			setError("");
			toast.success("Successful login");
		}
	};

	if (sessionStatus === "loading") {
		return <h1>Loading...</h1>;
	}
	return (
		<div className="bg-white">
			<SectionTitle title="Login" path="Home | Login" />
			<div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-2xl font-normal leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
					<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
						<form className="space-y-6" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="license"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									License Key
								</label>
								<div className="mt-2">
									<input
										id="license"
										name="license"
										type="text"
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Active Key
								</label>
								<div className="mt-2">
									<input
										id="activeKey"
										name="activeKey"
										type="password"
										autoComplete="current-password"
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
									/>
									<label
										htmlFor="remember-me"
										className="ml-3 block text-sm leading-6 text-gray-900"
									>
										Remember me
									</label>
								</div>

								<div className="text-sm leading-6">
									<a
										href="#"
										className="font-semibold text-black hover:text-black"
									>
										Forgot password?
									</a>
								</div>
							</div>

							<div>
								<CustomButton
									buttonType="submit"
									text="Sign in"
									paddingX={3}
									paddingY={1.5}
									customWidth="full"
									textSize="sm"
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
