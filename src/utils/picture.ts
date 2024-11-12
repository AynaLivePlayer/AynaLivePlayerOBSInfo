import type {Picture} from "@/api/model";

function detectMimeType(base64: string) {
    // Decode Base64 string to binary data
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(16);
    for (let i = 0; i < Math.min(byteCharacters.length, 16); i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    // Check for PNG's signature
    if (byteNumbers[0] === 0x89 && byteNumbers[1] === 0x50 && byteNumbers[2] === 0x4E && byteNumbers[3] === 0x47 &&
        byteNumbers[4] === 0x0D && byteNumbers[5] === 0x0A && byteNumbers[6] === 0x1A && byteNumbers[7] === 0x0A) {
        return 'image/png';
    }
    // Check for JPEG's signature
    else if (byteNumbers[0] === 0xFF && byteNumbers[1] === 0xD8 && byteNumbers[1] === 0xFF) {
        return 'image/jpeg';
    }
    return 'image/jpeg'; // Default MIME type if no known signature is found
}

function base64ToDataUrl(base64: string) {
    const contentType = detectMimeType(base64);
    return `data:${contentType};base64,${base64}`;
}

export function getPictureUrl(picture: Picture): string {
    if (picture.Url) {
        return picture.Url;
    } else {
        return base64ToDataUrl(picture.Data);
    }
}
