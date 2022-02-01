import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import config from "../config";

export interface UserAttributes {
    id?: string;
    name: string;
    email: string;
    password: string;
}

export interface UserModel {
    create(user: UserAttributes): Promise<any>;
    findOne(query: query): Promise<any>;
}

export type query = {
    where: {
        email: string;
    };
}

export default class AuthService {
    userModel: UserModel;

    public async Signup(name: string, email: string, password: string): Promise<any> {
        const salt = randomBytes(32);
        const passwordHashed = await argon2.hash(password, {salt});

        const user = await this.userModel.create({
            name,
            email,
            password: passwordHashed
        });

        return {
            user: {
                name: user.name,
                email: user.email
            }
        }
    }

    public async Login(email: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ where: {email} });
        if(!user) {
            throw new Error("User not found");
        }
        else  {
            const correctPassword = await argon2.verify(user.password, password);
            if(!correctPassword) {
                throw new Error("Incorrect password");
            }
        }

        return {
            user: {
                name: user.name,
                email: user.email
            },
            token: this.generateJWT(user)
        }
    }

    private generateJWT(user: UserAttributes) {

        const data = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        const signature = config.secret || "shhhhh";
        const expiration = "6h";

        return jwt.sign({data}, signature, { expiresIn: expiration });
    }
}