const fileToBase64 = (file: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // FileReader handles the file correctly at runtime regardless of the 'any' type
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};