import axios from "axios"
import { BACKEND_URL } from "../config"

export interface ResearchFormDataType {
    title: string,
    description: string,
    certificate: File | null,
    verificationLink: string,
    conferenceName: string,
    publishedDate: string,
}

export const submitResearchPaper = async (formData: ResearchFormDataType) => {
    try {
        await axios.post(`${BACKEND_URL}/researchPapers/add`, {
            title: formData.title,
            description: formData.description,
            certificate_of_publication: "formData.certificate", // have to correct backend to accept file
            verification_link: formData.verificationLink,
            conference_name: formData.conferenceName,
            publish_date: formData.publishedDate
        }, 
        {
            headers: {
                Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJyYWh1bC5uYWlyQGJlbm5ldHQuZWR1LmluIiwiaWF0IjoxNzQxNzIyMzU1fQ.UgZyiUhfAyb6fgWnzMZXj3V3ulq8t_PE52jJTSjosqQ"
            }
        })
    } catch(e) {
        alert("Not able to add Research Paper. Try again later")
        console.log(e)
    }
}

export const updateResearchPaper = async (formData: ResearchFormDataType, id: string) => {
    try {
        await axios.put(`${BACKEND_URL}/researchPapers/${id}`, {
            title: formData.title,
            description: formData.description,
            certificate_of_publication: "formData.certificate", // have to correct backend to accept file
            verification_link: formData.verificationLink,
            conference_name: formData.conferenceName,
            publish_date: formData.publishedDate
        }, 
        {
            headers: {
                Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJyYWh1bC5uYWlyQGJlbm5ldHQuZWR1LmluIiwiaWF0IjoxNzQxNzIyMzU1fQ.UgZyiUhfAyb6fgWnzMZXj3V3ulq8t_PE52jJTSjosqQ"
            }
        })
    } catch(e) {
        alert("Not able to update Research Paper. Try again later")
        console.log(e)
    }
}

export const deleteResearchPaper = async (id: string) => {
    try {
        await axios.delete(`${BACKEND_URL}/researchPapers/${id}`, {
            headers: {
                Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25fZW1haWxfaWQiOiJyYWh1bC5uYWlyQGJlbm5ldHQuZWR1LmluIiwiaWF0IjoxNzQxNzIyMzU1fQ.UgZyiUhfAyb6fgWnzMZXj3V3ulq8t_PE52jJTSjosqQ"
            }
        })
    } catch(e) {
        alert("Not able to delete Research Paper. Try again later")
        console.log(e)
    }
}