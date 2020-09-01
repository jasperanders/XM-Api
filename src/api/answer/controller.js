import { merge } from "lodash";
import { Answer as Data } from ".";
import {
  OK,
  NOT_FOUND,
  CREATED,
  FORBIDDEN,
  NO_CONTENT,
} from "http-status-codes";
import { errorHandler } from "s/response";

// Get all
export const index = async ({ querymen, user, method }, res, next) => {
  try {
    const datas = await Data.paginate(querymen, {
      populate: [{ path: "author" }],
      method,
      user,
    });

    res.status(OK).json(datas);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Get One
export const show = async ({ params: { id }, method, user }, res, next) => {
  try {
    const data = await Data.findById(id).populate("author");

    if (!data) {
      res.status(NOT_FOUND).end();
      return;
    }

    res.status(OK).json(data.filter({ role: user?.role, method }));
  } catch (error) {
    errorHandler(res, error);
  }
};

// Get Many
export const find = async ({ bodymen: { body }, method, user }, res, next) => {
  try {
    const data = await Data.find({
      "content.questionId": { $in: body.ids.map((id) => id) },
    });

    res.status(OK).json(data);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Post
export const create = async (
  { bodymen: { body }, method, user },
  res,
  next
) => {
  try {
    let data = await Data?.findOne({
      author: user._id,
      "content.questionId": body.content.questionId,
    });
    console.log("\n\ndata", data);
    if (!data) {
      data = await Data.create(body);
    }
    console.log("\n\ndata", data);
    res.status(CREATED).json(data);
  } catch (error) {
    errorHandler(res, error);
  }
};

// Put
export const update = async (
  { bodymen: { body }, user, method, params: { id } },
  res,
  next
) => {
  try {
    const data = await Data.findById(id).populate("author");

    if (!data) {
      res.status(NOT_FOUND).end();
      return;
    }

    if (!Data.isOwner(data, user)) {
      res.status(FORBIDDEN).end();
      return;
    }

    await data.set(body).save();

    res.status(OK).json(data.filter({ role: user?.role, method }));
  } catch (error) {
    errorHandler(res, error);
  }
};

// Delete
export const destroy = async ({ params: { id }, user }, res, next) => {
  try {
    const data = await Data.findById(id);

    if (!data) {
      res.status(NOT_FOUND).end();
      return;
    }

    if (!Data.isOwner(data, user)) {
      res.status(FORBIDDEN).end();
      return;
    }

    await data.deleteOne({ _id: id });

    res.status(NO_CONTENT).end();
  } catch (error) {
    errorHandler(res, error);
  }
};

// Start Question Timer
export const startTimer = async ({ params: { id }, user }, res, next) => {
  try {
    const data = await Data.findById(id);

    if (!data) {
      res.status(NOT_FOUND).end();
      return;
    }

    if (!Data.isOwner(data, user)) {
      res.status(FORBIDDEN).end();
      return;
    }

    data.content.timeStart = Date.now();
    await data.save();
    res.status(OK).json(data);
  } catch (error) {
    errorHandler(res, error);
  }
};

// End Question Timer
export const endTimer = async ({ params: { id }, user }, res, next) => {
  try {
    const data = await Data.findById(id);

    if (!data) {
      res.status(NOT_FOUND).end();
      return;
    }

    if (!Data.isOwner(data, user)) {
      res.status(FORBIDDEN).end();
      return;
    }

    data.content.timeEnd = Date.now();
    await data.save();
    res.status(OK).json(data);
  } catch (error) {
    errorHandler(res, error);
  }
};
