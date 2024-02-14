import { Request, Response } from 'express';
import { EyeglassesModel, EyeglassesAttributes } from './eyeglasses.model';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import {
  createEyeglasses,
  deleteEyeGlassDB,
  deleteEyeGlassData,
  getSingleEyeGlass,
  getAllEyeglasses,
  updateEyeGlassData,
} from './eyeglasses.service';

/* export const getAllEyeglassesDB = async (req: Request, res: Response) => {
  try {
    const eyeglasses = await getAllEyeglasses();
    res.status(200).json(eyeglasses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}; */

export const getAllEyeglassesDB = async (req: Request, res: Response) => {
  const eyeglassResult = await getAllEyeglasses(req.query);
  const { eyeglasses, meta } = eyeglassResult;
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Flowers Fetched successfully',
    meta: meta,
    data: eyeglasses,
  });
};

export const addEyeglasses = async (req: Request, res: Response) => {
  try {
    // Extract eyeglasses data from request body
    const {
      name,
      price,
      quantity,
      frameMaterial,
      frameShape,
      lensType,
      brand,
      color,
      priceRange,
      gender,
    } = req.body;
    const eyeglassesData: EyeglassesAttributes = {
      name,
      price,
      quantity,
      frameMaterial,
      frameShape,
      lensType,
      brand,
      color,
      priceRange,
      gender,
    };

    // Check if an image file is included in the request
    if (req.file) {
      // If an image file is provided, call createEyeglasses with the file
      const newEyeglasses = await createEyeglasses(req.file, eyeglassesData);
      res.status(201).json(newEyeglasses);
    } else {
      // If no image file is provided, call createEyeglasses without the file
      const newEyeglasses = await createEyeglasses(null, eyeglassesData);
      res.status(201).json(newEyeglasses);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getEyeGlass = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const eyeGlass = await getSingleEyeGlass(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Eyeglass Fetched successfully',
    data: eyeGlass,
  });
};

export const updateEyeGlass = async (req: Request, res: Response) => {
  const { eyeglassId } = req.params;
  const payload = req.body;
  const updatedEyeglass = await updateEyeGlassData(eyeglassId, payload);
  console.log(eyeglassId);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Eyeglass updated successfully',
    data: updatedEyeglass,
  });
};

export const deleteEyeGlass = async (req: Request, res: Response) => {
  const id: string[] = req.body;

  const result = await deleteEyeGlassData(id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Eyeglass updated successfully',
    data: result,
  });
};

export const deleteSingleEyeGlass = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await deleteEyeGlassDB(id);
    res.status(200).json({
      success: true,
      message: 'EyeGlass is Deleted Successfully',
      data: result,
    });
  } catch (error: any) {
    console.error('Error Deleting Eyeglasses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to Delete Eyeglasses',
      error: error.message,
    });
  }
};
