import { Session } from '../../models/session.js';
import { refreshUserService } from '../../services/auth/authService.js';
import { logoutUserService } from '../../services/auth/authService.js';
import {
  createSession,
  loginUserService,
  registerUserService,
} from '../../services/auth/authService.js';
import { setupSession } from '../../utils/setupSession.js';

export const registerUserController = async (req, res) => {
  const user = await registerUserService(req.body);

  const newSession = await createSession(user._id);
  setupSession(res, newSession);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const user = await loginUserService(req.body);

  await Session.deleteOne({ userId: user._id });

  const newSession = await createSession(user._id);
  setupSession(res, newSession);

  res.json({
    status: 200,
    message: 'Successfully logged in!',
    data: user,
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUserService(req.cookies.sessionId);
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.sendStatus(204);
};

export const refreshUserController = async (req, res) => {
  const session = await refreshUserService({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
  });
};
