"use client"

import { databases } from "@/appwrite"

export const getTodosGroupedByColumn = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
    )

    const todos = data.documents;

    // console.log(todos);

    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: [],
            });
        }


        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,

            // fetch image only if it exists
            ...(todo.image && { image: JSON.parse(todo.image) }),
        });

        return acc;
    }, new Map<TypedColumn, Column>());

    // console.log(columns);

    // if the user hasn't selected any of the enums ie. todo, inprogress or done then add them to empty todos
    const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
    for (const columnType of columnTypes) {
        if (!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                todos: [],
            });
        }
    }

    // console.log(columns);

    // now i'll've to sort columns based on their column types ie. todo will come first, followed by inprogress and then done

    const sortedColumns = new Map(
        Array.from(columns.entries()).sort((a, b) => (
            columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
        ))
    );

    const board: Board = {
        columns: sortedColumns,
    }

    return board;
};