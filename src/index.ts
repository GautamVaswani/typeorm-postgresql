import * as express from "express";
import { AppDataSource } from "./data-source";
import { createClientRouter } from "./routes/create_clients";

const app = express();

const port = 3000;

const main = async () => {
  AppDataSource.initialize()
    .then(async () => {
      console.log("Connected to PostgreSQL database");
      app.use(express.json());
      app.use(createClientRouter);
      app.listen(port, () => {
        console.log(`Application is running on port ${port}.`);
      });

      // Insert new user
      // const user = new User();
      // user.firstName = "Gautam";
      // user.lastName = "Vaswani";
      // user.age = 24;
      // await AppDataSource.manager.save(user);
      // console.log("Saved a new user with id: " + user.id);

      // Fetching all users data
      // const usersRepository = await AppDataSource.manager.getRepository(User);
      // const allUsers = await usersRepository.find();
      // console.log("Loaded users: ", allUsers);

      // Fetch user with specific data
      // const userWithIdOne = await usersRepository.findOneBy({
      //   id: 1,
      // });
      // console.log("User with id 1: ", userWithIdOne);

      // Deleteing user by id
      // const photoToRemove = await usersRepository.findOneBy({
      //   id: 2,
      // });
      // await usersRepository.remove(photoToRemove);
    })
    .catch((error) =>
      console.error("Unable to connect to PostgreSQL database: " + error)
    );
};

main();
