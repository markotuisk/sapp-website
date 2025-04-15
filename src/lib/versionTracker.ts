
// Example of logging a version update
export const logComponentUpdate = async (
  componentId: string, 
  componentName: string, 
  newVersion: string, 
  changeDescription: string
) => {
  try {
    const result = await updateComponentVersion(
      componentId, 
      componentName, 
      newVersion, 
      changeDescription
    );
    
    console.log('Version update logged:', result);
    return result;
  } catch (error) {
    console.error('Failed to log version update:', error);
    return null;
  }
};
