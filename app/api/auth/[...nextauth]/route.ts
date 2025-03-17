import { setVendor } from "@/app/actions";
import NextAuth, { JWT, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: any = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				license: { label: "License", type: "text" },
				activeKey: { label: "Active Key", type: "password" },
			},
			async authorize(credentials: any) {
				try {
					const { license, activeKey } = credentials;

					if (!license || !activeKey) {
						throw new Error("license or active key not found");
					}

					const userInfo = await setVendor(license, activeKey);
					if (userInfo !== "Unauthorized access.") {
						const data = {
							name: userInfo.setup?.name,
							mobile: userInfo.setup?.mobile,
							email: userInfo.setup?.email,
						};
						return { ...data, license, activeKey };
					}

					throw new Error("Invalid license or active key");
				} catch (err: any) {
					throw new Error(err);
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.license = user.license;
				token.activeKey = user.activeKey;

				token.user = {
					name: user.setup?.name,
					mobile: user.setup?.mobile,
					email: user.setup?.email,
				};
			}
			return token;
		},

		async session({ session, token }) {
			session.user = token.user;
			session.license = token.license;
			session.activeKey = token.activeKey;

			return session;
		},
	},
	theme: {
		colorScheme: "auto", // "auto" | "dark" | "light"
		brandColor: "#202e38", // Hex color code
		logo: "https://cdn-icons-png.flaticon.com/512/12440/12440960.png", // Absolute URL to image
		buttonText: "", // Hex color code
	},
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
