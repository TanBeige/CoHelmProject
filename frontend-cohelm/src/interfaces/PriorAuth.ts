export interface PriorAuthPromise {
  message: string;
  data: PriorAuth;
}

export interface PriorAuth {
  case_id: string;
  status: string;
  procedure_name: string;
  cpt_codes: string[];
  summary: string;
  is_met: boolean;
  is_complete: boolean;
  steps: Step[];
}

export interface Step {
  key: string;
  question: string;
  options: Option[];
  options_string: string;
  logic: Logic[];
  logic_string: string;
  reasoning: string;
  decision: string;
  next_step: string;
  is_met: boolean;
  is_final: boolean;
  evidence: Evidence[];
}

export interface Evidence {
  content: string;
  page_number: number;
  pdf_id: PDFID;
  pdf_name: null;
  event_datetime: Date | null;
}

export enum PDFID {
  PDFExtraction5Dae759DF9844238 = "pdf_extraction_5dae_759d_f984_4238",
  PDFExtraction8B98D4Aa7956_4C6A = "pdf_extraction_8b98_d4aa_7956_4c6a",
}

export interface Logic {
  text: string;
  selected: boolean;
}

export interface Option {
  key: string;
  text: string;
  selected: boolean;
}
