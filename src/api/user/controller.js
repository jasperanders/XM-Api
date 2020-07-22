import { User } from ".";
import {
  NOT_FOUND,
  OK,
  CREATED,
  FORBIDDEN,
  NO_CONTENT,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} from "http-status-codes";
// import { sendVerificationMail } from 's/sendgrid'
import { Verification } from "a/verification";
import { errorHandler } from "s/response";

export const index = async ({ querymen, user, method }, res, next) => {
  try {
    const users = await User.paginate(querymen, { method, user, filter: true });
    res.status(OK).json(users);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const show = async (
  { user: { _id, role }, method, params: { id } },
  res
) => {
  try {
    const user = await User.findById(id === "me" ? _id : id);

    if (!user) {
      res
        .status(NOT_FOUND)
        .json({ valid: false, message: res.__("not-found") });
      return;
    }

    res.status(OK).json(user.filter({ role, method }));
  } catch (error) {
    errorHandler(res, error);
  }
};

export const create = async (
  { bodymen: { body }, method, user },
  res,
  next
) => {
  try {
    if ((await User.findOne({ email: body.email })) !== null) {
      res
        .status(CONFLICT)
        .json({ valid: false, message: res.__("email-conflict") });
      return;
    }

    const doc = await User.create(body);

    const { token } = await Verification.create({ user: doc._id });

    // await sendVerificationMail({ to: body.email, name: body.name, token })

    res.status(CREATED).json(doc.filter({ role: user?.role, method }));
  } catch (error) {
    errorHandler(res, error);
  }
};

export const update = async (
  { bodymen: { body }, params, user, method },
  res,
  next
) => {
  try {
    const doc = await User.findById(params.id);

    if (!doc) {
      res
        .status(NOT_FOUND)
        .json({ valid: false, message: res.__("not-found") });
      return;
    }

    if (!User.isOwner(doc, user)) {
      res
        .status(FORBIDDEN)
        .json({ valid: false, message: res.__("missing-permission") });
      return;
    }

    await doc.set(body).save();

    res.status(OK).json(doc.filter({ role: user.role, method }));
  } catch (error) {
    errorHandler(res, error);
  }
};

export const updatePassword = async (
  { bodymen: { body }, params, user },
  res,
  next
) => {
  try {
    const doc = await User.findById(params.id);

    if (!doc) {
      res
        .status(NOT_FOUND)
        .json({ valid: false, message: res.__("not-found") });
      return;
    }

    if (!User.isOwner(doc, user)) {
      res
        .status(FORBIDDEN)
        .json({ valid: false, message: res.__("missing-permission") });
      return;
    }

    await doc.set(body).save();

    res.status(NO_CONTENT).end();
  } catch (error) {
    errorHandler(res, error);
  }
};

export const destroy = async ({ user, params: { id } }, res, next) => {
  try {
    const doc = await User.findById(id);

    if (!doc) {
      res
        .status(NOT_FOUND)
        .json({ valid: false, message: res.__("not-found") });
      return;
    }

    if (!User.isOwner(doc, user)) {
      res
        .status(FORBIDDEN)
        .json({ valid: false, message: res.__("missing-permission") });
      return;
    }

    await User.deleteOne({ _id: id });

    res.status(NO_CONTENT).end();
  } catch (error) {
    errorHandler(res, error);
  }
};
