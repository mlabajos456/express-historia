
const app = ("../index.js")
const supertest = require("supertest")
const request = supertest(app)

describe("test exmaple", () =>{
    test("get Auth Login", async  () => {
        await request.get("/dark")
    })
    
})