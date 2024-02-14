export const TName = [
  'Aviator Glasses',
  'Wayfarer Glasses',
  'Cat Eye Glasses',
  'Browline Glasses',
  'Computer Glasses',
] as const;

export const TBrand = [
  'Ray-Ban',
  'Oakley',
  'Prada',
  'Gucci',
  'Versace',
  'Dolce & Gabbana',
  'Armani',
] as const;

export const TFrameMaterial = ['Metal', 'Plastic', 'Acetate', 'Wood'] as const;

export const TGender = ['Male', 'Female', 'Others'] as const;

export const TColor = ['Black', 'Brown', 'Silver', 'Gold', 'Blue'] as const;

export const EyeGlassSearchableFields = [
  'frameMaterial',
  'frameShape',
  'lensType',
  'brand',
  'color',
  'gender',
  'namme',
  'price',
];
