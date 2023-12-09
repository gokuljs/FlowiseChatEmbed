export type FeedBack = {
  feedBackType: 'POSITIVE' | 'NEGATIVE';
  feedbackMessage: string;
};
export type FeedbackProps = FeedBack & {
  apiId?: string;
  chatMessage: string;
};
