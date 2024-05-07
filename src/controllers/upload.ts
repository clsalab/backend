import { Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { RequestExt } from "../interfaces/req-ext.interface";
import { registerUpload } from "../services/storage.service";
import { Storage } from "../interfaces/storage.interface";



const getFile = async (req: RequestExt, res: Response) => {
    try {
        if (req.user) {
            const { user, file } = req;
            const dataToRegister: Storage = {
                fileName:  `${file?.filename}`,
                idUser: `${user.id}`,
                path: `${file?.path}`
            };
            const response = await registerUpload(dataToRegister);
            res.send(response);
        } else {
            // Manejar el caso donde user es undefined
            // Por ejemplo, enviar un mensaje de error o devolver un código de estado 401
            res.status(401).send("Usuario no autorizado");
        }
    } catch (e) {
        handleHttp(res, "ERROR_GET_BLOG");
    }
};



export { getFile };