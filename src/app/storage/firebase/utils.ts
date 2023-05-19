import { FirebaseStorage, getDownloadURL, listAll, ref } from "firebase/storage";

export const getAllFiles = async (storage: FirebaseStorage) => {
  const listRef = ref(storage);
  const { items } = await listAll(listRef);

  return items;
};

export const getFileContent = async (storage: FirebaseStorage, fullPath: string) => {
  const downloadUrl = await getDownloadURL(ref(storage, fullPath));
  const file = await fetch(downloadUrl);
  const fileContent = await file.text();

  return fileContent;
};