export const generateUniqueFileName = (file: File, prefix: string): File => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = file.name.split('.').pop();
  const newFileName = `${prefix}-${timestamp}-${randomString}.${extension}`;
  
  // Create a new File object with the unique name
  return new File([file], newFileName, { type: file.type });
};
