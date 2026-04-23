"use client";
import StatCardGrid from "@/components/CardGrid";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";


export default function EmployeePage() {
  const router = useRouter();

  useEffect(() => {
    // future auth check yahan karega
  }, []);
return (
  <div className="space-y-6">
       {/* HEADER */}
       <div className="flex items-center justify-between">
         <div>
           <h2 className="text-2xl font-semibold text-black">
             Staff Management
           </h2>
           <p className="text-gray-500 text-sm">
           Manage all staff members
           </p>
         </div>
 
         <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm bg-white hover:bg-gray-50">
          Add Staff
         </button>
       </div>
 
       {/* TABLE CONTAINER */}
       <div className="bg-white rounded-2xl border border-gray-200 p-7">
         {/* FILTER BAR */}
         <div className="flex items-center justify-between p-4 text-gray-500">
           {/* SEARCH */}
           <div className="relative w-full max-w-md">
             <input
               type="text"
               placeholder="Search by employee name..."
               className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
             />
             <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
           </div>
 
           {/* DATE */}
           <div className="ml-4">
             <input
               type="date"
               className="border rounded-lg px-3 py-2 text-sm"
               defaultValue="2026-03-28"
             />
           </div>
         </div>
 
         {/* TABLE */}
         <div className="overflow-x-auto">
           <table className="w-full text-sm text-left">
             <thead className="text-gray-500">
               <tr>
                
                 <th className="px-6 py-3">Name</th>
                 <th className="px-6 py-3">Contact</th>
               
                 <th className="px-6 py-3">Department</th>
                   <th className="px-6 py-3">Position</th>
                    <th className="px-6 py-3">Joining Date</th>


                 <th className="px-6 py-3">Status</th>
                 <th className="px-6 py-3">Action</th>
               </tr>
             </thead>
 
             <tbody className="text-black">
               <tr className="border-t border-gray-400 hover:bg-gray-50">
                 <td className="px-6 py-4 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold">
                     JS
                   </div>
                   <div>
                     <p className="font-medium"><b>John Smith</b></p>
                     <p className="text-gray-500 text-xs">EMP001</p>
                   </div>
                 </td>
                
                 <td className="px-6 py-4">
                  <div>
                     <p className="font-medium">vinay@gmail.com</p>
                     <p className="text-gray-500 text-xs">7987908792</p>
                   </div>
                 </td>
                 
                 <td className="px-6 py-4">IT</td>
                 <td className="px-6 py-4">Software Engineer</td>
                 <td className="px-6 py-4">2023-01-15</td>
                 <td className="px-6 py-4">
                   <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                     present
                   </span>
                 </td>
                 <td className="px-6 py-4">
                  <button>View </button></td>
               </tr>
             </tbody>
           </table>
         </div>
       </div>
     </div>
   );
  }
 
