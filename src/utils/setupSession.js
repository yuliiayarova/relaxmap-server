// Function to setup cookies to the session

export const setupSession = (res, session) => {
  const isProd = process.env.NODE_ENV === 'production';

  const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
  };

  res.cookie('accessToken', session.accessToken, {
    ...cookieOptions,
    expires: session.accessTokenValidUntil,
  });
  res.cookie('refreshToken', session.refreshToken, {
    ...cookieOptions,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    ...cookieOptions,
    expires: session.refreshTokenValidUntil,
  });
};
