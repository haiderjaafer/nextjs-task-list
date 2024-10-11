// import AddTaskForm from '@/components/AddTaskForm'
import AddTaskForm from '@/components/AddTaskForm';
import prisma from '@/utils/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'

const AddTaskPage = () => {

  // server action
  // async function  createTask(formData: FormData){
  //     "use server";

        
  //       const title = formData.get("title")?.toString();
  //       const description = formData.get("description")?.toString();
  // if(!title || !description) return console.log("required");

  // await prisma.task.create({


  //   data:{
  //     title,description
  //   }

  // })
  //    revalidatePath("/");
  // redirect("/");
  // }


  return (
    <section>
    <Link href="/" className="underline block mb-10">
        {"<< "} Back to tasks table
    </Link>
    <div className="w-2/3 mx-auto rounded-md p-5 bg-slate-800 border-2 border-gray-300">
        <h1 className="mb-7 font-bold text-3xl">Add Your Task</h1>
   

     <AddTaskForm />

    </div>
</section>
  )
}

export default AddTaskPage
