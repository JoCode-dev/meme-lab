/**
 * Convert a Base64 string to a File object.
 *
 * @param base64 - The Base64 string to convert.
 * @param fileName - The name of the resulting file.
 * @param mimeType - The MIME type of the file (optional).
 * @returns A Promise that resolves to a File object.
 */
export async function base64ToFile(
  base64: string,
  fileName: string,
  mimeType = ""
): Promise<File> {
  // Decode base64 string to binary data
  mimeType = mimeType || (base64.match(/^data:([^;]+);/) || "")[1];
  return fetch(base64)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], fileName, { type: mimeType }));
}
