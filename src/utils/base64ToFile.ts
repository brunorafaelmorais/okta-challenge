export default async function base64ToFile(dataUrl: string): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();

  const lowerCaseDataUrl = dataUrl.toLocaleLowerCase();

  let extension = '';

  if (lowerCaseDataUrl.includes('jpg') || lowerCaseDataUrl.includes('jpeg')) {
    extension = 'jpg';
  }

  if (lowerCaseDataUrl.includes('png')) {
    extension = 'png';
  }

  return new File([blob], `file.${extension}`, { type: `image/${extension}` });
}
