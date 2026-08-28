import NextImage, { type ImageProps } from 'next/image'

/** Site-wide Image wrapper — default quality 90 (Next.js default is 75). */
export default function SiteImage({ quality = 90, ...props }: ImageProps) {
  return <NextImage quality={quality} {...props} />
}
