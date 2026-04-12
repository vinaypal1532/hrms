import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";


export default function EmployeePage() {

     const router = useRouter();
   
     useEffect(() => {
       
     }, []);
   

    return(
       <div>
            <h2 className="text-2xl font-semibold mb-1">Employees</h2>
            <p className="text-gray-500 mb-6">
                Manage your staff members, view profiles, and handle employee-related tasks.
            </p>
            <div className="bg-white p-5 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-4">Employee List</h3>
                <p>John Smith - Senior Developer</p>
                <p>Sarah Johnson - Marketing Manager</p>
                <p>Michael Brown - HR Specialist</p>
                <p>Emily Davis - Sales Executive</p>
            </div>
       </div>



    );
}