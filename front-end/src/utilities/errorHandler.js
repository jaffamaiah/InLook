export default function errorHandler(error) {
    console.error(error)

    if (error.response) {
        if (error.response.status === 401) {
            window.location.replace("http://localhost:3000/login")
        } else if (error.response.data.msg) {
            alert(error.response.data.msg)
        } else {
            alert("Unexpected error occurred")
        }

    } else {
        alert("Server encountered an error while handling request")
    }
}
