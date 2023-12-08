import { MessageType } from '@/components/Bot';
import { sendRequest } from '@/utils/index';

export type IncomingInput = {
  id?: string;
  question: string;
  history: MessageType[];
  overrideConfig?: Record<string, unknown>;
  socketIOClientId?: string;
  chatId?: string;
  fileName?: string; // Only for assistant
};

export type MessageRequest = {
  chatflowid?: string;
  apiHost?: string;
  body?: IncomingInput;
  id?: string;
};

export const sendMessageQuery = ({ chatflowid, apiHost = 'http://localhost:3000', body }: MessageRequest) =>
  sendRequest<any>({
    method: 'POST',
    url: `${apiHost}/api/v1/prediction/${chatflowid}`,
    body,
  });
export const isStreamAvailableQuery = ({ chatflowid, apiHost = 'http://localhost:3000' }: MessageRequest) =>
  sendRequest<any>({
    method: 'GET',
    url: `${apiHost}/api/v1/chatflows-streaming/${chatflowid}`,
  });

export const sendFileDownloadQuery = ({ apiHost = 'http://localhost:3000', body }: MessageRequest) =>
  sendRequest<any>({
    method: 'POST',
    url: `${apiHost}/api/v1/openai-assistants-file`,
    body,
    type: 'blob',
  });

export const updateFeedBack = ({ chatflowid, apiHost = 'http://localhost:3000', body }: MessageRequest) =>
  sendRequest<any>({
    method: 'POST',
    url: `${apiHost}/api/v1/chat/add-feedback/${chatflowid}`,
    body,
  });
