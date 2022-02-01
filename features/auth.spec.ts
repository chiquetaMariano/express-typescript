import AuthService, { UserAttributes, UserModel, query } from "../src/services/AuthService";

const userModel = jest.fn().mockImplementation(() => {
    return {
        create: (user: UserAttributes): Promise<any> => {return new Promise((resolve) => {
            resolve(user)
        })},

        findOne: (query: query): Promise<any> => {return new Promise((resolve) => {
            let result;
            const email = query.where.email;

            if(email === "lorem@ipsum") {
                result = {id: 0, name: "blabla", email: "lorem@ipsum", password: "$argon2i$v=19$m=16,t=2,p=1$OHdrYU5JZURpUUFxc0gxQg$dTJ843ffXcd1p+26oNgfGg"};
            }
            else {
                result = {};
            }
            resolve(result);
        })}
    }
});

describe("Authentication service", () => {
    const authService = new AuthService();
    let user: UserModel & UserAttributes;
    let sessionData: any;
    let unsuccessfulLogin: any;

    beforeAll(async() => {
        authService.userModel = userModel();
        const data = await authService.Signup("John Doe", "john@doe", "secret");
        user = data.user;

        sessionData = await authService.Login("lorem@ipsum", "secret");
        // unsuccessfulLogin = await authService.Login("lorem@ipsum", "blablabla");
    });


    it("should signup successfully", async () => {
        expect(user.name).toBeDefined();
        expect(user.email).toBe("john@doe");
    });

    it("should login successfully", () => {
        expect(sessionData.user).toBeDefined();
        expect(sessionData.token).toBeDefined();
    });
    
    it("should identify wrong password", () => {
        expect.assertions(1);
        return authService.Login("lorem@ipsum", "blablabla").catch(e =>
            expect(e).toEqual(
                new Error("Incorrect password")
            )
        )
    });
});