import { LocationType } from '../../models/locationType.js';
import { Region } from '../../models/region.js';

export const getRegions = async (req, res) => {
  const regions = await Region.find().lean();

  res.status(200).json({
    status: 200,
    message: 'Successfully found regions',
    data: regions,
  });
};

export const getLocationTypes = async (req, res) => {
  const locationTypes = await LocationType.find().lean();

  res.status(200).json({
    status: 200,
    message: 'Successfully found location types',
    data: locationTypes,
  });
};
