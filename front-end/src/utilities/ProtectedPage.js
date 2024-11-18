import { useEffect } from "react";
import { axiosClient, pages } from "./";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage() {

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            try {
                await axiosClient.get('http://localhost:8080/check-authentication')
            } catch {
                navigate(pages.LogIn.path)
            }
        }
        fetchData()
    })

    return <></>
}