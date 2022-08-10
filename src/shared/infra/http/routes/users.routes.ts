import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "@modules/accounts/useCases/listUserUseCase/ListUsersController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";

const usersRouters = Router();

const upload_avatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUsersController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouters.post("/", createUsersController.handle);
usersRouters.get("/", listUsersController.handle);
usersRouters.patch(
  "/avatar",
  ensureAuthenticated,
  upload_avatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRouters };
