import { Accessor, Setter, Show, onMount } from 'solid-js';
import { Avatar } from '../avatars/Avatar';
import { Marked } from '@ts-stack/markdown';
import { sendFileDownloadQuery } from '@/queries/sendMessageQuery';
import { FeedBack, FeedbackProps } from '@/models/giveFeedback';
import { render } from 'solid-js/web';
import BsHandThumbsDown from '@/assets/Icons/ThumbsDown';
import BsHandThumbsUp from '@/assets/Icons/ThumbUp';

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
  apiId?: string;
};

const defaultBackgroundColor = '#f7f8ff';
const defaultTextColor = '#303235';

Marked.setOptions({ isNoP: true });

export const BotBubble = (props: Props) => {
  let botMessageEl: HTMLDivElement | undefined;

  const downloadFile = async (fileAnnotation: any) => {
    try {
      const response = await sendFileDownloadQuery({
        apiHost: props.apiHost,
        body: { question: '', history: [], fileName: fileAnnotation.fileName },
      });
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileAnnotation.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  onMount(() => {
    if (botMessageEl) {
      botMessageEl.innerHTML = Marked.parse(props.message);
      const svgContainerElement = document.createElement('div');
      svgContainerElement.id = 'svg-container';
      botMessageEl.appendChild(svgContainerElement);
      render(
        () =>
          !props?.feedback && props?.defaultWelcomeMessage !== props?.message ? (
            <div class="flex items-center mt-2 gap-1">
              <BsHandThumbsUp
                className="cursor-pointer"
                onclick={() => {
                  props.setGiveFeedBack({
                    ...(props.apiId ? { apiId: props.apiId } : {}),
                    feedBackType: 'POSITIVE',
                    chatMessage: props.message,
                    feedbackMessage: '',
                  });
                }}
                color="#303235"
              />

              <BsHandThumbsDown
                color="#303235"
                className="cursor-pointer"
                onclick={() => {
                  props.setGiveFeedBack({
                    ...(props.apiId ? { apiId: props.apiId } : {}),
                    feedBackType: 'NEGATIVE',
                    chatMessage: props.message,
                    feedbackMessage: '',
                  });
                }}
              />
            </div>
          ) : (
            <div class="flex items-center mt-2 gap-1">
              {props?.feedback && props?.feedback?.feedBackType === 'POSITIVE' && (
                <div
                  class="bg-blue-300 p-3 h-[10px] w-[10px] flex justify-center items-center rounded-md"
                  style={{
                    background: '#d5d9f0',
                  }}
                >
                  <BsHandThumbsUp color="#303235" />
                </div>
              )}
              {props?.feedback && props?.feedback?.feedBackType === 'NEGATIVE' && (
                <div
                  class="bg-blue-300 p-3 h-[10px] w-[10px] flex justify-center items-center rounded-md"
                  style={{
                    background: '#d5d9f0',
                  }}
                >
                  <BsHandThumbsDown color="#303235" />
                </div>
              )}
            </div>
          ),
        svgContainerElement,
      );
      if (props.fileAnnotations && props.fileAnnotations.length) {
        for (const annotations of props.fileAnnotations) {
          const button = document.createElement('button');
          button.textContent = annotations.fileName;
          button.className =
            'py-2 px-4 mb-2 justify-center font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 file-annotation-button';
          button.addEventListener('click', function () {
            downloadFile(annotations);
          });
          const svgContainer = document.createElement('div');
          svgContainer.className = 'ml-2';
          svgContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-download" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>`;

          button.appendChild(svgContainer);
          botMessageEl.appendChild(button);
        }
      }
    }
  });

  return (
    <div class="flex justify-start mb-2 items-start host-container" style={{ 'margin-right': '50px' }}>
      <Show when={props.showAvatar}>
        <Avatar initialAvatarSrc={props.avatarSrc} />
      </Show>
      <span
        ref={botMessageEl}
        class="px-4 py-2 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble"
        data-testid="host-bubble"
        style={{
          'background-color': props.backgroundColor ?? defaultBackgroundColor,
          color: props.textColor ?? defaultTextColor,
          'border-radius': '6px',
        }}
      />
    </div>
  );
};
