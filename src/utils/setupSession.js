// Function to setup cookies to the session

export const setupSession = (res, session) => {
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    expires: session.accessTokenValidUntil,
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};
