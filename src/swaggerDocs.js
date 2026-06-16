/**
 * @swagger
 * tags:
 *   - name: Auth
 *   - name: Users
 *   - name: Categories
 *   - name: Locations
 *   - name: Feedbacks
 * components:
 *   securitySchemes:
 *     accessTokenCookie:
 *       type: apiKey
 *       in: cookie
 *       name: accessToken
 *     refreshTokenCookie:
 *       type: apiKey
 *       in: cookie
 *       name: refreshToken
 *     sessionIdCookie:
 *       type: apiKey
 *       in: cookie
 *       name: sessionId
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id: { type: string, example: 6672f7d44f4c2b001234abcd }
 *         name: { type: string, example: Yuliia }
 *         email: { type: string, format: email, example: user@example.com }
 *         avatarUrl: { type: string, format: uri }
 *         articlesAmount: { type: integer, example: 3 }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     CurrentUser:
 *       type: object
 *       properties:
 *         _id: { type: string, example: 6672f7d44f4c2b001234abcd }
 *         name: { type: string, example: Yuliia }
 *         avatarUrl: { type: string, format: uri }
 *         articlesAmount: { type: integer, example: 3 }
 *     RegisterRequest:
 *       type: object
 *       required: [name, email, password]
 *       properties:
 *         name: { type: string, minLength: 2, maxLength: 32, example: Yuliia }
 *         email: { type: string, format: email, maxLength: 64, example: user@example.com }
 *         password: { type: string, minLength: 8, maxLength: 128, example: Password123 }
 *     LoginRequest:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         email: { type: string, format: email, example: user@example.com }
 *         password: { type: string, minLength: 8, example: Password123 }
 *     Coordinates:
 *       type: object
 *       required: [lat, lon]
 *       properties:
 *         lat: { type: number, example: 50.4501 }
 *         lon: { type: number, example: 30.5234 }
 *     Location:
 *       type: object
 *       properties:
 *         _id: { type: string, example: 6672f7d44f4c2b001234abce }
 *         image: { type: string, format: uri }
 *         name: { type: string, example: Trukhaniv Island }
 *         locationType: { type: string, example: park }
 *         region: { type: string, example: kyiv }
 *         rate: { type: number, example: 4.7 }
 *         description: { type: string, example: Quiet green place near the river. }
 *         coordinates:
 *           $ref: '#/components/schemas/Coordinates'
 *         ownerId: { type: string, example: 6672f7d44f4c2b001234abcd }
 *         feedbacksId:
 *           type: array
 *           items: { type: string }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     LocationForm:
 *       type: object
 *       required: [name, locationType, region, description]
 *       properties:
 *         image: { type: string, format: binary }
 *         name: { type: string, example: Trukhaniv Island }
 *         locationType: { type: string, example: park }
 *         region: { type: string, example: kyiv }
 *         description: { type: string, example: Quiet green place near the river. }
 *         coordinates:
 *           $ref: '#/components/schemas/Coordinates'
 *     Feedback:
 *       type: object
 *       properties:
 *         _id: { type: string, example: 6672f7d44f4c2b001234abcf }
 *         rate: { type: number, minimum: 1, maximum: 5, example: 5 }
 *         description: { type: string, example: Very peaceful place. }
 *         userName: { type: string, example: Yuliia }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     FeedbackRequest:
 *       type: object
 *       required: [rate, description]
 *       properties:
 *         rate: { type: number, minimum: 1, maximum: 5, example: 5 }
 *         description: { type: string, minLength: 3, maxLength: 1000, example: Very peaceful place. }
 *     Region:
 *       type: object
 *       properties:
 *         _id: { type: string, example: kyiv }
 *         region: { type: string, example: Kyiv region }
 *         slug: { type: string, example: kyiv }
 *         level: { type: string, example: oblast }
 *         note: { type: string }
 *     LocationType:
 *       type: object
 *       properties:
 *         _id: { type: string, example: 6672f7d44f4c2b001234abd0 }
 *         type: { type: string, example: Park }
 *         slug: { type: string, example: park }
 *         shortDescription: { type: string, example: Green outdoor recreation area }
 *
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/RegisterRequest' }
 *     responses:
 *       201:
 *         description: User registered, cookies are set
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 201 }
 *                 message: { type: string, example: Successfully registered a user! }
 *                 data: { $ref: '#/components/schemas/User' }
 *       400: { description: Validation error }
 *       409: { description: Email already exists }
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/LoginRequest' }
 *     responses:
 *       200:
 *         description: User logged in, cookies are set
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 200 }
 *                 message: { type: string, example: Successfully logged in! }
 *                 data: { $ref: '#/components/schemas/User' }
 *       400: { description: Validation error }
 *       401: { description: Invalid credentials }
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh session cookies
 *     tags: [Auth]
 *     security:
 *       - refreshTokenCookie: []
 *         sessionIdCookie: []
 *     responses:
 *       200:
 *         description: Session refreshed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 200 }
 *                 message: { type: string, example: Successfully refreshed a session! }
 *       401: { description: Missing or invalid refresh session }
 * /api/auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Auth]
 *     security:
 *       - accessTokenCookie: []
 *     responses:
 *       204: { description: Logged out }
 *       401: { description: Missing or invalid access token }
 * /api/users/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - accessTokenCookie: []
 *     responses:
 *       200:
 *         description: Current user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 200 }
 *                 message: { type: string, example: Successfully found user! }
 *                 data: { $ref: '#/components/schemas/CurrentUser' }
 *       401: { description: Missing or invalid access token }
 *       404: { description: User not found }
 * /api/users/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 200 }
 *                 message: { type: string, example: Successfully found user! }
 *                 data: { $ref: '#/components/schemas/User' }
 *       404: { description: User not found }
 * /api/users/{id}/locations:
 *   get:
 *     summary: Get locations created by user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, default: 10 }
 *     responses:
 *       200:
 *         description: User locations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 200 }
 *                 page: { type: integer }
 *                 limit: { type: integer }
 *                 totalItems: { type: integer }
 *                 totalPages: { type: integer }
 *                 locations:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Location' }
 *       404: { description: User not found }
 * /api/users/update-profile:
 *   patch:
 *     summary: Update current user profile
 *     tags: [Users]
 *     security:
 *       - accessTokenCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: New name }
 *               avatar: { type: string, format: binary }
 *     responses:
 *       200: { description: Profile updated }
 *       400: { description: No update data provided }
 *       401: { description: Missing or invalid access token }
 * /api/users/delete-avatar:
 *   delete:
 *     summary: Reset current user avatar to default
 *     tags: [Users]
 *     security:
 *       - accessTokenCookie: []
 *     responses:
 *       200: { description: Avatar reset }
 *       401: { description: Missing or invalid access token }
 * /api/categories/regions:
 *   get:
 *     summary: Get all regions
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Regions list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 200 }
 *                 message: { type: string, example: Successfully found regions }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Region' }
 * /api/categories/location-types:
 *   get:
 *     summary: Get all location types
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Location types list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 200 }
 *                 message: { type: string, example: Successfully found location types }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/LocationType' }
 * /api/locations:
 *   get:
 *     summary: Get locations
 *     tags: [Locations]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: perPage
 *         schema: { type: integer, minimum: 5, maximum: 20, default: 10 }
 *       - in: query
 *         name: region
 *         schema: { type: string }
 *       - in: query
 *         name: locationType
 *         schema: { type: string }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [asc, desc], default: asc }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [_id, rate, popular, newest], default: _id }
 *     responses:
 *       200:
 *         description: Paginated locations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page: { type: integer }
 *                 perPage: { type: integer }
 *                 totalLocations: { type: integer }
 *                 totalPages: { type: integer }
 *                 locations:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Location' }
 *   post:
 *     summary: Create location
 *     tags: [Locations]
 *     security:
 *       - accessTokenCookie: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema: { $ref: '#/components/schemas/LocationForm' }
 *     responses:
 *       201:
 *         description: Location created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Location' }
 *       400: { description: Validation error }
 *       401: { description: Missing or invalid access token }
 * /api/locations/{locationId}:
 *   get:
 *     summary: Get location by id
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema: { type: string, pattern: '^[a-fA-F0-9]{24}$' }
 *     responses:
 *       200:
 *         description: Location found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Location' }
 *       404: { description: Location not found }
 *   patch:
 *     summary: Update own location
 *     tags: [Locations]
 *     security:
 *       - accessTokenCookie: []
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema: { type: string, pattern: '^[a-fA-F0-9]{24}$' }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema: { $ref: '#/components/schemas/LocationForm' }
 *     responses:
 *       200:
 *         description: Location updated
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Location' }
 *       400: { description: Validation error }
 *       401: { description: Missing or invalid access token }
 *       404: { description: Location not found }
 * /api/feedbacks:
 *   get:
 *     summary: Get latest feedbacks
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: perPage
 *         schema: { type: integer, minimum: 1, maximum: 6, default: 6 }
 *     responses:
 *       200:
 *         description: Feedbacks list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 200 }
 *                 page: { type: integer }
 *                 perPage: { type: integer }
 *                 totalFeedbacks: { type: integer }
 *                 totalPages: { type: integer }
 *                 hasMore: { type: boolean }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Feedback' }
 * /api/feedbacks/{locationId}:
 *   get:
 *     summary: Get feedbacks by location id
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema: { type: string, pattern: '^[a-fA-F0-9]{24}$' }
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: perPage
 *         schema: { type: integer, minimum: 1, maximum: 20, default: 3 }
 *     responses:
 *       200:
 *         description: Location feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 200 }
 *                 page: { type: integer }
 *                 perPage: { type: integer }
 *                 totalItems: { type: integer }
 *                 totalPages: { type: integer }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Feedback' }
 *       404: { description: Location not found }
 *   post:
 *     summary: Create feedback for location
 *     tags: [Feedbacks]
 *     security:
 *       - accessTokenCookie: []
 *     parameters:
 *       - in: path
 *         name: locationId
 *         required: true
 *         schema: { type: string, pattern: '^[a-fA-F0-9]{24}$' }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/FeedbackRequest' }
 *     responses:
 *       201:
 *         description: Feedback created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 201 }
 *                 message: { type: string, example: Feedback created successfully }
 *                 data: { $ref: '#/components/schemas/Feedback' }
 *       400: { description: Validation error }
 *       401: { description: Missing or invalid access token }
 *       404: { description: Location not found }
 */
