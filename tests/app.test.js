import request from "supertest";
import { app } from "../index.js";
var id;
var userId;
describe("GET /posts", () => {
  let token;

  beforeAll((done) => {
    // login user and get JWT token
    request(app)
      .post("/auth/login")
      .send({
        // Use one of your testing user
        email: "a@b.com",
        password: "password",
      })
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.tkn;

        done();
      });
  });

  test("should return 200 if token is provided", async () => {
    const response = await request(app)
      .get("/posts")
      .set("Cookie", `jwt=${token}`);
    expect(response.status).toBe(200);
  });
});

describe("GET posts/:userId/posts", () => {
  let token;

  beforeAll((done) => {
    // login user and get JWT token
    request(app)
      .post("/auth/login")
      .send({
        email: "a@b.com",
        password: "password",
      })
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.tkn;
        userId = res.body.user.userId;
        done();
      });
  });

  test("should return 200 if token is provided", async () => {
    const response = await request(app)
      .get(`/posts/${userId}/posts`)
      .set("Cookie", `jwt=${token}`);
    expect(response.status).toBe(200);
  });
});

describe("POST posts/add", () => {
  let token;

  beforeAll((done) => {
    // login user and get JWT token
    request(app)
      .post("/auth/login")
      .send({
        email: "a@b.com",
        password: "password",
      })
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.tkn;

        done();
      });
  });

  test("should return 201 if token is provided", async () => {
    const response = await request(app)
      .post("/posts/add")
      .send({
        title: "POST FROM TEST",
        content: "POST FROM TEST",
      })
      .set("Cookie", `jwt=${token}`);
    id = response.body.post._id;
    expect(response.status).toBe(201);
  });
});

describe("POST posts/:id", () => {
  let token;
  // example id of existing post needed!!!!!

  beforeAll((done) => {
    // login user and get JWT token
    request(app)
      .post("/auth/login")
      .send({
        email: "a@b.com",
        password: "password",
      })
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.tkn;

        done();
      });
  });

  test("should return 200 if token is provided", async () => {
    const response = await request(app)
      .post(`/posts/${id}`)
      .send({
        title: "CHANGED POST FROM TEST212112",
        content: "CHANGED POST FROM TEST2121221",
      })
      .set("Cookie", `jwt=${token}`);
    console.log(id);

    expect(response.status).toBe(200);
  });
});

describe("GET posts/get/:id", () => {
  let token;
  // example id of existing post needed!!!!!

  beforeAll((done) => {
    // login user and get JWT token
    request(app)
      .post("/auth/login")
      .send({
        email: "a@b.com",
        password: "password",
      })
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.tkn;

        done();
      });
  });

  test("should return 201 if token is provided", async () => {
    const response = await request(app)
      .get(`/posts/get/${id}`)
      .set("Cookie", `jwt=${token}`);

    expect(response.status).toBe(200);
  });
});

describe("DELETE posts/:id", () => {
  let token;
  // example id of existing post needed!!!!!

  beforeAll((done) => {
    // login user and get JWT token
    request(app)
      .post("/auth/login")
      .send({
        email: "a@b.com",
        password: "password",
      })
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.tkn;

        done();
      });
  });

  test("should return 200 if token is provided", async () => {
    const response = await request(app)
      .delete(`/posts/${id}`)
      .set("Cookie", `jwt=${token}`);
    expect(response.status).toBe(200);
  });
});
