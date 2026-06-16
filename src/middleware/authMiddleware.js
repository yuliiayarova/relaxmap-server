import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authMiddleWare = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) throw createHttpError(401, 'Токен доступу відсутній');

  const session = await Session.findOne({ accessToken });
  if (!session) throw createHttpError(401, 'Сесію не знайдено');

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired)
    throw createHttpError(401, 'Термін дії токена доступу закінчився');

  const user = await User.findById(session.userId);
  if (!user)
    throw createHttpError(401, 'Користувача для цієї сесії не знайдено');

  req.user = user;
  next();
};
