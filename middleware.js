import { adminMiddleware } from "./middlewares/admin/adminMiddleware";
import { authMiddleware } from "./middlewares/web/authMiddleware";

const middlewares = [
    adminMiddleware,
    authMiddleware
];

export async function middleware(req) {
    let next = async (req) => {
        return req;
    };

    for (let i = middlewares.length - 1; i >= 0; i--) {
        next = await middlewares[i](next);
    }

    return next(req);
}