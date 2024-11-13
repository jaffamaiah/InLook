export default function errorHandler(error) {
    console.error(error)

    if (error.response) {
        if (error.response.data.msg) {
            alert(error.response.data.msg)
        } else {
            alert("Unexpected error occurred")
        }

    } else {
        alert("Server encountered an error while handling request")
    }
}
