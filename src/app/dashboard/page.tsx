'use client';
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {

    const { data: session } = useSession();
    return (
        <>
            {session?.user ? (
            <>
                {session?.user?.image && (
                <Image
                        src={session.user.image}
                        alt="User avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                )}
                {session?.user?.name && (
                    <span>{session.user.name}</span>
                )}
                <button onClick={() => signOut()}>
                    Déconnexion
                </button>
            </>
        ) : (
            <Link href="/login">
                <button>Connexion</button>
            </Link>
        )}
        </>
 )}
