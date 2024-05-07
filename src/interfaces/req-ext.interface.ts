/* //import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface RequestExt extends Request{
    //user?: JwtPayload | {
        id: string;
    };
//} */

// interfaces/req-ext.interface.ts
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface RequestExt extends Request {
  user?: JwtPayload | { id: string };
}