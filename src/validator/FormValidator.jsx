
import PasswordValidator from "password-validator"

var schema = new PasswordValidator();
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                              // Must have at least 1 uppercase letters
    .has().lowercase(1)                              // Must have at least 1 lowercase letters
    .has().digits(1)                                // Must have at least 1 digits
    .has().symbols(1)                                // Must have at least 1 symbols
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password@123', 'Admin@123', 'User@123']); // Blacklist these values


const FormValidator = (e) => {
    const { name, value } = e.target

    switch (name) {
        case 'name':
        case 'username':

        case 'icon':
        case 'pin':
        case 'city':
        case 'state':
            if (!value || value.length === 0)
                return name + "Field is Mendatory"
            else if (value.length < 3 || value.length > 100)
                return name + "Field Lenght Must Be 3-100 Charecter"
            else
                return ""

        case 'email':
            if (!value || value.length === 0)
                return name + "Field is Mendatory"
            else if (value.length < 13 || value.length > 100)
                return name + "Field Lenght Must Be 13-100 Charecter"
            else
                return ""

        case 'phone':
            if (!value || value.length === 0)
                return name + "Field is Mendatory"
            else if (value.length < 3 || value.length > 10)
                return name + "Field Lenght Must Be 10 Digits"
            else if (!(value.startsWith("6") || value.startsWith("7") || value.startsWith("8") || value.startsWith("9")))
                return "Invalid phone Number"
            else
                return ""

        case 'password':
            if (!value || value.length === 0)
                return name + "Field is Mendatory"
            else if (!schema.validate(value))
                return schema.validate(value, { details: true }).map(x => x.message.replaceAll("string", "password")).join(". ")
            else
                return ""

        case 'message':
        case 'question':
        case 'answer':
        case 'address':
            if (!value || value.length === 0)
                return name + "Field is Mendatory"

            else
                return ""

        case 'basePrice':
            if (!value || value.length === 0)
                return name + "Field is Mendatory"
            else if (parseInt(value) < 1)
                return "Base Price Must Be a Value Greter Then 0"
            else
                return ""

        case 'discount':
            if (!value || value.length === 0)
                return name + "Field is Mendatory"
            else if (parseInt(value) < 0 || parseInt(value) > 100)
                return "Discount Must Be within 0-100"
            else
                return ""

        case 'stockQuantity':
            if (!value || value.length === 0)
                return name + "Field is Mendatory"
            else if (parseInt(value) < 0)
                return "Stock Quantity Must Be a Value  Greter then 0"
            else
                return ""

        default:
            return ""
    }
}
export default FormValidator