import { Attachment } from "./Attachment";
import { Link } from "./Link";

export interface Image {
  type: string;
  id: number;
  title: string;
  price: number;
  author: string;
  created_at: string;
  main_attachment: Attachment;
  likes_count: number;
  liked: boolean;
  links: Link[];
}
