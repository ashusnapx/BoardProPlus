import { Draggable, Droppable } from "react-beautiful-dnd"
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

type Props = {
    id: TypedColumn;
    todos: Todo[];
    index: number;
}

const idToColumnText: {
    [key in TypedColumn]: string;
} = {
    "todo": "To Do 🤔",
    "inprogress": "In Progress 🚧",
    "done": "Done 🎉",
}

function Column({ id, todos, index }: Props) {

    const [searchString, setNewTaskType] = useBoardStore((state) => [state.searchString, state.setNewTaskType]);
    const openModal = useModalStore((state) => state.openModal);

    const handleAddTodo = () => {
        setNewTaskType(id);
        openModal();
    }

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {/* ender droppables todos */}
                    <Droppable droppableId={index.toString()} type="card">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className=
                                {`p-2 space-y-3 rounded-2xl shadow-xl 
                                ${snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white-50'
                                    }`
                                }
                            >
                                <h2 className="flex justify-between font-bold text-xl font-normal">
                                    {idToColumnText[id]}
                                    <span className="px-2 py-1 bg-gray-200 text-gray-500 rounded-full text-sm">{!searchString ? todos.length : todos.filter(todo => todo.title.toLowerCase().includes(searchString.toLowerCase())).length}</span>
                                </h2>


                                <div className="space-y-2">
                                    {todos.map((todo, index) => {

                                        if (searchString && !todo.title.toLowerCase().includes(searchString.toLowerCase())) return null;

                                        {

                                            return (

                                                <Draggable
                                                    key={todo.$id}
                                                    draggableId={todo.$id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <TodoCard
                                                            todo={todo}
                                                            index={index}
                                                            id={id}
                                                            innerRef={provided.innerRef}
                                                            draggableProps={provided.draggableProps}
                                                            dragHandleProps={provided.dragHandleProps}
                                                        />
                                                    )}
                                                </Draggable>
                                            )
                                        }
                                    })}

                                    {provided.placeholder}

                                    <div className="flex items-end justify-end p-2">
                                        <button className="text-green-500 hover:text-green-600" onClick={handleAddTodo}>
                                            <PlusCircleIcon
                                                className="h-10 w-10"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
}

export default Column
