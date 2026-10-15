const bcrypt = require("bcrypt js");

const password ="kokofe";

const hashPassword = await bcrypt.hash(password, 10);

console.log(hashedPassword);
