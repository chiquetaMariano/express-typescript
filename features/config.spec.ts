function sum(a: number, b: number): number {
    return a + b;
}

describe("Test Jest configuration", ()=> {
    it("should add a to b", () => {
        expect(sum(1 , 2)).toBe(3);
    });
});