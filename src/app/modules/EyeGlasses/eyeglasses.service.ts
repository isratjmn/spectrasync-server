import httpStatus from 'http-status';
import appError from '../../ErrorHandler/AppError';
import { EyeglassesModel, EyeglassesAttributes } from './eyeglasses.model';
import { sendImageCloud } from '../../utils/SendImageCloud';
import { eyeGlassesFilter } from './eyeglasses.utils';


export const getAllEyeglasses = async (): Promise<EyeglassesAttributes[]> => {
  const eyeglasses = await EyeglassesModel.find();
  return eyeglasses;
};

/* export const getAllEyeglass = async (query: Record<string, unknown>) => {
  const { page, limit } = query;
  const { filter, sort } = eyeGlassesFilter(query);
  const pageNumber = typeof page === 'number' ? page : 1;
  const limitNumber = typeof limit === 'number' ? limit : 6;
  const totalEyeglasses = await EyeglassesModel.countDocuments(filter);
  const totalPages = Math.ceil(totalEyeglasses / limitNumber);
  const eyeGlasses = await EyeglassesModel.find(filter)
    .sort(sort)
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);
  const meta = {
    total: totalEyeglasses,
    page: pageNumber,
    limit: limitNumber,
    totalPages: totalPages,
  };
  return { eyeglasses: eyeGlasses, meta: meta };
}; */

export const createEyeglasses = async (
  file: any,
  eyeglassesData: EyeglassesAttributes,
): Promise<EyeglassesAttributes> => {
  try {
    // Upload the image to the cloud storage if a file is provided
    if (file) {
      const imageName = `sale_${eyeglassesData.quantity.toString().padStart(3, '0')}`;
      const result: any = await sendImageCloud(imageName, file.path);
      console.log(imageName, file.path);
      if (!result || !result.secure_url) {
        console.log(result.secure_url);
        throw new Error('Image upload failed or no secure URL returned');
      }
      eyeglassesData.profileImg = result.secure_url;
    } else {
      // If no file is provided, set profileImg to null
      eyeglassesData.profileImg = null;
    }
    // Create a new eyeglasses document and save it to the database
    const newEyeglasses = await EyeglassesModel.create(eyeglassesData);
    console.log(newEyeglasses);
    return newEyeglasses;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

export const getSingleEyeGlass = async (id: string) => {
  const eyeglass = await EyeglassesModel.findById(id);
  if (!eyeglass) {
    throw new appError(httpStatus.NOT_FOUND, 'Eye Glass not found');
  }
  return eyeglass;
};

export const updateEyeGlassData = async (
  eyeglassId: string,
  payload: Partial<EyeglassesAttributes>,
) => {
  console.log(eyeglassId);
  const updatedEyeglass = await EyeglassesModel.findByIdAndUpdate(
    eyeglassId,
    payload,
    { new: true },
  );
  if (!updatedEyeglass) {
    throw new appError(404, 'Eyeglass Not Found');
  }
  return updatedEyeglass;
};

export const deleteEyeGlassData = async (id: string[]) => {
  const newGlass = await EyeglassesModel.deleteMany({ _id: { $in: id } });
  return newGlass;
};

export const deleteEyeGlassDB = async (id: string) => {
  const eyeglass = await EyeglassesModel.findById(id);
  if (!eyeglass) {
    throw new Error('Eyeglass not found');
  }
  await EyeglassesModel.findByIdAndDelete(id);
};
