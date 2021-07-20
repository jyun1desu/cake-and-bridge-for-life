const generateUniqueId = () => Math.random().toString(36).substring(5,11);

export default generateUniqueId;