import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { FIFTEEN_MINUTES, ONE_DAY } from '../../constants/time.js';
import { Session } from '../../models/session.js';
import { User } from '../../models/user.js';
import createHttpError from 'http-errors';

export const createSession = async (userId) => {
  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const registerUserService = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return await User.create({
    ...payload,
    password: hashedPassword,
  });
};

export const loginUserService = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw createHttpError(401, 'Invalid email or password');

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, 'Invalid email or password');

  return user;
};

export const logoutUserService = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

export const refreshUserService = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });
  if (!session) throw createHttpError(401, 'Session not found');

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired)
    throw createHttpError(401, 'Session token expired');

  await Session.deleteOne({ _id: sessionId, refreshToken });
  const newSession = await createSession(session.userId);

  return newSession;
};
