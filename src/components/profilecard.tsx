import { Pencil } from "lucide-react";

interface ProfileDetailsTypes {
    name: string;
    personal_email: string;
    organization_email: string;
    phone_number: number;
    department_name: string;
    role: string;
}

export const ProfileCard = ({ name, personal_email, organization_email, phone_number, department_name, role }: ProfileDetailsTypes) => {
    return (
        <div className="card">
            <div className="flex justify-end">
                <div className="text-gray-500 hover:text-gray-700 cursor-pointer">
                    <Pencil size={18} />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-around gap-6 mx-4 my-2">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-gray-300 overflow-hidden">
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm text-gray-500">Profile Photo</span>
                    </div>
                </div>

                <div className="text-center md:text-left">
                    <div className="mb-3">
                        <div className="text-2xl font-extrabold text-gray-800">{name}</div>
                        <div className="text-gray-500 text-sm">{department_name} - {role}</div>
                    </div>

                    <div className="text-gray-600 text-sm space-y-1">
                        <div>{personal_email}</div>
                        <div>{organization_email}</div>
                        <div className="font-medium text-gray-700">+91 {phone_number}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
