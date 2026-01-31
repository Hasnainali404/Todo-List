import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTodos } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { filteredTodos, dispatch, todos } = useTodos();

  const onDragEnd = result => {
    if (!result.destination) return;
    const items = [...todos];
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    dispatch({ type: "SET_TODOS", payload: items });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {provided => (
          <ul ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
            {filteredTodos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {provided => (
                  <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <TodoItem todo={todo} />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
