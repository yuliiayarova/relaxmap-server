import { Feedback } from '../../models/feedback.js';

export const getAllFeedbacks = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 3;

    const skip = (page - 1) * perPage;

    const [totalFeedbacks, feedbacks] = await Promise.all([
      Feedback.countDocuments(),
      Feedback.find()
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(perPage),
    ]);

    res.status(200).json({
      page,
      perPage,
      totalFeedbacks,
      totalPages: Math.ceil(totalFeedbacks / perPage),
      hasMore: page < Math.ceil(totalFeedbacks / perPage),
      data: feedbacks,
    });
  } catch (error) {
    next(error);
  }
};
