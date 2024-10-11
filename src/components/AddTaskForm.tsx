"use client";
import { createTask } from "@/utils/actions";
import { CreateTaskDto } from "@/utils/dtos";
import { createTaskSchema } from "@/utils/validationSchema";
import { toast } from "react-toastify";


const AddTaskForm = () => {

    const clientAction = async (formData: FormData): Promise<void> => {  // return type of clientAction is  Promise<void> to be accepted by form action
        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString();
    
        const validation = createTaskSchema.safeParse({ title, description });
        if (!validation.success) {
            toast.error(validation.error.errors[0].message);
            return;
        }
    
        // If you don't need to return anything, just await the task creation and return void
        await createTask({ title, description } as CreateTaskDto);
    
        // Optionally, you can add a success notification or perform some actions like page redirection
        toast.success("Task created successfully!");
    };
    
//form action={""}  expect form action 

    return (
        <form action={clientAction} className="flex flex-col gap-6">
        <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="p-2 text-xl rounded-md text-gray-950"
        />
        <textarea
            name="description"
            rows={5}
            placeholder="Task Description"
            className="p-2 text-xl rounded-md text-gray-950 resize-none"
        ></textarea>
        <button type="submit" className="bg-cyan-300 hover:bg-cyan-400 text-black font-semibold text-xl rounded-md p-3 transition-colors">
            Add Task
        </button>
    </form>
    )
}

export default AddTaskForm