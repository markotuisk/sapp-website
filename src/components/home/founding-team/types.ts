
export interface Founder {
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export interface FounderCardProps {
  founder: Founder;
  index: number;
  handleImageLoad: (imageType: string) => void;
  handleImageError: (imageType: string, error: any) => void;
}
