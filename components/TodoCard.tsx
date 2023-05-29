"use client"

import getUrl from '@/lib/getUrl';
import Image from 'next/image';
import { useBoardStore } from '@/store/BoardStore';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { getURL } from 'next/dist/shared/lib/utils';
import { useEffect, useState } from 'react';
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

type Props = {
    todo : Todo;
    index : number;
    id: TypedColumn;
    innerRef: (elements: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({ 
    todo,
    index,
    id,
    innerRef,
    draggableProps,
    dragHandleProps,
}: Props) {

    const deleteTask = useBoardStore((state) => state.deleteTask);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (todo.image) {
            const fetchImage = async () => {
                const url = await getUrl(todo.image!);
                if (url) {
                    setImageUrl(url.toString());
                }
            }
            

            fetchImage();
        }
    },[todo])

    return (
        <div
            className='bg-white rounded-md space-y-2 drop-shadow-md p-2'
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
        >
            <div className='flex justify-between items-center p-5'>
                <p>{todo.title}</p>
                <button className='text-red-500 hover:text-red-600' onClick={()=>deleteTask(index, todo, id)}>
                    <XCircleIcon
                    className='h-8 w-8 ml-5'
                    />
                </button>
            </div>

            {/* This section i'll add option to upload image later on */}
            {imageUrl && (
                <div className='relative h-full w-full rounded-b-md'>
                    <Image
                        src={imageUrl}
                        alt={todo.title}
                        width={400}
                        height={200}
                        className='w-full object-contain rounded-b-md'
                    />
                </div>
            )}
        </div>
    )
}

export default TodoCard
