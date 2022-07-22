import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "../modules/accounts/useCases/createUser/createUserControllerts";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const usersRouters = Router();

const upload_avatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouters.post('/', createUserController.handle);
usersRouters.patch('/avatar', ensureAuthenticated, upload_avatar.single("avatar"), updateUserAvatarController.handle);

export { usersRouters }