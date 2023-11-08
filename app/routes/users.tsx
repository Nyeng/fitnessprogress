import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import prisma from "prisma/client";
import { User } from '@prisma/client'

export const loader: LoaderFunction = async () => {
    try {
        
        const users = await prisma.user.findMany();

        // Map each user object to a new object with userId as a string
        const serializedUsers = users.map(({ userId, ...user }) => ({ ...user, userId: userId.toString() }));

        // Disconnect the Prisma client after each request
        prisma.$disconnect();

        return json({ users: serializedUsers });
    } catch (error) {
        console.error(error);
        return json({ message: 'An error occurred while fetching users' }, { status: 500 });
    }
}

export default function Users() {

    const { users } = useLoaderData<{ users: User[] }>();

    if (!users) {
        return <div>No users found</div>;
    }

    return (
        <>
            <h1>Users are coming here</h1>
            <ul>
                {users.map(({ name, userId, createdAt }) => (
                    <>
                        <li key={`name-${userId}`}>{name}</li>
                        <li key={`createdAt-${userId}`}>{createdAt}</li>
                    </>
                ))}
            </ul>
        </>
    );
}





