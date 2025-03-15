import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface UserDetails {
    full_name: string;
    personal_email_id: string;
    organization_email_id: string;
    phone_number: number;
    department_name: string;
    role: string
    projects: object,
    seminars: object,
    certificates: object,
    researchPapers: object,
    otherAchievements: object,
    averageRating: number
}

export const useDetails = () => {
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState<UserDetails>({
        full_name: "",
        personal_email_id: "",
        organization_email_id: "",
        phone_number: 0,
        department_name: "",
        role: "",
        projects: {},
        seminars: {},
        certificates: {},
        researchPapers: {},
        otherAchievements: {},
        averageRating: 0.0
    });

    useEffect(() => {
        axios.get(`${BACKEND_URL}/user/details`, {
            headers: {
                Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJyYWh1bC5uYWlyQGJlbm5ldHQuZWR1LmluIiwiaWF0IjoxNzQxNzIyMzU1fQ.UgZyiUhfAyb6fgWnzMZXj3V3ulq8t_PE52jJTSjosqQ"
            }
        })
        .then(response => {
            setDetails(response.data.user)
            setLoading(false)
        })
    }, [])

    return {
        loading,
        details
    }
}