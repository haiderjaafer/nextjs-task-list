"use server";

import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { CreateTaskDto } from "./dtos";
import { Status } from "@prisma/client";


// Create Task
export async function createTask({title,description} : CreateTaskDto ) {  // object destructuring from CreateTaskDto

        

    if (typeof title !== 'string' || title.length < 2) return;
    if (typeof description !== 'string' || description.length < 4) return;

   

    try {
        await prisma.task.create({
            data: { title, description }
        });
    } catch (error) {
        throw new Error("could not create the task, please try again");
    }

   // revalidatePath("/");  // coz home page is static use  revalidatePath("/");

    redirect("/");
}

// Delete Task
export async function deleteTask(formData: FormData) {
    const id = formData.get('id')?.toString();
    if (!id) return;

    try {
        await prisma.task.delete({ where: { id: parseInt(id) } });
    } catch (error) {
        throw new Error("could not delete the task, please try again");
    }

    revalidatePath("/");
    redirect("/");
}

 // second way without use of formData pass id  ............ WE THIS method if have more than one parameters which is not form data

// export async function deleteTasksecondway(id : number) {
    
//     if (!id) return;

//     try {
//         await prisma.task.delete({ where: { id: id } });
//     } catch (error) {
//         throw new Error("could not delete the task, please try again");
//     }

//     revalidatePath("/");
//     redirect("/");
// }

// Update Task
export async function updateTask(formData: FormData) {
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const status = formData.get("status") as Status;
    const id = formData.get("id")?.toString();

    if (typeof title !== 'string' || title.length < 2) return;
    if (typeof description !== 'string' || description.length < 4) return;
    if (!status) return;
    if (typeof id !== 'string') return;

    try {
        await prisma.task.update({
            where: { id: parseInt(id) },
            data: { title, description, status }
        });
    } catch (error) {
        throw new Error("could not update the task, please try again");
    }

    revalidatePath("/");
    revalidatePath(`/task/${id}`);  // revalidatePath twice coz this task existed in / and /task/${id} 
    redirect(`/task/${id}`);
}