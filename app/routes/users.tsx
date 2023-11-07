import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import prisma from "prisma/client";
import { User } from '@prisma/client'

export const loader: LoaderFunction = async () => {
    const users = await prisma.user.findMany();

    // Map each user object to a new object with userId as a string
    const serializedUsers = users.map(({ userId, ...user }) => ({ ...user, userId: userId.toString() }));

    return json({ users: serializedUsers });
}

export default function Users() {

    const { users } = useLoaderData<{ users: User[] }>();

    return (
        <>
            <h1>Users are coming here</h1>
            <ul>
                {users.map(({ name, userId, createdAt }) => (
                    <>
                        <li key={userId}>{name}</li>
                        <li key={userId}>{createdAt}</li>
                    </>
                ))}
            </ul>
        </>
    );
}





