import { Feedback } from '../../models/feedback.js';
import { Location } from '../../models/location.js';

export const getAllFeedbacks = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 3;

    const maxFeedbacks = 6;
    const skip = (page - 1) * perPage;

    const totalFeedbacks = await Feedback.countDocuments();

    const limitedTotalFeedbacks = Math.min(totalFeedbacks, maxFeedbacks);
    const totalPages = Math.ceil(limitedTotalFeedbacks / perPage);

    if (skip >= maxFeedbacks) {
      return res.status(200).json({
        page,
        perPage,
        totalFeedbacks: limitedTotalFeedbacks,
        totalPages,
        hasMore: false,
        data: [],
      });
    }

    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      page,
      perPage,
      totalFeedbacks: limitedTotalFeedbacks,
      totalPages,
      hasMore: page < totalPages,
      data: feedbacks,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeedbacksByLocationId = async (req, res, next) => {
  try {
    const { locationId } = req.params;
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 3;

    const skip = (page - 1) * perPage;
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({
        message: 'Location not found',
      });
    }

    const feedbacksQuery = {
      _id: { $in: location.feedbacksId },
    };
    const totalItems = await Feedback.countDocuments(feedbacksQuery);
    const feedbacks = await Feedback.find(feedbacksQuery)
      .skip(skip)
      .limit(perPage);
    res.status(200).json({
      page,
      perPage,
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      data: feedbacks,
    });
  } catch (error) {
    next(error);
  }
};

export const createFeedbackByLocationId = async (req, res, next) => {
  try {
    const { locationId } = req.params;
    const { rate, description, userName } = req.body;
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({
        message: 'Location not found',
      });
    }
    const feedback = await Feedback.create({
      rate,
      description,
      userName: req.user.name,
    });
    location.feedbacksId.push(feedback._id);
    await location.save();
    res.status(201).json({
      message: 'Feedback created successfully',
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};
