export interface Article {
  id?: string | undefined;
  title: string;
  author: string;
  date: Date;
  journal_name: string;
  se_practice: string;
  claim: string;
  result_of_evidence: string;
  type_of_research: string;
  type_of_participant: string;
  approved: boolean;
  checked?: boolean;
  averageRating?: number;
  currentRating?: number;
  totalRatings?: number;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
