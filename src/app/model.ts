export interface Queue {
  name: string;
  messages: number;
  status: string;
}

export interface EndevorFile {
  id?: number;
  file_name: string;
  environment: string;
  machine: string;
  status: string;
  last_modified: string;
}
export interface ZmailService {
  name: string;
  status: string;
  lastCheck: string;
}
