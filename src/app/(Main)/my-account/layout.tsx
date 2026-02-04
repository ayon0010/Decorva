import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Account | Decorva",
    description: "Manage your account information, view orders, and update your billing and shipping addresses.",
    keywords: ["account", "profile", "orders", "billing", "shipping", "decorva"],
    openGraph: {
        title: "My Account | Decorva",
        description: "Manage your account information, view orders, and update your billing and shipping addresses.",
        type: "website",
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function MyAccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
