'use client';
import { Link } from "@heroui/react";
import React from "react";
import { useSession } from "../../lib/auth-client";

const UserInfo = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;

    if (isPending) {
        return <div>Loading...</div>;
    }
    console.log(user);
  return (
    <div>
      <Link href="/sign-in">Login</Link>
      <Link
        className="bg-accent text-white px-4 py-2 rounded-md"
        href="/sign-up"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default UserInfo;
