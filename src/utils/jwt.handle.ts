import { VerifyErrors, sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "token.010203";

const generateToken = (id: string) => {
    const jwt = sign({ id }, JWT_SECRET, {
        expiresIn: "1h",
    });
    return jwt;
};

const verifyToken = (jwt: string): Promise<string | object> => {
    return new Promise((resolve, reject) => {
        verify(jwt, JWT_SECRET, (err: VerifyErrors | null, decoded: string | object | undefined) => {
            if (err) {
                reject(err);
            } else {
                // Si decoded es undefined, resolvemos la promesa con una cadena vacía
                // o cualquier otro valor adecuado según tu aplicación
                resolve(decoded || "");
            }
        });
    });
};

export { generateToken, verifyToken };
