const users = [
  {
    id: 1,
    name: "Kinuthia",
    email: "kinuthia@domain.com",
    password: "12345",
  },
  {
    id: 2,
    name: "John",
    email: "johnmwanzia@gmail.com",
    password: "12345",
  },
];

const getUsers = () => users;

const getUserById = (id) => users.find((user) => user.id === id);

const getUserByEmail = (email) => users.find((user) => user.email === email);

const addUser = (user) => {
  user.id = users.length + 1;
  users.push(user);
};

export { getUsers, getUserByEmail, getUserById, addUser };
