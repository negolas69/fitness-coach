import { getUser, createUser } from "./user.model.js";

async function create(req, res) {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  const results = await getUser(username, email);

  console.log(results);

  if (results.length == 0) {
    const result = await createUser(
      username,
      firstname,
      lastname,
      email,
      password,
      password2
    );
    res.send({ message: "User created successfully" });
  }
}

export { create };
