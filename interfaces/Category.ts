import Priority from "./Priority";

export default interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  created: string;
  priority: Priority;
  notes: string[];
  attachments: string[];
  updated?: string;
}
