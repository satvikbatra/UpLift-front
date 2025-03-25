import { useState } from "react";
import { signin, signup } from "../hooks";
import { useNavigate } from "react-router-dom";

type AuthFormProps = {
    type: "signin" | "signup";
};

type FormData = {
    personal_email_id?: string;
    organization_email_id: string;
    password: string;
    full_name?: string;
};

export const AuthForm = ({ type }: AuthFormProps) => {
    const [formData, setFormData] = useState<FormData>({
        ...(type === "signup" && { personal_email_id: "", full_name: "" }),
        organization_email_id: "",
        password: ""
    });

    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (type === "signin") {
                const user = await signin(formData);
                if (user?.is_admin) {
                    navigate("/admin");
                } else {
                    navigate("/home");
                }
            } else {
                await signup(formData);
                navigate("/signin");
            }
        } catch (error) {
            console.error("Authentication error:", error);
            alert("Authentication failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-blue-200 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    {type === "signin" ? "Sign In" : "Sign Up"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {type === "signup" && (
                        <>
                            <div>
                                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="full_name"
                                    value={formData.full_name || ""}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="personal_email_id" className="block text-sm font-medium text-gray-700 mb-1">
                                    Personal Email
                                </label>
                                <input
                                    type="email"
                                    id="personal_email_id"
                                    value={formData.personal_email_id || ""}
                                    onChange={(e) => setFormData({ ...formData, personal_email_id: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div>
                        <label htmlFor="organization_email_id" className="block text-sm font-medium text-gray-700 mb-1">
                            Organization Email
                        </label>
                        <input
                            type="email"
                            id="organization_email_id"
                            value={formData.organization_email_id}
                            onChange={(e) => setFormData({ ...formData, organization_email_id: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                        {type === "signin" ? "Sign In" : "Sign Up"}
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            {type === "signin" ? "Don't have an account? " : "Already have an account? "}
                            <a
                                href={type === "signin" ? "/signup" : "/signin"}
                                className="text-blue-500 hover:text-blue-600 font-medium"
                            >
                                {type === "signin" ? "Sign Up" : "Sign In"}
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};