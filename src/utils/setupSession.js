// Function to setup cookies to the session

export const setupSession = (res, session) => {
  const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
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
