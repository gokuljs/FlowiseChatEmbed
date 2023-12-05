import { Accessor, Setter } from 'solid-js';
import { FeedBack, FeedbackProps } from '@/models/giveFeedback';
type Props = {
    message: string;
    giveFeedBack: Accessor<FeedbackProps | null>;
    setGiveFeedBack: Setter<FeedbackProps | null>;
    defaultWelcomeMessage: string;
    apiHost?: string;
    fileAnnotations?: any;
    showAvatar?: boolean;
    avatarSrc?: string;
    backgroundColor?: string;
    textColor?: string;
    feedback?: FeedBack;
};
export declare const BotBubble: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=BotBubble.d.ts.map