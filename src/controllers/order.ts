import { Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { RequestExt } from "../interfaces/req-ext.interface";




const getOrder = (req: RequestExt, res: Response) => {
    try{
        res.send({
            data: "ESTO SOLO LO VE LAS PERSONAS CON SESISON / JWT",
            user: req.user,
        });
    } catch (e){
        handleHttp(res, "ERROR_GET_BLOGS");
    }
};

export { getOrder };