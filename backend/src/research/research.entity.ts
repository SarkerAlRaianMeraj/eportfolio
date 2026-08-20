export interface Research {
  id: string;
  title: string;
  authors: string[];
  publication_venue: string | null;
  date: string | null;
  doi_url: string | null;
  pdf_url: string | null;
  abstract: string | null;
  created_at: string;
}
