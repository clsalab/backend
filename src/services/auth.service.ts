import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/nosql/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";



/* const registerNewUser = async ({useremail, userpassword, username}: User) => {
    try{
        console.log("Datos recibidos para el registro:", { useremail, userpassword, username });
    
        const checkIs = await UserModel.findOne({useremail})
        if (checkIs) return "ALREADY_USER";
        const passHash = await encrypt(userpassword);
        const registerNewUser = await UserModel.create({useremail, userpassword: passHash, username});
        console.log("Usuario registrado exitosamente:", registerNewUser);
        return registerNewUser;
    } catch (error) {
        console.error("Error en la función registerNewUser:", error);
        throw error;
    }
}; */

const registerNewUser = async ({ useremail, userpassword, username, userroles }: User) => {
    try {
        console.log("Datos recibidos para el registro:", { useremail, userpassword, username, userroles });

        const checkIs = await UserModel.findOne({ useremail });
        if (checkIs) return "ALREADY_USER";
        
        const passHash = await encrypt(userpassword);
        const newUser = {
            username,
            useremail,
            userpassword: passHash,
            userroles: userroles ? [userroles] : ["user"], // Si se proporciona userroles, úsalo, de lo contrario, usa el valor por defecto "user"
        };
        const registerNewUser = await UserModel.create(newUser);
        console.log("Usuario registrado exitosamente:", registerNewUser);
        return registerNewUser;
    } catch (error) {
        console.error("Error en la función registerNewUser:", error);
        throw error;
    }
};


/* const loginUser = async({useremail, userpassword}: Auth) => {
    const checkIs = await UserModel.findOne({ useremail }).select('username useremail userpassword userroles');
    if (!checkIs) return "NOT_FOUND_USER";

    const passwordHash = checkIs.userpassword //TODO el encriptado!
    const isCorrect = await verified(userpassword, passwordHash);

    if(!isCorrect) return "PASSWORD_INCORRECT";
    const token = await generateToken(checkIs.useremail); 
    const data = { token, user:checkIs }; 
    return data;
}; */

const loginUser = async ({ useremail, userpassword }: Auth) => {
    try {
        // Buscar el usuario en la base de datos por su correo electrónico
        const user = await UserModel.findOne({ useremail }).select('username useremail userpassword userroles');
    
        
        if (!user) {
            return { error: "NOT_FOUND_USER" };
        }

        // Verificar si la contraseña es correcta
        const isCorrect = await verified(userpassword, user.userpassword);
        if (!isCorrect) {
            return { error: "PASSWORD_INCORRECT" };
        }

        // Generar el token JWT
        const token = await generateToken(user.useremail);

        // Devolver el token y los datos del usuario (incluidos los roles)
        return { token, user: user.toObject() };
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return { error: "INTERNAL_SERVER_ERROR" };
    }
};

export { registerNewUser, loginUser}