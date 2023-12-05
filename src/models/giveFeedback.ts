export type FeedBack = {
  feedBackType: 'POSITIVE' | 'NEGATIVE';
  feedbackMessage: string;
};
export type FeedbackProps = FeedBack & {
  chatMessage: string;
};
