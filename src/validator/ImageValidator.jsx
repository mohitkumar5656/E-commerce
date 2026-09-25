const ImageValidator = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 1) {
        const pic = files[0]
        if (!(pic.type === "image/jpg" || pic.type === "image/jpeg" || pic.type === "image/png" || pic.type === "image/gif" || pic.type === "image/webp"))
            return "Invalid pic formate, please upload  an image of type png ,jpg, jpeg gif "
        else if (pic.size > 1048576)
            return "pic is too Heavy, please upload an image upto 1 MB"
        else
            return ""
    }
    else {
        const errorMassage = []
        Array.from(e.target.files).forEach((pic, index) => {
            if (!(pic.type === "image/jpg" || pic.type === "image/jpeg" || pic.type === "image/png" || pic.type === "image/gif" || pic.type === "image/webp"))
                errorMassage.push(`Invalid pic ${index + 1} formate, please upload  an image of type png ,jpg, jpeg gif `)
            else if (pic.size > 1048576)
                errorMassage.push(`pic ${index + 1} is too Heavy, please upload an image upto 1 MB.`)

        })
        return errorMassage.length ? errorMassage.join("") : ""
    }
}
export default ImageValidator