// Use this function if payload has only text data (no file field)
export async function createRecord(collection, payload) {
    try {
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const data = await res.json()  // ✅ alag variable me store karo
        return data
    }
    catch (error) {
        console.log(`Error while creating Record API calling: ${error}`)
        return []
    }
}

// Use this function if payload has form data (contains at least 1 file field)
export async function createMultipartRecord(collection, payload) {
    try {
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`, {
            method: 'POST',
            body: payload   // FormData ke liye headers nahi lagate
        })
        const data = await res.json()
        return data
    }
    catch (error) {
        console.log(`Error while creating Multipart Record API calling: ${error}`)
        return []
    }
}

export async function getRecord(collection) {
    try {
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        return data
    }
    catch (error) {
        console.log(`Error while Getting Record in API calling: ${error}`)
        return []
    }
}

export async function updateRecord(collection, payload) {
    try {
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${payload.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const data = await res.json()
        return data
    }
    catch (error) {
        console.log(`Error while updating Record API calling: ${error}`)
        return []
    }
}

export async function deleteRecord(collection, payload) {
    try {
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${payload.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        return data
    }
    catch (error) {
        console.log(`Error while Deleting Record in API calling: ${error}`)
        return []
    }
}
