const textAt = (bytes, start, length) => String.fromCharCode(...bytes.slice(start, start + length));

export function hasValidMediaSignature(bytes, contentType) {
  if (contentType === 'image/jpeg') return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (contentType === 'image/png') return textAt(bytes, 1, 3) === 'PNG' && bytes[0] === 0x89;
  if (contentType === 'image/webp') return textAt(bytes, 0, 4) === 'RIFF' && textAt(bytes, 8, 4) === 'WEBP';
  if (contentType === 'image/avif') return textAt(bytes, 4, 4) === 'ftyp' && textAt(bytes, 8, 24).includes('avif');
  return contentType === 'application/pdf' && textAt(bytes, 0, 5) === '%PDF-';
}
