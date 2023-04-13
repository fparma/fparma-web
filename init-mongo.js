db.createUser(
  {
    user: "fparma",
    pwd: "dev",
    roles: [
      {
        role: "readWrite",
        db: "fparma"
      }
    ]
  }
);

db.createCollection("events");
