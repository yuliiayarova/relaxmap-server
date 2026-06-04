import { Feedback } from "../../models/feedback";

export const getAllFeedbacks = async (req, res) => {
  const { page = 1, perPage = 3 } = req.query;
  const skip = (page - 1) * perPage;
  const feedbacksQuery = Feedback.find();
  
};
