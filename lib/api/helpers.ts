export const handleUpload = async ({
  type = "application/pdf",
  file,
}: {
  type: string;
  file: File | null;
}): Promise<string | null> => {
  try {
    
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!data.results || !data.results[0].secure_url) {
      throw new Error("Upload failed");
    }

    return data.results[0]?.secure_url || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const handleMultiUpload = async ({
  type = "application/pdf",
  files,
}: {
  type: string;
  files: File[] | null;
}): Promise<string | null> => {
  try {    
    if (!files) return null;
    const formData = new FormData();
    for (let file of files) {
      formData.append("file", file);
    }

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("🚀 ~ handleMultiUpload ~ data:", data.results)
    
    if (!data.result || !data.result.secure_url) {
      throw new Error("Upload failed");
    }

    return data.result?.secure_url || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};