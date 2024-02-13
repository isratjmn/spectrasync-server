import { SortOrder } from 'mongoose';
import { EyeGlassSearchableFields } from './eyeglasses.constant';

export const eyeGlassesFilter = (query: Record<string, unknown>) => {
  const {
    search,
    minPrice,
    maxPrice,
    frameMaterial,
    frameShape,
    lensType,
    brand,
    color,
    priceRange,
    gender,
    sortBy,
    sortOrder,
  } = query;

  let filter: Record<string, unknown> = {};
  let sort: Record<string, SortOrder> = {};

  if (search) {
    filter['$or'] = EyeGlassSearchableFields.filter(
      (field) => field !== 'price',
    ) // Exclude 'price' from searchable fields
      .map((field) => ({ [field]: { $regex: search, $options: 'i' } }));
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    filter.price = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice !== undefined) {
    filter.price = { $gte: minPrice };
  } else if (maxPrice !== undefined) {
    filter.price = { $lte: maxPrice };
  }

  if (frameMaterial) {
    filter.frameMaterial = frameMaterial;
  }

  if (frameShape) {
    filter.frameShape = frameShape;
  }

  if (lensType) {
    filter.lensType = lensType;
  }

  if (brand) {
    filter.brand = brand;
  }

  if (color) {
    filter.color = color;
  }

  if (priceRange) {
    filter.priceRange = priceRange;
  }

  if (gender) {
    filter.gender = gender;
  }

  if (sortBy && sortOrder) {
    sort = {
      [sortBy as string]: sortOrder as SortOrder,
    };
    sort[sortBy as string] = sortOrder === 'asc' ? 1 : -1;
  }

  return { filter, sort };
};
