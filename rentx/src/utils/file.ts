import fs from 'fs';

async function deleteFile(fileName: string) {
  try {
    await fs.promises.stat(fileName);
  } catch {
    return;
  }

  await fs.promises.unlink(fileName);
}

export { deleteFile }