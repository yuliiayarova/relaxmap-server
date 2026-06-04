import { LocationType } from '../../models/locationType.js';
import { Region } from '../../models/region.js';

export const getCategories = async (req, res) => {
  const [regions, locationTypes] = await Promise.all([
    Region.find().lean(),
    LocationType.find().lean(),
  ]);

  res.status(200).json({
    status: 200,
    message: 'Successfully found categories',
    data: {
      regions,
      locationTypes,
    },
  });
};
