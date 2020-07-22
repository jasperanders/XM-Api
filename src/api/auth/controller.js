import { User } from "a/user";
import { Session } from "a/session";
import {
  sign,
  decodeJWT,
  destroy,
  comparePassword,
  providerAuth,
} from "s/auth";
import {
  OK,
  NOT_FOUND,
  UNAUTHORIZED,
  NO_CONTENT,
  BAD_REQUEST,
} from "http-status-codes";
import { extractToken } from "s/auth/utils";
import { errorHandler } from "s/response";

const signHandler = async (user, res) => {
  // Sign Token
  const { _id, role, token } = await sign(user);
  res.status(OK).json({ _id, role, token });
};

export const authenticate = async (
  { body: { email, password }, device },
  res,
  next
) => {
  // Pass value
  try {
    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      // We do not want to tell the user that the email doesnt exist...
      res
        .status(UNAUTHORIZED)
        .json({ valid: false, message: res.__("wrong-credentials") })
        .end();
      return;
    }

    if (!user.verified) {
      res
        .status(UNAUTHORIZED)
        .json({ valid: false, message: res.__("unverified") })
        .end();
      return;
    }

    // Compare password
    const comparedPassword = await comparePassword(user.password, password);
    if (!comparedPassword) {
      res
        .status(UNAUTHORIZED)
        .json({ valid: false, message: res.__("wrong-credentials") })
        .end();
      return;
    }

    // Assign device to user
    user.device = device;

    // Sign in user
    await signHandler(user, res);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const providerAuthenticate = async ({ body, params }, res, next) => {
  // Pass values
  const { provider } = params;
  const { token } = body;

  try {
    // Get user from external provider
    const providerUser = await providerAuth[provider](token);
    const user = await User.createFromService(providerUser);

    // Sign in user
    await signHandler(user, res);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const logout = async (req, res, next) => {
  try {
    if (extractToken(req) === null) {
      res
        .status(BAD_REQUEST)
        .json({ valid: false, message: res.__("missing-token") })
        .end();
      return;
    }
    await destroy(req);
    res.status(NO_CONTENT).end();
  } catch (error) {
    errorHandler(res, error);
  }
};

export const logoutAll = async (req, res, next) => {
  try {
    if (extractToken(req) === null) {
      res
        .status(BAD_REQUEST)
        .json({ valid: false, message: res.__("missing-token") })
        .end();
      return;
    }
    const {
      user: { _id },
    } = req;

    await Session.deleteAllUserSessions(_id);

    res.status(NO_CONTENT).end();
  } catch (error) {
    errorHandler(res, error);
  }
};
